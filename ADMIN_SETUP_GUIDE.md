# Admin Dashboard & Database Setup Guide

This guide will help you set up the database and access the admin dashboard.

---

## 📋 Prerequisites

Before starting, ensure you have installed:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **PostgreSQL** v14+ ([Download](https://www.postgresql.org/download/))
- **PostgreSQL GUI (pgAdmin)** or **DBeaver** (optional, for easier database management)

---

## Step 1: PostgreSQL Setup

### On Windows:

1. **Install PostgreSQL** from [postgresql.org](https://www.postgresql.org/download/windows/)
2. **Start PostgreSQL Service**:
   - Open Services (Ctrl + R → services.msc)
   - Find "PostgreSQL" service and ensure it's running
   - Or use: `net start postgresql-x64-14` (replace version number)

3. **Open pgAdmin** (installed with PostgreSQL):
   - Go to: `http://localhost:5050` or search for pgAdmin
   - Default login: `postgres` / password you set during installation
   - Create a new database called `mutcu_db`

**OR create via Command Line**:

```bash
psql -U postgres -c "CREATE DATABASE mutcu_db;"
```

---

## Step 2: Backend Configuration

### 1. Navigate to Backend Directory

```bash
cd c:\Users\mutcu\OneDrive\Documents\GitHub\mut-react\backend
```

### 2. Create `.env` File

Create a file named `.env` in the `backend/` folder with:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/mutcu_db?schema=public"
DIRECT_URL="postgresql://postgres:your_postgres_password@localhost:5432/mutcu_db"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin Credentials (Initial Setup)
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=admin123
```

**⚠️ Important**: Replace `your_postgres_password` with the password you set during PostgreSQL installation.

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., `init`). This creates all required tables.

### 6. Seed Database (Optional - Adds Initial Data)

```bash
npm run prisma:seed
```

This populates the database with sample data and creates the admin user.

### 7. Verify Database

```bash
npm run prisma:studio
```

This opens Prisma Studio at `http://localhost:5555` to view your database tables.

---

## Step 3: Start the Backend Server

```bash
npm run dev
```

Expected output:
```
Server is running on http://localhost:5000
```

**Backend is now running on**: `http://localhost:5000`

---

## Step 4: Start the Frontend

In a **new terminal** (keep backend running):

```bash
cd c:\Users\mutcu\OneDrive\Documents\GitHub\mut-react\client
npm install
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**Frontend is now running on**: `http://localhost:5173`

---

## Step 5: Access Admin Dashboard

### Login to Admin Panel:

1. Go to: `http://localhost:5173/admin/login`
2. Use credentials from your `.env` file:
   - **Email**: `admin@mutcu.ac.ke`
   - **Password**: `admin123`
3. Click "Login"

### Admin Dashboard Features:

- **Events Management** → `/admin/events`
- **Ministries Management** → `/admin/ministries`
- **Prayer Requests** → `/admin/prayer-requests`
- **Contact Submissions** → `/admin/contacts`
- **Newsletter Subscriptions** → `/admin/newsletter`
- **Users Management** → `/admin/users`
- **Members Management** → `/admin/members`
- **Resources Management** → `/admin/resources`
- **Media Management** → `/admin/media`
- **Blogs Management** → `/admin/blogs`

---

## 📡 API Endpoints

Your backend API runs at: `http://localhost:5000/api`

Key endpoints:
- **Authentication**: `POST /api/auth/login`
- **Events**: `GET /api/events`, `POST /api/events` (admin only)
- **Ministries**: `GET /api/ministries`, `POST /api/ministries` (admin only)
- **Users**: `GET /api/users` (admin only)

---

## 🔧 Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
- Ensure PostgreSQL service is running
- Check DATABASE_URL in `.env`
- Verify PostgreSQL is on port 5432

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution**:
```bash
# Windows: Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change PORT in .env to 5001, 5002, etc.
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Migration Issues
```bash
# Reset migrations (⚠️ Deletes all data)
npm run prisma:migrate reset

# Then seed again
npm run prisma:seed
```

---

## 🚀 Quick Start Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `mutcu_db` created
- [ ] `.env` file created in backend with correct DATABASE_URL
- [ ] `npm install` completed in backend
- [ ] `npm run prisma:generate` completed
- [ ] `npm run prisma:migrate` completed
- [ ] `npm run dev` started (backend running on port 5000)
- [ ] Frontend `npm run dev` started (frontend running on port 5173)
- [ ] Admin login works at `http://localhost:5173/admin/login`

---

## 📚 Useful Commands

```bash
# Backend commands
npm run dev              # Start development server
npm start               # Start production server
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio (database viewer)
npm run seed            # Populate database with seed data

# Frontend commands
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## 🔐 Security Notes

⚠️ **Important for Production**:

1. Change default admin password
2. Update JWT_SECRET to a strong random value
3. Use environment variables for sensitive data
4. Never commit `.env` file to git
5. Enable HTTPS in production
6. Set NODE_ENV=production for production

---

## 📞 Support

If you encounter issues:

1. Check PostgreSQL is running: `psql -U postgres`
2. Verify `.env` file exists and has correct DATABASE_URL
3. Check terminal for error messages
4. Clear node_modules and reinstall: `npm install --legacy-peer-deps`

---

**You're all set! 🎉 Access your admin dashboard at `http://localhost:5173/admin`**
