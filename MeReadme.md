# MeReadme.md — MUTCU Website (mut-react)

## What this project is

This repository is a **full-stack web application** for the **Murang’a University of Technology Christian Union (MUTCU)** website.

- **Frontend**: React + TypeScript + Vite (in `client/`)
- **Backend**: Node.js + Express + TypeScript (in `backend/`)
- **Database**: PostgreSQL (backend currently uses **Drizzle ORM** at runtime; Prisma assets still exist in the repo for legacy/migration)

The site provides:
- **Public pages**: Home, About, Ministries, Events, Gallery, Resources, Contact
- **Interactive features**: prayer requests, newsletter subscription, contact submissions, member registration
- **Admin area**: dashboard + management pages for events/ministries/prayer/contacts/newsletter/users/members/resources/media

---

## Repository layout (high level)

```text
mut-react/
├── client/                 # React (Vite) frontend
├── backend/                # Express API backend
├── README.md               # Main project overview (existing)
├── AdminReadme.md          # Admin dashboard notes (existing)
├── KnowReadme.md           # Deep knowledge base (existing)
└── MeReadme.md             # This file
```

### Frontend (`client/`)

Key locations:
- `client/src/App.tsx`: React Router routes (public + admin pages)
- `client/src/services/api.ts`: API client wrapper around `fetch`
- `client/src/layouts/*`: `MainLayout`, `AdminLayout`
- `client/src/pages/*`: pages (public + admin management pages)
- `client/public/assets/`: static assets served by Vite

### Backend (`backend/`)

Key locations:
- `backend/src/server.ts`: starts the HTTP server
- `backend/src/app.ts`: Express app, middleware, route mounting
- `backend/src/config/env.ts`: environment variable loading
- `backend/src/config/drizzle.ts`: PostgreSQL pool + Drizzle client
- `backend/src/routes/*`: route definitions mounted under `/api/...`
- `backend/src/modules/*`: feature modules / controllers
- `backend/src/middlewares/*`: auth, validation, error handling
- `backend/src/db/schema.ts`: Drizzle table schema definitions

---

## How the app runs (local dev)

You will typically run **two dev servers**:
- Frontend (Vite): `http://localhost:5173`
- Backend (Express API): `http://localhost:5000`

### 1) Backend environment variables

Create `backend/.env` (values shown are examples):

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

Notes:
- `FRONTEND_URL` is used by CORS in `backend/src/app.ts`.
- `DATABASE_URL` is required for DB access (Drizzle uses it via `pg.Pool`).

### 2) Frontend environment variables

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Notes:
- `client/src/services/api.ts` uses `import.meta.env.VITE_API_URL` and falls back to `http://localhost:5000/api`.

### 3) Install dependencies

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd backend
npm install
```

### 4) Database setup

This repo contains both Prisma and Drizzle artifacts. In practice:
- **Runtime DB access** is wired through **Drizzle** (`backend/src/config/drizzle.ts`).
- **Prisma scripts** still exist in `backend/package.json` and the `backend/prisma/` folder, mainly for legacy/migration work.

If you are starting fresh, use the migration docs in:
- `backend/MIGRATION_GUIDE.md` (Prisma → Drizzle notes)
- `backend/drizzle/` (SQL migrations present)

### 5) Run the app

Backend (dev):
```bash
cd backend
npm run dev
```

Frontend (dev):
```bash
cd client
npm run dev
```

### Health check

Backend exposes:
- `GET http://localhost:5000/health` → `{"status":"ok", ... }`

---

## Scripts you’ll actually use

### Frontend (`client/package.json`)
- `npm run dev`: start Vite dev server
- `npm run build`: TypeScript build + Vite build
- `npm run preview`: preview production build locally
- `npm run lint`: run ESLint

### Backend (`backend/package.json`)
- `npm run dev`: nodemon + tsx (auto-reload)
- `npm start`: run via tsx
- `npm run seed`: runs `backend/prisma/seed.ts` (note: this seed file was updated to work with Drizzle per `backend/MIGRATION_GUIDE.md`)

There are also Prisma and Drizzle placeholder scripts in `backend/package.json`; refer to the migration docs if you plan to keep/remove Prisma.

---

## API overview (what the frontend calls)

All API endpoints are mounted under:
- `http://localhost:5000/api`

The frontend uses `client/src/services/api.ts` which:
- Sends JSON by default (`Content-Type: application/json`)
- Automatically attaches `Authorization: Bearer <token>` if `localStorage.getItem('token')` exists

### Common endpoints (high level)

Public (examples):
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/events`
- `GET /api/ministries`
- `POST /api/prayer`
- `POST /api/contact`
- `POST /api/newsletter/subscribe`

Admin/protected (examples):
- `GET /api/admin/dashboard`
- CRUD endpoints under `/api/events`, `/api/ministries`, `/api/resources/admin`, `/api/media/admin`, etc.

Authentication:
- JWT is expected in the header: `Authorization: Bearer <token>`
- Backend enforces role checks for admin routes via middleware (see `backend/src/middlewares/`).

---

## Frontend routes (what users can visit)

Routing is defined in `client/src/App.tsx`.

### Public pages (examples)
- `/` (Home)
- `/about`
- `/ministries`
- `/events`
- `/contact`
- `/resources`
- `/gallery`
- `/register`

### Admin pages (examples)
- `/admin/login`
- `/admin`
- `/admin/events`
- `/admin/ministries`
- `/admin/prayer-requests`
- `/admin/contacts`
- `/admin/newsletter`
- `/admin/users`
- `/admin/members`
- `/admin/resources`
- `/admin/media`

---

## Key docs already in the repo

If you want deeper detail on specific areas, these files already exist:
- `README.md`: project overview + quick start
- `KnowReadme.md`: “knowledge base” style documentation (architecture, patterns, models)
- `AdminReadme.md`: admin dashboard implementation notes
- `backend/README.md`: backend-focused quick start + endpoint summary
- `backend/SETUP.md`: full-stack setup walkthrough
- `backend/MIGRATION_GUIDE.md` + `backend/MigrationReadme.md`: Prisma/Drizzle migration details
- `client/TROUBLESHOOTING.md` + `client/FIX_404.md`: frontend troubleshooting notes

---

## Troubleshooting (fast checks)

- **Frontend can’t reach backend / 404s on API**:
  - Ensure backend is running on `PORT` (default `5000`)
  - Ensure `client/.env` has `VITE_API_URL=http://localhost:5000/api`
  - Ensure backend `.env` has `FRONTEND_URL=http://localhost:5173`
- **CORS errors**:
  - Backend CORS origin is set from `FRONTEND_URL` (see `backend/src/app.ts`)
- **Auth issues**:
  - Confirm token exists in `localStorage` as `token`
  - Confirm requests include `Authorization: Bearer <token>`

---

## Ownership / license

See `README.md` for the project’s license/ownership statement.

