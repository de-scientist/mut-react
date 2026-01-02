**Admin Dashboard — Implementation Notes**

- **Location (backend):** `backend/src/routes/adminRoutes.ts`, `backend/src/modules/admin/adminController.ts`
- **Location (frontend):** `client/src/pages/AdminDashboard.tsx`, `client/src/services/api.ts`

**Overview:**
- The admin dashboard is a read-only statistics endpoint used by the frontend to render site metrics.
- Backend exposes a single endpoint: `GET /api/admin/dashboard` (mounted in `backend/src/app.ts`).
- This endpoint is protected by JWT authentication and role checks: `authenticate` and `requireAdmin` middlewares.

**Backend behavior & data:**
- Controller: `getDashboardStats` in `backend/src/modules/admin/adminController.ts`.
- Data returned (in response body as `data`):
  - `users` — total users (prisma model `user` count)
  - `events` — total events (`event` count)
  - `ministries` — total ministries (`ministry` count)
  - `prayerRequests` — total prayer requests (`prayerRequest` count)
  - `contacts` — total contact submissions (`contactSubmission` count)
  - `subscriptions` — newsletter subscribers (`newsletterSubscription` count where `isActive: true`)
  - `pendingPrayerRequests` — `prayerRequest` count where `status === 'PENDING'`
  - `newContacts` — `contactSubmission` count where `status === 'NEW'`
- Response wrapper uses the standardized format from `backend/src/utils/response.ts`:
  ```json
  {
    "success": true,
    "message": "...",
    "data": { /* stats object above */ }
  }
  ```

**Auth & roles:**
- JWT token expected in `Authorization: Bearer <token>` header.
- `authenticate` middleware decodes token using `env.jwtSecret`, loads user from `prisma.user`, and rejects if user is inactive.
- `requireAdmin` allows `role === 'ADMIN'` or `role === 'SUPER_ADMIN'` only.

**Frontend integration:**
- API helper: `client/src/services/api.ts` defines `adminAPI.getDashboardStats()` which calls `/admin/dashboard` on the configured API base (`VITE_API_URL` or `http://localhost:5000/api`).
- `client/src/pages/AdminDashboard.tsx`:
  - Checks `localStorage.getItem('token')`; navigates away if no token found.
  - Calls `adminAPI.getDashboardStats()` and expects the backend wrapper; it reads `response.data` and renders the fields listed above.
  - UI shows cards for each metric and provides a `Logout` button that clears `token` from `localStorage`.

**API examples:**
- curl (replace host and token):
  ```bash
  curl -H "Authorization: Bearer <TOKEN>" \
    "https://your-host.example.com/api/admin/dashboard"
  ```

**Environment & config:**
- Backend: ensure `env.jwtSecret` and `env.frontendUrl` are set (see `backend/src/config/env.ts`).
- Frontend: set `VITE_API_URL` in `.env` (e.g. `VITE_API_URL=http://localhost:5000/api`).

**Notes & recommended improvements:**
- Client-side routing currently redirects unauthenticated users to `/contact`. Consider adding a dedicated admin login route (`/admin/login`) or showing a 401 UI.
- The frontend trust is based entirely on the stored JWT — consider verifying the user role client-side (e.g. decode token) before rendering sensitive UI, but always enforce role checks on the backend.
- Add pagination or expanded endpoints if the admin UI should manage resources (events, ministries, prayers, contacts, subscribers) rather than only showing counts.
- Consider returning timestamps (lastUpdated) or per-period metrics (daily/weekly) if analytics are required.

**Next steps you might want me to do:**
- Add an admin login page and protect client routes.
- Expand backend admin routes for managing resources (CRUD endpoints) with tests.
- Improve frontend error handling and show friendly messages for 401/403.

