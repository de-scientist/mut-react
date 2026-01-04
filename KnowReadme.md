# 📚 MUTCU Project Knowledge Base

> Comprehensive knowledge documentation for the Murang'a University of Technology Christian Union (MUTCU) website project.

---

## 🎯 Project Overview

This is a **full-stack web application** built for the Murang'a University of Technology Christian Union. The project consists of:

- **Frontend**: React + TypeScript + Vite application
- **Backend**: Node.js + Express + TypeScript REST API
- **Database**: PostgreSQL with Drizzle ORM

---

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────┐
│   React Client  │  (Port 5173)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/REST API
         │ JWT Authentication
         ▼
┌─────────────────┐
│  Express API    │  (Port 5000)
│   (Backend)     │
└────────┬────────┘
         │ Drizzle ORM
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘
```

### Technology Stack Summary

**Frontend Stack:**
- React 18.3.1
- TypeScript 5.9.3
- Vite 7.2.4 (Build tool)
- React Router DOM 7.0.2
- Bootstrap 5.3.3
- AOS (Animate On Scroll) 2.3.4
- Lucide React (Icons)
- Recharts (Charts for admin)

**Backend Stack:**
- Node.js
- Express 5.2.1
- TypeScript 5.9.3
- Drizzle ORM 0.31.0
- PostgreSQL
- JWT (jsonwebtoken 9.0.3)
- Zod 4.2.1 (Validation)
- bcryptjs 3.0.3 (Password hashing)
- Helmet 8.1.0 (Security)
- CORS 2.8.5
- express-rate-limit 8.2.1

---

## 📁 Detailed Project Structure

### Backend Structure

```
backend/
├── db/
│   └── schema.ts              # Drizzle schema definition (User, Event, Ministry, etc.)
│
├── src/
│   ├── config/
│   │   ├── database.ts        # Database connection config
│   │   ├── drizzle.ts         # Drizzle ORM config (alternative ORM)
│   │   └── env.ts             # Environment variables loader
│   │
│   ├── modules/               # Feature-based modules
│   │   ├── admin/
│   │   │   └── adminController.ts  # Admin dashboard stats
│   │   ├── auth/
│   │   │   └── authController.ts   # Login, register, profile
│   │   ├── contact/
│   │   │   └── contactController.ts # Contact form submissions
│   │   ├── events/
│   │   │   └── eventController.ts    # Event CRUD operations
│   │   ├── ministries/
│   │   │   └── ministryController.ts # Ministry CRUD operations
│   │   ├── newsletter/
│   │   │   └── newsletterController.ts # Newsletter subscriptions
│   │   ├── prayer/
│   │   │   └── prayerController.ts    # Prayer request handling
│   │   └── users/
│   │       └── usersController.ts     # User management
│   │
│   ├── routes/                # API route definitions
│   │   ├── adminRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── contactRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── ministryRoutes.ts
│   │   ├── newsletterRoutes.ts
│   │   ├── prayerRoutes.ts
│   │   └── usersRoutes.ts
│   │
│   ├── middlewares/
│   │   ├── auth.ts            # JWT authentication middleware
│   │   ├── errorHandler.ts    # Global error handler
│   │   └── validation.ts      # Request validation middleware
│   │
│   ├── utils/
│   │   ├── pagination.ts      # Pagination helper functions
│   │   └── response.ts        # Standardized API response format
│   │
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server entry point
│
├── package.json
├── tsconfig.json
└── nodemon.json               # Nodemon config for dev auto-reload
```

### Frontend Structure

```
client/
├── public/
│   └── assets/                # Static assets
│       ├── css/               # Global CSS files
│       ├── fonts/             # Custom fonts
│       └── images/            # Image assets
│
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Footer.tsx         # Footer component
│   │   └── ConfirmationModal.tsx # Modal component
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAOS.ts          # AOS animation hook
│   │   ├── useNavbarScroll.ts # Navbar scroll behavior
│   │   └── useTimedSuccess.ts # Success message timing
│   │
│   ├── layouts/               # Layout components
│   │   ├── MainLayout.tsx     # Main site layout
│   │   └── AdminLayout.tsx    # Admin dashboard layout
│   │
│   ├── pages/                 # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── MinistriesPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── Register.tsx
│   │   ├── committees/         # Committee pages
│   │   │   ├── ChairmanPage.tsx
│   │   │   ├── ViceChair1Page.tsx
│   │   │   ├── ViceChair2Page.tsx
│   │   │   ├── SecretaryPage.tsx
│   │   │   ├── ViceSecretaryPage.tsx
│   │   │   ├── TreasurerPage.tsx
│   │   │   ├── BibleStudyCoordinatorPage.tsx
│   │   │   ├── CreativeCoordinatorPage.tsx
│   │   │   ├── MissionsCoordinatorPage.tsx
│   │   │   ├── MusicCoordinatorPage.tsx
│   │   │   ├── PrayerCoordinatorPage.tsx
│   │   │   └── TechnicalCoordinatorPage.tsx
│   │   └── ministries/        # Ministry detail pages
│   │       ├── MusicMinistryPage.tsx
│   │       ├── BibleStudyMinistryPage.tsx
│   │       ├── MissionsEvangelismMinistryPage.tsx
│   │       ├── CreativeArtsMinistryPage.tsx
│   │       ├── PrayerMinistryPage.tsx
│   │       ├── HospitalityMinistryPage.tsx
│   │       ├── TechnicalDepartmentPage.tsx
│   │       ├── WelfareCommitteePage.tsx
│   │       └── RMCPage.tsx
│   │
│   ├── services/
│   │   └── api.ts             # API client functions
│   │
│   ├── store/
│   │   └── authStore.ts       # Authentication state management
│   │
│   ├── styles/
│   │   └── global.css         # Global styles
│   │
│   ├── App.tsx                # Main app component with routes
│   └── main.tsx               # Application entry point
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔑 Key Concepts & Patterns

### Authentication Flow

1. **User Registration/Login**
   - User submits credentials via `/api/auth/login` or `/api/auth/register`
   - Backend validates credentials and generates JWT token
   - Token returned to frontend and stored in `localStorage`
   - Subsequent requests include token in `Authorization: Bearer <token>` header

2. **Protected Routes**
   - Middleware `authenticate` verifies JWT token
   - Middleware `requireAdmin` checks user role (ADMIN or SUPER_ADMIN)
   - Invalid/expired tokens return 401 Unauthorized

### API Response Format

All API responses follow a standardized format:

```typescript
{
  success: boolean,
  message: string,
  data?: any
}
```

Error responses:
```typescript
{
  success: false,
  message: string,
  error?: any
}
```

### Database Models

**User Model:**
- `id` (UUID)
- `email` (unique)
- `password` (hashed)
- `name` (optional)
- `role` (USER | ADMIN | SUPER_ADMIN)
- `isActive` (boolean)

**Event Model:**
- `id` (UUID)
- `title`
- `description` (optional)
- `date` (DateTime)
- `time` (optional string)
- `location` (optional)
- `imageUrl` (optional)
- `isActive` (boolean)

**Ministry Model:**
- `id` (UUID)
- `name` (unique)
- `description` (optional)
- `icon` (optional)
- `imageUrl` (optional)
- `slug` (unique, URL-friendly)
- `isActive` (boolean)

**PrayerRequest Model:**
- `id` (UUID)
- `name` (optional)
- `request` (required)
- `isPublic` (boolean)
- `status` (PENDING | PRAYED_FOR | ANSWERED)

**ContactSubmission Model:**
- `id` (UUID)
- `name`
- `email`
- `subject`
- `message`
- `status` (NEW | IN_PROGRESS | RESOLVED | ARCHIVED)

**NewsletterSubscription Model:**
- `id` (UUID)
- `email` (unique)
- `isActive` (boolean)

---

## 🔌 API Integration Guide

### Frontend API Client

The frontend uses a centralized API client located in `client/src/services/api.ts`.

**Usage Example:**
```typescript
import { eventsAPI, authAPI } from './services/api'

// Get all events
const events = await eventsAPI.getAll()

// Login
const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
})

// Store token
localStorage.setItem('token', response.data.token)
```

### API Base URL Configuration

The API base URL is configured via environment variable:
- Development: `VITE_API_URL=http://localhost:5000/api`
- Production: Set in production `.env` file

---

## 🎨 Frontend Routing

### Public Routes

- `/` - Home page
- `/about` - About page
- `/ministries` - Ministries listing
- `/ministries/:slug` - Ministry detail pages
- `/events` - Events listing
- `/contact` - Contact form
- `/resources` - Resources page
- `/gallery` - Gallery page
- `/register` - User registration

### Committee Routes

- `/committees/chairman`
- `/committees/vice-chair-1`
- `/committees/vice-chair-2`
- `/committees/secretary`
- `/committees/vice-secretary`
- `/committees/treasurer`
- `/committees/bible-study`
- `/committees/creative`
- `/committees/missions`
- `/committees/music`
- `/committees/prayer`
- `/committees/technical`

### Admin Routes

- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (protected)

---

## 🛡️ Security Implementation

### Backend Security

1. **Helmet.js** - Sets security HTTP headers
2. **CORS** - Restricts cross-origin requests to configured frontend URL
3. **Rate Limiting** - 100 requests per 15 minutes per IP address
4. **JWT Authentication** - Token-based authentication with expiration
5. **Password Hashing** - bcryptjs with salt rounds
6. **Input Validation** - Zod schema validation on all inputs
7. **SQL Injection Protection** - Drizzle ORM uses parameterized queries

### Frontend Security

1. **Token Storage** - JWT tokens stored in `localStorage`
2. **Protected Routes** - Client-side route protection (should be verified server-side)
3. **Input Sanitization** - React's built-in XSS protection

---

## 📊 Admin Dashboard

The admin dashboard provides statistics and management capabilities:

**Dashboard Stats:**
- Total users
- Total events
- Total ministries
- Total prayer requests
- Total contact submissions
- Newsletter subscriptions
- Pending prayer requests
- New contact submissions

**Access:**
- Requires JWT authentication
- Requires ADMIN or SUPER_ADMIN role
- Endpoint: `GET /api/admin/dashboard`

See `AdminReadme.md` for detailed implementation notes.

---

## 🔄 Development Workflow

### Adding a New Feature

**Backend:**
1. Create controller in `backend/src/modules/[feature]/[feature]Controller.ts`
2. Create routes in `backend/src/routes/[feature]Routes.ts`
3. Register routes in `backend/src/app.ts`
4. Add validation schemas if needed
5. Update Drizzle schema in `backend/src/db/schema.ts` if database changes needed
6. Create/update database tables as needed

**Frontend:**
1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add API functions in `client/src/services/api.ts`
4. Create any needed components in `client/src/components/`

### Database Changes

1. Update `backend/src/db/schema.ts`
2. Ensure database tables match the schema
3. Use drizzle-kit for migrations if configured, or manually update tables

---

## 🧪 Testing Considerations

### Manual Testing Checklist

- [ ] User registration and login
- [ ] JWT token authentication
- [ ] Protected routes (admin dashboard)
- [ ] Event CRUD operations
- [ ] Ministry CRUD operations
- [ ] Prayer request submission
- [ ] Contact form submission
- [ ] Newsletter subscription
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] Error handling

### Environment Testing

- [ ] Development environment
- [ ] Production build
- [ ] Database migrations
- [ ] Environment variables

---

## 🐛 Common Issues & Solutions

### Issue: Database Connection Failed

**Solution:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure database exists: `createdb mutcu_db`
- Verify user permissions

### Issue: CORS Errors

**Solution:**
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check that frontend is running on correct port (5173)
- Verify CORS middleware is configured correctly

### Issue: JWT Token Invalid

**Solution:**
- Verify `JWT_SECRET` is set in backend `.env`
- Check token expiration settings
- Ensure token is included in `Authorization` header
- Verify token format: `Bearer <token>`

### Issue: Database Schema Errors

**Solution:**
- Check Drizzle schema in `backend/src/db/schema.ts` for syntax errors
- Verify database tables exist and match schema
- Check `DATABASE_URL` is set correctly
- Verify database connection in `backend/src/config/drizzle.ts`

### Issue: TypeScript Errors

**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Verify TypeScript version compatibility

---

## 📦 Dependencies Overview

### Critical Backend Dependencies

- **express** - Web framework
- **drizzle-orm** - Drizzle ORM core library
- **pg** - PostgreSQL client for Node.js
- **jsonwebtoken** - JWT token generation/verification
- **bcryptjs** - Password hashing
- **zod** - Schema validation
- **helmet** - Security headers
- **cors** - CORS middleware
- **express-rate-limit** - Rate limiting

### Critical Frontend Dependencies

- **react** - UI library
- **react-dom** - React DOM bindings
- **react-router-dom** - Client-side routing
- **vite** - Build tool and dev server
- **typescript** - Type safety
- **bootstrap** - CSS framework
- **aos** - Scroll animations

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Update all environment variables for production
- [ ] Change default admin credentials
- [ ] Set strong `JWT_SECRET`
- [ ] Update `FRONTEND_URL` to production URL
- [ ] Update `VITE_API_URL` in frontend `.env`
- [ ] Run database migrations
- [ ] Test production build locally

### Backend Deployment

- [ ] Set `NODE_ENV=production`
- [ ] Verify database tables exist (from schema.ts)
- [ ] Ensure database connection is configured
- [ ] Start server with `npm start`
- [ ] Configure process manager (PM2, systemd, etc.)
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules

### Frontend Deployment

- [ ] Build production bundle: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Deploy `dist/` folder to hosting service
- [ ] Configure environment variables on hosting platform
- [ ] Set up custom domain (if applicable)
- [ ] Configure CDN (if applicable)

---

## 📚 Additional Resources

### Documentation Files

- `README.md` - Main project documentation
- `backend/README.md` - Backend-specific docs
- `backend/SETUP.md` - Backend setup guide
- `backend/MIGRATION_GUIDE.md` - Database migration guide
- `client/README.md` - Frontend-specific docs
- `client/FIX_404.md` - 404 error fixes
- `AdminReadme.md` - Admin dashboard details

### External Resources

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vite.dev)

---

## 👥 Team & Contact

**Lead Developer:** Mark Kinyanjui (De-Scientist)  
**Organization:** TechVision Studios & Solutions  
**Project:** MUTCU Website

---

## 📝 Notes

- This project uses **ES Modules** (import/export) throughout
- Both frontend and backend use **TypeScript** for type safety
- The project follows a **modular architecture** for scalability
- Database schema is defined using **Drizzle ORM** in `backend/src/db/schema.ts`
- Authentication is **JWT-based** with role-based access control

---

**Last Updated:** January 2025

