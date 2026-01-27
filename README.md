# 🌿 Murang'a University of Technology Christian Union (MUTCU) Website

> **A modern, full-stack, Christ-centered digital platform.** Designed to streamline communication, leadership visibility, and ministry engagement for the Murang'a University of Technology Christian Union.

![Build Status](https://img.shields.io/badge/build-active-success)
![Frontend](https://img.shields.io/badge/frontend-React%2018%20%7C%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express%205-green)
![Database](https://img.shields.io/badge/database-PostgreSQL%20%7C%20Prisma-orange)
![License](https://img.shields.io/badge/license-Proprietary-red)

---

## 📖 Project Overview

The **MUTCU Website** serves as the official digital presence for the Union. It provides a professional, spiritually grounded interface that connects students to leadership, ministries, and spiritual resources.

### Core Objectives
* **Information Integrity:** Precise representation of the Union's constitution and leadership structure.
* **Ministry Engagement:** Dedicated portals for various committees and sub-groups.
* **Administrative Efficiency:** Secure dashboard for managing events, prayer requests, and newsletters.
* **Scalable Architecture:** Built with a modern TypeScript stack for long-term maintainability.

---

## ✨ Key Features

### 🌐 User Experience
* **Dynamic Leadership Hub:** Specific pages for the Executive Committee and Departmental heads.
* **Ministry Showcase:** Rich-media pages with "Animate On Scroll" (AOS) effects.
* **Interactive Spiritual Tools:** Real-time prayer request submissions and newsletter sign-ups.
* **Resource Center:** Access to Union documents, gallery, and upcoming event schedules.

### 🛡️ Administrative Suite
* **Role-Based Access:** Granular permissions (**User**, **Admin**, **Super Admin**).
* **Content Management:** Full CRUD operations for Events, Ministries, Media, and Resources.
* **Inbound Management:** Centralized tracking for Contact Form submissions and Prayer Requests.
* **Analytics Dashboard:** Visual insights using Recharts for Union growth and engagement.

---

## 🧱 Tech Stack

### Frontend
* **Framework:** React 18 with TypeScript
* **Build Tool:** Vite
* **Routing:** React Router DOM v7
* **Styling:** Bootstrap 5 & Custom CSS
* **Animations:** AOS (Animate On Scroll)
* **Icons:** Lucide React
* **Charts:** Recharts

### Backend
* **Runtime:** Node.js with TypeScript
* **Framework:** Express.js 5
* **Database:** PostgreSQL 14+
* **ORM:** Drizzle ORM (with Prisma for migrations/seeding)
* **Authentication:** JWT with bcryptjs
* **Security:** Helmet, CORS, Rate Limiting
* **Validation:** Zod Schema Validation

---

## 🗂️ Project Structure

```text
mut-react/
├── backend/                    # Express API Server
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.ts            # Database seeding script
│   │   └── migrations/        # Database migrations
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication & authorization
│   │   │   ├── events/        # Events management
│   │   │   ├── ministries/    # Ministries management
│   │   │   ├── prayer/        # Prayer requests
│   │   │   ├── contact/       # Contact form submissions
│   │   │   ├── newsletter/    # Newsletter subscriptions
│   │   │   ├── resources/     # Resources management
│   │   │   ├── blogs/         # Blog posts
│   │   │   └── admin/         # Admin dashboard
│   │   ├── routes/            # API route definitions
│   │   ├── middlewares/       # Auth, validation, error handlers
│   │   ├── config/            # Database & environment config
│   │   ├── utils/             # Helper functions
│   │   ├── app.ts             # Express app configuration
│   │   └── server.ts          # Server entry point
│   └── package.json
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # View components
│   │   │   ├── admin/         # Admin dashboard pages
│   │   │   └── ...            # Public pages
│   │   ├── services/          # API client functions
│   │   ├── hooks/             # Custom React hooks
│   │   ├── layouts/           # Layout components
│   │   ├── store/             # State management
│   │   └── styles/            # CSS files
│   └── package.json
│
└── README.md                   # This file
```

---

## 🚀 Complete Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/de-scientist/mut-react.git
cd mut-react
```

---

### Step 2: Database Setup

#### 2.1 Start PostgreSQL Service

**On Linux:**
```bash
sudo service postgresql start
```

**On macOS:**
```bash
brew services start postgresql
```

**On Windows:**
PostgreSQL should start automatically as a service.

#### 2.2 Create Database

Open PostgreSQL prompt:
```bash
# Connect as postgres user
sudo -u postgres psql

# Or if you have a password-protected user
psql -U your_username
```

Create the database:
```sql
CREATE DATABASE mutcu_db;
\q
```

---

### Step 3: Backend Setup

#### 3.1 Navigate to Backend Directory

```bash
cd backend
```

#### 3.2 Install Dependencies

```bash
npm install
```

#### 3.3 Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
touch .env
```

Add the following configuration:

```env
# Database Connection
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/mutcu_db?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Default Admin Credentials
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=Admin@123
```

**Important:** Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

#### 3.4 Run Database Migrations

Generate Prisma Client:
```bash
npm run prisma:generate
```

Run migrations to create database tables:
```bash
npm run prisma:migrate
```

When prompted for a migration name, enter something descriptive like `init` or `initial_setup`.

#### 3.5 Seed the Database

Populate the database with initial data:
```bash
npm run seed
```

This will create:
- Default admin user
- Sample events
- Sample ministries
- Sample resources

#### 3.6 Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ Database connected successfully
```

The backend API is now running at `http://localhost:5000`

---

### Step 4: Frontend Setup

Open a **new terminal window** (keep the backend running).

#### 4.1 Navigate to Client Directory

```bash
cd client
```

#### 4.2 Install Dependencies

```bash
npm install
```

#### 4.3 Configure Environment Variables

Create a `.env` file in the `client/` directory:

```bash
touch .env
```

Add the following:

```env
VITE_API_URL=http://localhost:5000/api
```

#### 4.4 Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The frontend is now running at `http://localhost:5173`

---

### Step 5: Verify Installation

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Test public pages:**
   - Home page should load
   - Navigate to Events, Ministries, etc.
3. **Test admin login:**
   - Go to `http://localhost:5173/admin/login`
   - Login with:
     - Email: `admin@mutcu.ac.ke`
     - Password: `Admin@123` (or whatever you set in `.env`)
4. **Verify API:**
   - Open `http://localhost:5000/api/events` in your browser
   - You should see JSON data

---

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/events` | Get all events (public only) |
| GET | `/api/ministries` | Get all ministries |
| GET | `/api/resources` | Get all resources |
| GET | `/api/blogs` | Get all blog posts |
| POST | `/api/prayer` | Submit prayer request |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |

### Protected Endpoints (Require JWT Token)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/auth/profile` | Get user profile | User |
| GET | `/api/admin/stats` | Dashboard statistics | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| POST | `/api/events` | Create event | Admin |
| PATCH | `/api/events/:id` | Update event | Admin |
| DELETE | `/api/events/:id` | Delete event | Admin |
| GET | `/api/prayer` | Get all prayer requests | Admin |
| PATCH | `/api/prayer/:id/status` | Update prayer status | Admin |
| GET | `/api/contact` | Get all contact submissions | Admin |
| PATCH | `/api/contact/:id/status` | Update contact status | Admin |

---

## 🔧 Common Commands

### Backend Commands

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Seed database
npm run seed

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Frontend Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🛠️ Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server`

**Solution:**
1. Ensure PostgreSQL is running: `sudo service postgresql status`
2. Check your `DATABASE_URL` in `.env`
3. Verify PostgreSQL credentials are correct

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Change the port in `backend/.env`: `PORT=5001`
2. Update `client/.env`: `VITE_API_URL=http://localhost:5001/api`

### Prisma Migration Errors

**Error:** `Migration failed`

**Solution:**
1. Reset the database: `npm run prisma:migrate reset`
2. Re-run migrations: `npm run prisma:migrate`
3. Seed again: `npm run seed`

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
1. Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
2. Restart the backend server

---

## 🧭 Design Philosophy

We follow a "Leadership-First" approach. Every ministry and committee page adheres to a standardized flow:

1. **Hero:** Spiritual theme and identity
2. **Profile:** Current office holders
3. **Vision:** Mandate and objectives
4. **Action:** Roles and meeting times

---

## 🛡️ License & Ownership

**Proprietary Software.** Copyright © 2026 Murang'a University of Technology Christian Union.

Unauthorized duplication or redistribution is strictly prohibited.

**Lead Architect:** Mark Kinyanjui (De-Scientist)  
**Organization:** TechVision Studios & Solutions

---

## 📞 Support

For technical issues or questions:
- **Email:** admin@mutcu.ac.ke
- **GitHub Issues:** [Report a bug](https://github.com/de-scientist/mut-react/issues)

---

**Built with discipline.**  
*Last Updated: January 2026*
