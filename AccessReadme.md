# Admin Dashboard Email-Based Access Control Guide

## Overview

This guide explains how to implement role-based and email-specific access control for admin dashboard pages in the MUTCU application. This system allows you to restrict access to specific admin pages based on user email addresses and admin roles.

**Example:** Only `secretary@mutcu.org` can access the AdminMembersPage, while `treasurer@mutcu.org` can only access the AdminFinancePage, etc.

---

## Current Architecture

Your application already has:

1. **User Table** (in `backend/src/db/schema.ts`):
   - `email`: Unique email identifier
   - `password`: Hashed password
   - `role`: USER, ADMIN, or SUPER_ADMIN
   - `adminRole`: Additional admin role field (SUPER_ADMIN, ADMIN, MODERATOR)
   - `privileges`: JSON string for granular permissions
   - `accessLevel`: Specific access level descriptor

2. **Database**: PostgreSQL with Drizzle ORM (not Prisma)
   - Config: `backend/src/config/drizzle.ts`
   - Schema: `backend/src/db/schema.ts`
   - Migrations: `backend/drizzle/`
   - Drizzle Kit Config: `backend/drizzle.config.ts`

3. **Auth Middleware** (in `backend/src/middlewares/auth.ts`):
   - `authenticate`: Verifies JWT tokens using Drizzle queries
   - `requireAdmin`: Checks if user is ADMIN or SUPER_ADMIN
   - `requireSuperAdmin`: Checks if user is SUPER_ADMIN only

4. **Auth Controller** (in `backend/src/modules/auth/authController.ts`):
   - Handles login/registration using Drizzle
   - Issues JWT tokens after successful authentication

---

## Step-by-Step Implementation

### Step 1: Update Database Schema (Add Admin Permissions)

Update your `backend/src/db/schema.ts` to include admin fields in the users table:

```typescript
import {
  pgTable,
  text,
  varchar,
  uuid,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").default("USER"), // USER | ADMIN | SUPER_ADMIN
  adminRole: text("adminRole"), // SUPER_ADMIN | ADMIN | MODERATOR
  privileges: text("privileges"), // JSON string of permissions
  accessLevel: text("accessLevel"), // e.g., "MEMBERS", "FINANCE", "COMMUNICATIONS", "MEDIA"
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
```

**Create and run migration:**
```bash
cd backend
npx drizzle-kit generate  # Generate migration
npx drizzle-kit migrate   # Run migration
```

---

### Step 2: Create Email-to-Role Mapping

Create a new file: `backend/src/config/adminMapping.ts`

```typescript
/**
 * Maps email addresses to their admin roles and permissions
 * This is your source of truth for who can access what
 */

interface AdminAccess {
  role: "SUPER_ADMIN" | "ADMIN" | "MODERATOR";
  permissions: string[];
  pages: string[]; // Admin pages they can access
}

export const ADMIN_EMAIL_MAPPING: Record<string, AdminAccess> = {
  "secretary@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_MEMBERS", "EDIT_MEMBERS"],
    pages: ["AdminMembersPage", "AdminMembersListPage"],
  },
  "treasurer@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_FINANCE", "EDIT_FINANCE"],
    pages: ["AdminFinancePage"],
  },
  "communications@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_COMMUNICATIONS", "EDIT_COMMUNICATIONS"],
    pages: ["AdminCommunicationsPage", "AdminNewsletterPage"],
  },
  "media@mutcu.org": {
    role: "MODERATOR",
    permissions: ["VIEW_MEDIA", "EDIT_MEDIA"],
    pages: ["AdminMediaPage"],
  },
  "events@mutcu.org": {
    role: "MODERATOR",
    permissions: ["VIEW_EVENTS", "EDIT_EVENTS"],
    pages: ["AdminEventsPage"],
  },
  "pastor@mutcu.org": {
    role: "SUPER_ADMIN",
    permissions: [
      "VIEW_MEMBERS",
      "EDIT_MEMBERS",
      "VIEW_FINANCE",
      "EDIT_FINANCE",
      "VIEW_COMMUNICATIONS",
      "EDIT_COMMUNICATIONS",
      "VIEW_MEDIA",
      "EDIT_MEDIA",
      "VIEW_EVENTS",
      "EDIT_EVENTS",
      "VIEW_PRAYERS",
      "EDIT_PRAYERS",
      "MANAGE_USERS",
      "MANAGE_ADMINS",
    ],
    pages: ["*"], // Access all pages
  },
};

/**
 * Get admin access for an email
 */
export const getAdminAccess = (email: string): AdminAccess | null => {
  return ADMIN_EMAIL_MAPPING[email] || null;
};

/**
 * Check if email can access a specific page
 */
export const canAccessPage = (email: string, page: string): boolean => {
  const access = getAdminAccess(email);
  if (!access) return false;
  if (access.pages.includes("*")) return true;
  return access.pages.includes(page);
};
```

---

### Step 3: Create Custom Authorization Middleware

Update your `backend/src/middlewares/auth.ts` to add new middleware functions for page and permission-based access using Drizzle:

```typescript
import { eq } from "drizzle-orm";
import db from "../config/drizzle.js";
import { users } from "../db/schema.js";
import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    adminRole?: string;
    privileges?: string;
    isActive: boolean;
  };
}

/**
 * Middleware to verify JWT token (existing)
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, env.jwtSecret) as { userId: string };
    const usersArr = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);
    const user = usersArr[0];

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid or inactive user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

/**
 * Middleware to check if user is admin (existing)
 */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "ADMIN" && req.user?.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

/**
 * Middleware to check if user can access a specific admin page
 * Usage: router.get("/members", requireAdminPage("AdminMembersPage"), controller)
 */
export const requireAdminPage = (requiredPage: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // First check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Check if user is admin or super admin
      if (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN") {
        return res.status(403).json({ error: "Admin access required" });
      }

      // Check if user has access to this specific page
      const { canAccessPage } = await import("../config/adminMapping.js");
      if (!canAccessPage(req.user.email, requiredPage)) {
        return res.status(403).json({
          error: `You do not have access to ${requiredPage}. Contact your administrator.`,
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: "Access denied" });
    }
  };
};

/**
 * Middleware to check if user has a specific permission
 * Usage: router.post("/members", requirePermission("EDIT_MEMBERS"), controller)
 */
export const requirePermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { getAdminAccess } = await import("../config/adminMapping.js");
      const access = getAdminAccess(req.user.email);

      if (!access || !access.permissions.includes(requiredPermission)) {
        return res.status(403).json({
          error: `Permission '${requiredPermission}' required. Contact your administrator.`,
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: "Permission denied" });
    }
  };
};

/**
 * Middleware to check if user is super admin
 */
export const requireSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Super admin access required" });
  }
  next();
};

export type { AuthRequest };
```

---

### Step 4: Update Admin Routes

Update `backend/src/routes/adminRoutes.ts` to use the new middleware:

```typescript
import express from "express";
import { getDashboardStats } from "../modules/admin/adminController.js";
import {
  authenticate,
  requireAdmin,
  requireAdminPage,
  requirePermission,
} from "../middlewares/auth.js";

const router = express.Router();

// All admin routes require authentication
router.use(authenticate);

// Dashboard accessible to all admins
router.get("/dashboard", requireAdmin, getDashboardStats);

// Members routes - only secretary@mutcu.org
router.get(
  "/members",
  requireAdminPage("AdminMembersPage"),
  getMembersHandler
);
router.post(
  "/members",
  requireAdminPage("AdminMembersPage"),
  requirePermission("EDIT_MEMBERS"),
  createMemberHandler
);
router.put(
  "/members/:id",
  requireAdminPage("AdminMembersPage"),
  requirePermission("EDIT_MEMBERS"),
  updateMemberHandler
);

// Finance routes - only treasurer@mutcu.org
router.get(
  "/finance",
  requireAdminPage("AdminFinancePage"),
  getFinanceHandler
);
router.post(
  "/finance",
  requireAdminPage("AdminFinancePage"),
  requirePermission("EDIT_FINANCE"),
  createFinanceHandler
);

// Events routes - only events@mutcu.org
router.get("/events", requireAdminPage("AdminEventsPage"), getEventsHandler);
router.post(
  "/events",
  requireAdminPage("AdminEventsPage"),
  requirePermission("EDIT_EVENTS"),
  createEventHandler
);

// Media routes - only media@mutcu.org
router.get("/media", requireAdminPage("AdminMediaPage"), getMediaHandler);
router.post(
  "/media",
  requireAdminPage("AdminMediaPage"),
  requirePermission("EDIT_MEDIA"),
  uploadMediaHandler
);

export default router;
```

---

### Step 5: Update Login Flow to Assign Permissions

Update `backend/src/modules/auth/authController.ts` to assign permissions on login using Drizzle:

```typescript
import { eq } from "drizzle-orm";
import db from "../../config/drizzle.js";
import { users } from "../../db/schema.js";
import { getAdminAccess } from "../../config/adminMapping.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const usersArr = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const user = usersArr[0];

    if (!user) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    if (!user.isActive) {
      return errorResponse(res, "User account is inactive", 403);
    }

    // NEW: Get admin access for this email
    const adminAccess = getAdminAccess(email);

    // If email is in admin mapping, update user role
    if (adminAccess) {
      await db
        .update(users)
        .set({
          role: adminAccess.role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
          adminRole: adminAccess.role,
          privileges: JSON.stringify(adminAccess.permissions),
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      // Refresh user data
      const updatedUsersArr = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);
      const updatedUser = updatedUsersArr[0];

      // Generate token
      const token = jwt.sign({ userId: updatedUser.id }, env.jwtSecret, {
        expiresIn: env.jwtExpire,
      });

      return successResponse(
        res,
        { user: updatedUser, token },
        "Login successful",
        200,
      );
    }

    // Regular user login
    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: env.jwtExpire,
    });

    return successResponse(res, { user, token }, "Login successful", 200);
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse(res, "Login failed", 500);
  }
};
```

---

### Step 6: Create Frontend Route Guards (Client-Side)

In your React frontend, protect admin routes using a higher-order component or route wrapper.

Create `client/src/components/AdminRouteGuard.tsx`:

```typescript
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Your auth hook
import type { ReactNode } from "react";

interface AdminRouteGuardProps {
  children: ReactNode;
  requiredPage: string;
}

export const AdminRouteGuard = ({
  children,
  requiredPage,
}: AdminRouteGuardProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  // Verify user has access to this page
  // You can store allowed pages in user.privileges or verify via backend
  const allowedPages = user.privileges ? JSON.parse(user.privileges) : [];
  if (!allowedPages.includes(requiredPage) && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};
```

Use it in your route configuration:

```typescript
import { AdminRouteGuard } from "../components/AdminRouteGuard";
import AdminMembersPage from "../pages/AdminMembersPage";

<Route
  path="/admin/members"
  element={
    <AdminRouteGuard requiredPage="AdminMembersPage">
      <AdminMembersPage />
    </AdminRouteGuard>
  }
/>;
```

---

### Step 7: Add Admin Users to Database

You can manually insert admin users or create a seeding script.

Create `backend/src/scripts/seedAdmin.ts`:

```typescript
import db from "../config/drizzle.js";
import { users } from "../db/schema.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { ADMIN_EMAIL_MAPPING } from "../config/adminMapping.js";

async function seedAdmins() {
  const adminsToSeed = [
    {
      email: "secretary@mutcu.org",
      password: "secretaryMUTCU",
      name: "Church Secretary",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "treasurer@mutcu.org",
      password: "treasurerMUTCU",
      name: "Church Treasurer",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "communications@mutcu.org",
      password: "communicationsMUTCU",
      name: "Communications Lead",
      role: "ADMIN",
      adminRole: "ADMIN",
    },
    {
      email: "pastor@mutcu.org",
      password: "pastorMUTCU",
      name: "Senior Pastor",
      role: "SUPER_ADMIN",
      adminRole: "SUPER_ADMIN",
    },
  ];

  for (const admin of adminsToSeed) {
    try {
      // Check if user already exists
      const existingArr = await db
        .select()
        .from(users)
        .where(eq(users.email, admin.email))
        .limit(1);

      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const adminAccess = ADMIN_EMAIL_MAPPING[admin.email];

      if (existingArr.length > 0) {
        // Update existing user
        await db
          .update(users)
          .set({
            password: hashedPassword,
            role: admin.role,
            adminRole: admin.adminRole,
            privileges: JSON.stringify(adminAccess?.permissions || []),
            isActive: true,
            updatedAt: new Date(),
          })
          .where(eq(users.email, admin.email));

        console.log(`✓ Updated ${admin.email}`);
      } else {
        // Insert new user
        await db.insert(users).values({
          id: crypto.randomUUID(),
          email: admin.email,
          password: hashedPassword,
          name: admin.name,
          role: admin.role,
          adminRole: admin.adminRole,
          privileges: JSON.stringify(adminAccess?.permissions || []),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log(`✓ Seeded ${admin.email}`);
      }
    } catch (error) {
      console.error(`✗ Error seeding ${admin.email}:`, error);
    }
  }

  console.log("Admin seeding complete!");
  process.exit(0);
}

seedAdmins().catch((error) => {
  console.error("Seeding error:", error);
  process.exit(1);
});
```

Run it:
```bash
cd backend
npx ts-node src/scripts/seedAdmin.ts
```

---

## Testing the Implementation

### 1. Test Login with Secretary Account

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "secretary@mutcu.org",
    "password": "secretaryMUTCU"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "secretary@mutcu.org",
      "role": "ADMIN",
      "adminRole": "ADMIN",
      "privileges": "[\"VIEW_MEMBERS\",\"EDIT_MEMBERS\"]"
    },
    "token": "eyJhbGc..."
  },
  "message": "Login successful"
}
```

### 2. Test Access to Members Page (Should Succeed)

```bash
curl -X GET http://localhost:5000/api/admin/members \
  -H "Authorization: Bearer eyJhbGc..."
```

**Expected:** ✓ 200 OK - Members data returned

### 3. Test Access to Finance Page (Should Fail)

```bash
curl -X GET http://localhost:5000/api/admin/finance \
  -H "Authorization: Bearer eyJhbGc..."
```

**Expected:** ✗ 403 Forbidden - "You do not have access to AdminFinancePage"

---

## Configuration Summary

| Email | Password | Access | Role |
| --- | --- | --- | --- |
| secretary@mutcu.org | secretaryMUTCU | Members, Ministry | ADMIN |
| treasurer@mutcu.org | treasurerMUTCU | Finance | ADMIN |
| communications@mutcu.org | communicationsMUTCU | Newsletter, Blog | ADMIN |
| media@mutcu.org | mediaMUTCU | Media, Gallery | MODERATOR |
| events@mutcu.org | eventsMUTCU | Events | MODERATOR |
| pastor@mutcu.org | pastorMUTCU | All Pages | SUPER_ADMIN |

---

## Modifying Access Later

To add or change access for an email:

1. Update `backend/src/config/adminMapping.ts`
2. Restart the backend server
3. User's permissions update on next login

Example - Add new finance coordinator:
```typescript
"finance-coordinator@mutcu.org": {
  role: "MODERATOR",
  permissions: ["VIEW_FINANCE"],
  pages: ["AdminFinancePage"],
},
```

---

## Security Best Practices

1. ✅ **Use environment variables for passwords** - Never hardcode in code
2. ✅ **Use HTTPS in production** - Protects JWT tokens in transit
3. ✅ **Set JWT expiration** - Tokens expire after `jwtExpire` duration
4. ✅ **Hash passwords** - Using bcryptjs (already implemented)
5. ✅ **Validate on backend** - Never trust client-side validation alone
6. ✅ **Use role-based access** - Not just email-based
7. ✅ **Log access attempts** - Track who accessed what and when

---

## Troubleshooting

**Issue:** "You do not have access to AdminMembersPage"

- Check if email is in `adminMapping.ts`
- Verify email is spelled correctly (case-sensitive)
- Make sure user logged in after email was added to mapping
- Check browser console for token in local storage

**Issue:** JWT token expired

- User needs to login again
- Set longer `jwtExpire` in `.env` if needed

**Issue:** Changes not taking effect

- Restart backend server: `npm run dev`
- Clear browser cache and local storage
- Check user role in database

---

## Summary

You now have:

✅ Email-based access control mapping  
✅ Role-based permissions system  
✅ Custom middleware for page-level access  
✅ Backend route protection  
✅ Frontend route guards  
✅ Database persistence of roles  
✅ Seeding script for admin users  

Each admin can now access only their designated pages after logging in with their email and password!

---

## Drizzle ORM Reference

Your backend uses **Drizzle ORM** for database operations. Here are key patterns used in this implementation:

### Basic Query (SELECT)
```typescript
const usersArr = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);
const user = usersArr[0];
```

### Update
```typescript
await db
  .update(users)
  .set({
    role: "ADMIN",
    privileges: JSON.stringify(permissions),
    updatedAt: new Date(),
  })
  .where(eq(users.id, userId));
```

### Insert
```typescript
await db.insert(users).values({
  id: crypto.randomUUID(),
  email: "user@example.com",
  password: hashedPassword,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### Key Imports Needed
```typescript
import { eq } from "drizzle-orm"; // For WHERE conditions
import db from "../config/drizzle.js"; // Database instance
import { users } from "../db/schema.js"; // Table schema
```

### Database Migrations with Drizzle

When you modify `backend/src/db/schema.ts`:

```bash
# Generate migration files
npx drizzle-kit generate

# Preview changes
npx drizzle-kit studio  # Opens UI to see schema

# Apply migration to database
npx drizzle-kit migrate
```

Your migrations are stored in `backend/drizzle/` folder as SQL files.
