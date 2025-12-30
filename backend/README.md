# MUTCU Backend API

A production-ready Node.js/Express backend with TypeScript and ES modules.

## Features

- ✅ TypeScript with ES modules
- ✅ PostgreSQL with Prisma ORM
- ✅ JWT authentication
- ✅ Zod validation
- ✅ RESTful API design
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Error handling
- ✅ Admin dashboard endpoints

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Create a `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mutcu_db?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=admin123
```

### 3. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

### 4. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/events` - Get events
- `GET /api/ministries` - Get ministries
- `POST /api/prayer` - Submit prayer request
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Protected Endpoints (Require JWT)
- `GET /api/auth/profile` - Get user profile
- `GET /api/admin/dashboard` - Admin dashboard stats
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- And more...

## Project Structure

```
src/
├── config/          # Database & environment config
├── modules/         # Feature modules (auth, events, etc.)
│   ├── auth/
│   ├── events/
│   ├── ministries/
│   ├── prayer/
│   ├── contact/
│   ├── newsletter/
│   └── admin/
├── routes/          # API route definitions
├── middlewares/     # Auth, validation, error handling
├── utils/           # Helper functions
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Module System**: ES Modules
- **Database**: PostgreSQL
- **ORM**: Prisma
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
