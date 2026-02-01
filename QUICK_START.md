# Quick Start Guide - Admin Dashboard & Database

## 🚀 5-Minute Quick Start

### 1. Create `.env` file in `backend/` folder

```env
DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/mutcu_db?schema=public"
DIRECT_URL="postgresql://postgres:your_postgres_password@localhost:5432/mutcu_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=admin123
```

Replace `your_postgres_password` with your PostgreSQL password.

### 2. Setup Database

```bash
cd backend

# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start backend (keep this running)
npm run dev
```

Backend will run on: **http://localhost:5000**

### 3. Start Frontend (New Terminal)

```bash
cd client

npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 4. Login to Admin

Visit: **http://localhost:5173/admin/login**

**Email**: admin@mutcu.ac.ke  
**Password**: admin123

---

## 📊 What You'll See

### Admin Dashboard Features:
- **Events** - Create, edit, delete events
- **Ministries** - Manage ministry information
- **Prayer Requests** - View and manage prayer requests
- **Contacts** - View contact form submissions
- **Users** - Manage user accounts
- **Members** - Manage membership data
- **Resources** - Upload and manage resources
- **Media** - Manage photos and videos
- **Blogs** - Create and manage blog posts
- **Newsletter** - Manage newsletter subscriptions

---

## 🆘 Common Issues

**PostgreSQL not running?**
- Windows: Check Services (Ctrl+R → services.msc) → PostgreSQL service
- Or run: `net start postgresql-x64-14`

**Port 5000 in use?**
- Change `PORT` in `.env` to 5001 or 5002

**Database connection error?**
- Check DATABASE_URL in `.env`
- Verify PostgreSQL password is correct

**Need to view database?**
```bash
npm run prisma:studio  # Opens database viewer
```

---

## 📱 Port Reference

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000 | 5000 |
| Prisma Studio | http://localhost:5555 | 5555 |
| Admin Login | http://localhost:5173/admin/login | 5173 |

---

See **ADMIN_SETUP_GUIDE.md** for detailed instructions.
