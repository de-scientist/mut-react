# MUTCU Backend API

A production-ready Node.js/Express backend with TypeScript, PostgreSQL, and Prisma ORM.

## 🚀 Features

- ✅ TypeScript with ES modules
- ✅ PostgreSQL database with Drizzle ORM
- ✅ Prisma for database migrations and seeding
- ✅ JWT authentication & authorization
- ✅ Zod schema validation
- ✅ RESTful API design
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Comprehensive error handling
- ✅ Role-based access control (User, Admin, Super Admin)
- ✅ Admin dashboard with analytics

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **PostgreSQL** v14+ ([Download](https://www.postgresql.org/download/))
- **npm** (comes with Node.js)

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Start PostgreSQL Service

**Linux:**
```bash
sudo service postgresql start
```

**macOS:**
```bash
brew services start postgresql
```

**Windows:** PostgreSQL runs as a service automatically.

#### Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE mutcu_db;

# Exit
\q
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/mutcu_db?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Default Admin Credentials (created during seeding)
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=Admin@123
```

**Important Notes:**
- Replace `your_username` and `your_password` with your PostgreSQL credentials
- Change `JWT_SECRET` to a strong, random string (min 32 characters)
- Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` for your admin account

### 4. Database Setup

#### Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the Prisma Client for migrations (note: the app uses Drizzle ORM for queries).

#### Run Migrations

```bash
npm run prisma:migrate
```

When prompted, enter a migration name like `init` or `initial_setup`.

This will:
- Create all database tables
- Apply the schema to your PostgreSQL database
- Generate migration files in `prisma/migrations/`

### 5. Seed Database

```bash
npm run seed
```

This populates the database with:
- Default admin user (using credentials from `.env`)
- Sample events
- Sample ministries
- Sample resources
- Sample blog posts

### 6. Start Development Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ Database connected successfully
```

The API is now running at `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Protected |

### Events

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/events` | Get all events | Public |
| GET | `/api/events/:id` | Get single event | Public |
| POST | `/api/events` | Create event | Admin |
| PATCH | `/api/events/:id` | Update event | Admin |
| DELETE | `/api/events/:id` | Delete event | Admin |

### Ministries

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/ministries` | Get all ministries | Public |
| GET | `/api/ministries/:id` | Get single ministry | Public |
| POST | `/api/ministries` | Create ministry | Admin |
| PATCH | `/api/ministries/:id` | Update ministry | Admin |
| DELETE | `/api/ministries/:id` | Delete ministry | Admin |

### Resources

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/resources` | Get all resources | Public |
| POST | `/api/resources` | Create resource | Admin |
| PATCH | `/api/resources/:id` | Update resource | Admin |
| DELETE | `/api/resources/:id` | Delete resource | Admin |

### Prayer Requests

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/prayer` | Submit prayer request | Public |
| GET | `/api/prayer` | Get all requests | Admin |
| GET | `/api/prayer/public` | Get public requests | Public |
| PATCH | `/api/prayer/:id/status` | Update status | Admin |
| DELETE | `/api/prayer/:id` | Delete request | Admin |

### Contact Submissions

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all submissions | Admin |
| PATCH | `/api/contact/:id/status` | Update status | Admin |
| DELETE | `/api/contact/:id` | Delete submission | Admin |

### Newsletter

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter | Public |
| GET | `/api/newsletter/subscribers` | Get all subscribers | Admin |
| DELETE | `/api/newsletter/:id` | Unsubscribe | Admin |

### Admin Dashboard

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/stats` | Get dashboard statistics | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| PATCH | `/api/admin/users/:id` | Update user role/status | Admin |

### Blogs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blogs` | Get all blog posts | Public |
| GET | `/api/blogs/:id` | Get single post | Public |
| POST | `/api/blogs` | Create post | Admin |
| PATCH | `/api/blogs/:id` | Update post | Admin |
| DELETE | `/api/blogs/:id` | Delete post | Admin |

---

## 🗂️ Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Migration history
│
├── src/
│   ├── config/
│   │   ├── database.ts        # Database connection
│   │   └── env.ts             # Environment variables
│   │
│   ├── modules/               # Feature modules
│   │   ├── auth/
│   │   │   ├── authController.ts
│   │   │   └── authService.ts
│   │   ├── events/
│   │   │   └── eventController.ts
│   │   ├── ministries/
│   │   │   └── ministryController.ts
│   │   ├── prayer/
│   │   │   └── prayerController.ts
│   │   ├── contact/
│   │   │   └── contactController.ts
│   │   ├── newsletter/
│   │   │   └── newsletterController.ts
│   │   ├── resources/
│   │   │   └── resourcesController.ts
│   │   ├── blogs/
│   │   │   └── blogController.ts
│   │   └── admin/
│   │       └── adminController.ts
│   │
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── ministryRoutes.ts
│   │   ├── prayerRoutes.ts
│   │   ├── contactRoutes.ts
│   │   ├── newsletterRoutes.ts
│   │   ├── resourcesRoutes.ts
│   │   ├── blogRoutes.ts
│   │   └── adminRoutes.ts
│   │
│   ├── middlewares/
│   │   ├── auth.ts            # JWT authentication
│   │   ├── validation.ts      # Zod validation
│   │   └── errorHandler.ts    # Error handling
│   │
│   ├── utils/
│   │   ├── response.ts        # API response helpers
│   │   └── pagination.ts      # Pagination utilities
│   │
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
│
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Generate Prisma Client (run after schema changes)
npm run prisma:generate

# Create and apply database migration
npm run prisma:migrate

# Seed database with sample data
npm run seed

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database (WARNING: deletes all data)
npm run prisma:migrate reset
```

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Flow

1. **POST** `/api/auth/login` with email and password
2. Receive JWT token in response
3. Include token in subsequent requests:
   ```
   Authorization: Bearer <your_token>
   ```

### Protected Routes

Routes marked as "Protected" or "Admin" require authentication:

```javascript
// Example request with authentication
fetch('http://localhost:5000/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New Event',
    date: '2026-02-01',
    // ...
  })
})
```

### User Roles

- **USER:** Basic access, can view public content
- **ADMIN:** Can manage content (events, ministries, etc.)
- **SUPER_ADMIN:** Full system access, can manage users

---

## 🛠️ Troubleshooting

### Database Connection Failed

**Error:** `Can't reach database server`

**Solution:**
1. Check if PostgreSQL is running:
   ```bash
   sudo service postgresql status
   ```
2. Verify `DATABASE_URL` in `.env`
3. Test connection:
   ```bash
   psql -U your_username -d mutcu_db
   ```

### Prisma Migration Errors

**Error:** `Migration failed to apply`

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate reset

# Re-run migrations
npm run prisma:migrate

# Seed database again
npm run seed
```

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000:
  ```bash
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### JWT Secret Not Secure

**Error:** `JWT secret must be at least 32 characters`

**Solution:**
- Generate a secure secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Update `JWT_SECRET` in `.env`

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Zod Documentation](https://zod.dev/)

---

## 🤝 Contributing

This is a proprietary project for MUTCU. For contributions or issues, contact the project maintainer.

---

## 📞 Support

For technical support:
- **Email:** admin@mutcu.ac.ke
- **Lead Developer:** Mark Kinyanjui (De-Scientist)

---

**Last Updated:** January 2026

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Module System**: ES Modules
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Validation**: Zod
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting

## Development

The project uses:

- **tsx** for running TypeScript files directly
- **nodemon** for auto-reload in development
- **Prisma** for database management

## Default Admin Credentials

- Email: `admin@mutcu.ac.ke`
- Password: `admin123`

⚠️ **Change these in production!**

## License

ISC
