🌿 Murang'a University of Technology Christian Union (MUTCU) WebsiteA modern, full-stack, Christ-centered digital platform. Built to streamline communication, leadership visibility, and ministry engagement for the Murang'a University of Technology Christian Union.📖 Project OverviewThe MUTCU Website is the central digital hub for the Union. It provides a professional, spiritually grounded interface that connects students to leadership, ministries, and spiritual resources.Core ObjectivesInformation Integrity: Precise representation of the Union's constitution and leadership structure.Ministry Engagement: Dedicated portals for various committees and sub-groups.Administrative Efficiency: Secure dashboard for managing events, prayer requests, and member communications.Scalable Architecture: Built with a modern TypeScript stack for long-term maintainability.✨ Key Features🌐 Resident ExperienceDynamic Leadership Hub: Specific pages for the Executive Committee and Departmental heads.Ministry Showcase: Rich-media pages for various ministries with "Animate On Scroll" (AOS) effects.Interactive Spiritual Tools: Real-time prayer request submissions and newsletter sign-ups.Resource Center: Access to Union documents, gallery, and upcoming event schedules.🛡️ Administrative SuiteRole-Based Access: Granular permissions (User, Admin, Super Admin).Content Management: Full CRUD operations for Events, Ministries, and Media.Inbound Management: Centralized tracking for Contact Form submissions and Prayer Requests with status updates.Analytics Dashboard: Visual insights using Recharts for Union growth and engagement.🧱 Tech StackLayerTechnologiesFrontendReact 18, TypeScript, Vite, React Router 7, Bootstrap 5, AOS, Lucide IconsBackendNode.js, Express 5, TypeScript, Zod (Validation), JWTDatabasePostgreSQL, Drizzle ORMSecurityBcryptJS, Helmet, CORS, Rate LimitingState/DataZustand (Auth Store), TanStack Query (API management)🗂️ Project StructureBashmut-react/
├── backend/               # Express API & Drizzle Schema
│   ├── src/
│   │   ├── modules/       # Feature-based logic (Auth, Events, Prayer)
│   │   ├── db/            # Schema definitions & migrations
│   │   └── middleware/    # Auth & Validation guards
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Atomic UI components
│   │   ├── pages/         # View logic (Committees, Ministries)
│   │   └── services/      # Axios/Fetch API wrappers
└── AdminReadme.md         # Detailed Admin documentation
🚀 Quick Start1. Environment ConfigurationYou will need two .env files.Backend (/backend/.env):Code snippetDATABASE_URL="postgresql://user:pass@localhost:5432/mutcu_db"
JWT_SECRET="your_secure_random_string"
FRONTEND_URL="http://localhost:5173"
Frontend (/client/.env):Code snippetVITE_API_URL="http://localhost:5000/api"
2. Installation & LaunchBash# Install dependencies
cd backend && npm install
cd ../client && npm install

# Run Development Servers
# Terminal 1 (Backend)
cd backend && npm run dev

# Terminal 2 (Frontend)
cd client && npm run dev
📡 Primary API EndpointsMethodEndpointDescriptionAccessPOST/api/auth/loginAuthenticate & get JWTPublicGET/api/eventsFetch all upcoming eventsPublicPOST/api/prayerSubmit a prayer requestPublicGET/api/admin/statsDashboard metricsAdminPATCH/api/contact/:idUpdate inquiry statusAdmin🧭 Design PhilosophyWe follow a "Leadership-First" approach. Every ministry and committee page adheres to a standardized flow:Hero: Spiritual theme and identity.Profile: Current office holders.Vision: Mandate and objectives.Action: Responsibilities and meeting times.🛡️ License & OwnershipProprietary Software. Copyright © 2026 Murang'a University of Technology Christian Union.Maintained by the MUTCU Technical Team.Lead Architect: Mark Kinyanjui (De-Scientist) CEO — TechVision Studios & Solutions
