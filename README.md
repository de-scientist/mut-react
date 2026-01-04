# 🌿 Murang'a University of Technology Christian Union (MUTCU) Website

> A modern, full-stack, Christ-centered digital platform designed to communicate vision, leadership, ministries, and activities of Murang'a University of Technology Christian Union.

![Build](https://img.shields.io/badge/build-active-success)
![Frontend](https://img.shields.io/badge/frontend-React%20%7C%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express%20%7C%20TypeScript-green)
![Database](https://img.shields.io/badge/database-PostgreSQL%20%7C%20Drizzle-orange)
![Routing](https://img.shields.io/badge/routing-React%20Router-orange)
![Styling](https://img.shields.io/badge/styling-CSS%20%7C%20Bootstrap-purple)
![Status](https://img.shields.io/badge/status-In%20Development-yellow)
![License](https://img.shields.io/badge/license-Proprietary-red)

---

## 📖 Overview

The **MUTCU Website** serves as the official digital presence of the Murang'a University of Technology Christian Union. It is a full-stack web application built to clearly present the Union's **leadership structure, ministries, vision, mission, and activities**, while maintaining a consistent, professional, and spiritually grounded user experience.

The platform emphasizes:
- **Order and clarity** in information architecture
- **Leadership visibility** through dedicated committee pages
- **Ministry engagement** with detailed ministry pages
- **Modern web standards** with TypeScript, React, and RESTful APIs
- **Secure authentication** with JWT-based admin access
- **Interactive features** including prayer requests, contact forms, and newsletter subscriptions

---

## ✨ Key Features

### Frontend Features
- **Multi-page React application** with clean routing using React Router
- **Executive & Committee pages** with unified visual and content flow
- **Dynamic leadership profiles** (Chairman, Vice Chairs, Secretary, Treasurer, Coordinators)
- **Ministries & Committees showcase** with dedicated detail pages
- **Responsive design** for all screen sizes
- **Smooth animations** using AOS (Animate On Scroll)
- **Reusable UI patterns** for scalability and maintainability
- **Admin dashboard** for content management
- **Interactive forms** for prayer requests, contact, and newsletter subscriptions

### Backend Features
- **RESTful API** with Express.js and TypeScript
- **JWT authentication** for secure admin access
- **PostgreSQL database** with Drizzle ORM
- **Zod validation** for request validation
- **Security middleware** (Helmet, CORS, Rate Limiting)
- **Error handling** with centralized error middleware
- **Admin dashboard endpoints** for statistics and management
- **Modular architecture** with feature-based modules

### Database Models
- **Users** - Authentication and role management (USER, ADMIN, SUPER_ADMIN)
- **Events** - Event management with dates, locations, and images
- **Ministries** - Ministry information with slugs and descriptions
- **Prayer Requests** - Prayer request submissions with status tracking
- **Newsletter Subscriptions** - Email subscription management
- **Contact Submissions** - Contact form submissions with status tracking
- **Executive Members** - Leadership team profiles
- **Media** - Gallery and media items

---

## 🧱 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router DOM v7** – client-side routing
- **Vite** – build tool and dev server
- **Bootstrap 5** & Custom CSS – layout and styling
- **AOS (Animate On Scroll)** – UI animations
- **Lucide React** – icon library
- **Recharts** – data visualization (for admin dashboard)

### Backend
- **Node.js** – runtime environment
- **Express.js 5** – web framework
- **TypeScript** – type-safe development
- **ES Modules** – modern module system
- **PostgreSQL** – relational database
- **Drizzle ORM** – lightweight TypeScript ORM
- **JWT (jsonwebtoken)** – authentication
- **Zod** – schema validation
- **bcryptjs** – password hashing
- **Helmet** – security headers
- **CORS** – cross-origin resource sharing
- **express-rate-limit** – rate limiting
- **Morgan** – HTTP request logger
- **tsx** – TypeScript execution
- **nodemon** – development auto-reload

---

## 🗂️ Project Structure

```
mut-react/
├── backend/                    # Backend API server
│   ├── db/                     # Database schema
│   │   └── schema.ts           # Drizzle schema definition
│   ├── prisma/                 # Legacy Prisma files (if any)
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.ts    # Database connection
│   │   │   ├── drizzle.ts     # Drizzle ORM config
│   │   │   └── env.ts         # Environment variables
│   │   ├── controllers/       # Route controllers (legacy)
│   │   ├── modules/           # Feature modules
│   │   │   ├── admin/         # Admin dashboard
│   │   │   ├── auth/          # Authentication
│   │   │   ├── contact/       # Contact form
│   │   │   ├── events/        # Events management
│   │   │   ├── ministries/    # Ministries management
│   │   │   ├── newsletter/    # Newsletter subscriptions
│   │   │   ├── prayer/        # Prayer requests
│   │   │   └── users/         # User management
│   │   ├── routes/            # API route definitions
│   │   ├── middlewares/       # Express middlewares
│   │   │   ├── auth.ts        # JWT authentication
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   └── validation.ts  # Request validation
│   │   ├── utils/             # Utility functions
│   │   │   ├── pagination.ts  # Pagination helpers
│   │   │   └── response.ts    # Response formatters
│   │   ├── app.ts             # Express app configuration
│   │   └── server.ts          # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   │   └── assets/            # Images, CSS, fonts
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ConfirmationModal.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAOS.ts
│   │   │   ├── useNavbarScroll.ts
│   │   │   └── useTimedSuccess.ts
│   │   ├── layouts/           # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── MinistriesPage.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── ResourcesPage.tsx
│   │   │   ├── GalleryPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── committees/    # Committee pages
│   │   │   └── ministries/    # Ministry detail pages
│   │   ├── services/          # API service layer
│   │   │   └── api.ts         # API client functions
│   │   ├── store/             # State management
│   │   │   └── authStore.ts   # Authentication store
│   │   ├── styles/            # Global styles
│   │   ├── utils/             # Utility functions
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Application entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── README.md                   # This file
├── AdminReadme.md              # Admin dashboard documentation
└── package-lock.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **PostgreSQL** (v12+ recommended)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mut-react.git
   cd mut-react
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mutcu_db?schema=public"

# Server
PORT=5000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5173

# Admin Default Credentials (change in production!)
ADMIN_EMAIL=admin@mutcu.ac.ke
ADMIN_PASSWORD=admin123
```

#### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Database Setup

1. **Create PostgreSQL Database**
   ```bash
   # Using psql
   createdb mutcu_db
   ```

2. **Setup Database Schema**
   ```bash
   cd backend
   # Drizzle schema is defined in src/db/schema.ts
   # Run migrations using drizzle-kit if configured, or manually create tables
   ```

3. **Create Database Tables**
   ```bash
   # Create tables manually or use drizzle-kit migrations
   # The schema is defined in backend/src/db/schema.ts
   ```

### Running the Application

#### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Development Server** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

#### Production Build

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

---

## 🔧 Available Scripts

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/profile` - Get authenticated user profile (Protected)

### Events

- `GET /api/events` - Get all events (with pagination)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Ministries

- `GET /api/ministries` - Get all ministries
- `GET /api/ministries/:slug` - Get ministry by slug
- `POST /api/ministries` - Create ministry (Admin only)
- `PUT /api/ministries/:slug` - Update ministry (Admin only)
- `DELETE /api/ministries/:slug` - Delete ministry (Admin only)

### Prayer Requests

- `POST /api/prayer` - Submit prayer request
- `GET /api/prayer` - Get prayer requests (Admin only, with pagination)
- `PATCH /api/prayer/:id/status` - Update prayer request status (Admin only)

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact submissions (Admin only, with pagination)
- `PATCH /api/contact/:id/status` - Update contact status (Admin only)

### Newsletter

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter` - Get all subscriptions (Admin only)

### Admin

- `GET /api/admin/dashboard` - Get dashboard statistics (Admin only)

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)

### Health Check

- `GET /health` - Server health check

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### How to Use

1. **Login** to get a token:
   ```bash
   POST /api/auth/login
   {
     "email": "admin@mutcu.ac.ke",
     "password": "admin123"
   }
   ```

2. **Include token** in subsequent requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

3. **Token storage**: The frontend stores tokens in `localStorage` under the key `token`.

### User Roles

- **USER** - Regular user (default)
- **ADMIN** - Administrative access
- **SUPER_ADMIN** - Full system access

---

## 🗄️ Database Schema

The database uses **Drizzle ORM** with PostgreSQL. Key models include:

- **users** - User accounts with roles
- **events** - Events with dates, locations, and images
- **ministries** - Ministries with slugs and descriptions
- **prayer_requests** - Prayer requests with status tracking
- **newsletter_subscriptions** - Email subscriptions
- **contact_submissions** - Contact form submissions
- **executive_members** - Leadership team members
- **media** - Gallery and media items

See `backend/src/db/schema.ts` for the complete schema definition.

---

## 🧭 Design Philosophy

This website follows a **structured leadership-first approach**:

- Every leadership page follows the same flow:
  1. Hero Section
  2. Leader Profile
  3. About the Office / Ministry
  4. Roles & Responsibilities
  5. Call-to-Action

- Language is **formal, mission-aligned, and constitution-aware**
- Visual hierarchy emphasizes **clarity over decoration**

This ensures consistency, credibility, and long-term maintainability.

---

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Configured for specific frontend origin
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **Input Validation** - Zod schema validation
- **SQL Injection Protection** - Drizzle ORM parameterized queries

---

## 🧪 Development Guidelines

### Code Style

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting for both frontend and backend
- **ES Modules** - Modern import/export syntax
- **Modular Architecture** - Feature-based module organization

### Adding New Features

1. **Backend**: Create module in `backend/src/modules/`, add routes in `backend/src/routes/`, update `app.ts`
2. **Frontend**: Create page in `client/src/pages/`, add route in `App.tsx`, add API functions in `services/api.ts`
3. **Database**: Update Drizzle schema in `backend/src/db/schema.ts`, create/update tables as needed

---

## 📝 Default Admin Credentials

⚠️ **IMPORTANT**: Change these in production!

- **Email**: `admin@mutcu.ac.ke`
- **Password**: `admin123`

These are set via environment variables and can be changed in the `.env` file.

---

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` in `.env`
   - Ensure database exists

2. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env` matches frontend URL
   - Check that frontend is running on the correct port

3. **JWT Token Errors**
   - Verify `JWT_SECRET` is set in backend `.env`
   - Check token expiration settings

4. **Database Schema Errors**
   - Verify database tables exist (check `backend/src/db/schema.ts`)
   - Ensure schema matches database structure
   - Check database connection in `backend/src/config/drizzle.ts`

See `client/TROUBLESHOOTING.md` and `backend/SETUP.md` for more detailed troubleshooting guides.

---

## 📚 Additional Documentation

- `backend/README.md` - Backend-specific documentation
- `backend/SETUP.md` - Backend setup guide
- `backend/src/db/schema.ts` - Database schema definition
- `client/README.md` - Frontend-specific documentation
- `client/FIX_404.md` - 404 error fixes
- `AdminReadme.md` - Admin dashboard implementation details

---

## 🚢 Deployment

### Backend Deployment

1. Set production environment variables
2. Build TypeScript: `tsc` (if needed)
3. Ensure database tables are created (from schema.ts)
4. Start server: `npm start`

### Frontend Deployment

1. Set production `VITE_API_URL` in `.env`
2. Build: `npm run build`
3. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)

### Recommended Platforms

- **Backend**: Railway, Render, Heroku, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: PostgreSQL on Railway, Supabase, AWS RDS

---

## 🤝 Contributing

This project is maintained by the MUTCU technical team. For contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 🛡️ License

This project is **proprietary** and maintained by the MUTCU technical team. Unauthorized duplication or redistribution is not permitted.

---

## 👨‍💻 Maintained By

**Mark Kinyanjui (De-Scientist)**  
*Lead Developer & Systems Architect*  
CEO — **TechVision Studios & Solutions**

> Built with discipline.

---

## 📞 Support

For issues, questions, or contributions, please contact the MUTCU technical team.

---

**Last Updated**: January 2025
