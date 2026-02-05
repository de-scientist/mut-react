# 🚀 Quick Commands Reference

## Database Setup

```bash
# Generate migration files
cd backend
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit migrate

# View schema in UI (optional)
npx drizzle-kit studio
```

## Seeding Admin Users

```bash
# From backend directory
npx ts-node src/scripts/seedAdmin.ts
```

**Success indicators:**
- ✓ Seeded secretary@mutcu.org
- ✓ Seeded treasurer@mutcu.org
- ✓ Seeded communications@mutcu.org
- ✓ Seeded media@mutcu.org
- ✓ Seeded events@mutcu.org
- ✓ Seeded pastor@mutcu.org
- ✅ Admin seeding complete!

## Running Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

## Testing Login

```bash
# Test with secretary account
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"secretary@mutcu.org","password":"secretaryMUTCU"}'

# Test with pastor (super admin) account
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"pastor@mutcu.org","password":"pastorMUTCU"}'
```

## Testing Access Control

```bash
# Replace TOKEN with actual JWT from login response

# Secretary accessing members (should succeed)
curl -X GET http://localhost:5000/api/admin/members \
  -H "Authorization: Bearer TOKEN"

# Secretary accessing finance (should fail with 403)
curl -X GET http://localhost:5000/api/admin/finance \
  -H "Authorization: Bearer TOKEN"

# Pastor accessing any endpoint (should succeed)
curl -X GET http://localhost:5000/api/admin/finance \
  -H "Authorization: Bearer TOKEN"
```

## File References

### Backend Files
- Schema: `backend/src/db/schema.ts`
- Admin Mapping: `backend/src/config/adminMapping.ts`
- Auth Middleware: `backend/src/middlewares/auth.ts`
- Auth Controller: `backend/src/modules/auth/authController.ts`
- Admin Routes: `backend/src/routes/adminRoutes.ts`
- Seeding Script: `backend/src/scripts/seedAdmin.ts`

### Frontend Files
- Route Guard: `client/src/components/AdminRouteGuard.tsx`

## Admin Credentials

| Email | Password |
|-------|----------|
| secretary@mutcu.org | secretaryMUTCU |
| treasurer@mutcu.org | treasurerMUTCU |
| communications@mutcu.org | communicationsMUTCU |
| media@mutcu.org | mediaMUTCU |
| events@mutcu.org | eventsMUTCU |
| pastor@mutcu.org | pastorMUTCU |

## Database Fields Added to Users Table

```typescript
- adminRole: text        // SUPER_ADMIN | ADMIN | MODERATOR
- privileges: text       // JSON string of permissions
- accessLevel: text      // Access descriptor
```

## New Middleware Functions

```typescript
// Page-level access
requireAdminPage("AdminMembersPage")

// Permission-level access
requirePermission("EDIT_MEMBERS")
```

## Modifying Admin Access

Edit `backend/src/config/adminMapping.ts`:

```typescript
"newemail@mutcu.org": {
  role: "ADMIN",
  permissions: ["VIEW_MEMBERS", "EDIT_MEMBERS"],
  pages: ["AdminMembersPage"],
}
```

Then restart backend:
```bash
# Ctrl+C to stop current server
npm run dev
```

## Documentation Files

- `AccessReadme.md` - Full implementation guide
- `IMPLEMENTATION_COMPLETE.md` - Detailed changes summary
- `SETUP_SUMMARY.md` - Visual implementation overview
- `QUICK_COMMANDS.md` - This file

---

**All implementations complete! Ready to test.** ✅
