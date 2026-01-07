# 🌿 Murang'a University of Technology Christian Union (MUTCU) Website

> **A modern, full-stack, Christ-centered digital platform.** Designed to streamline communication, leadership visibility, and ministry engagement for the Murang'a University of Technology Christian Union.

![Build Status](https://img.shields.io/badge/build-active-success)
![Frontend](https://img.shields.io/badge/frontend-React%2018%20%7C%20TypeScript-blue)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express%205-green)
![Database](https://img.shields.io/badge/database-PostgreSQL%20%7C%20Drizzle-orange)
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

### 🌐 Resident Experience
* **Dynamic Leadership Hub:** Specific pages for the Executive Committee and Departmental heads.
* **Ministry Showcase:** Rich-media pages with "Animate On Scroll" (AOS) effects.
* **Interactive Spiritual Tools:** Real-time prayer request submissions and newsletter sign-ups.
* **Resource Center:** Access to Union documents, gallery, and upcoming event schedules.

### 🛡️ Administrative Suite
* **Role-Based Access:** Granular permissions (**User**, **Admin**, **Super Admin**).
* **Content Management:** Full CRUD operations for Events, Ministries, and Media.
* **Inbound Management:** Centralized tracking for Contact Form submissions and Prayer Requests.
* **Analytics Dashboard:** Visual insights using Recharts for Union growth and engagement.

---

## 🧱 Tech Stack

### Frontend
* **Framework:** React 18 with TypeScript
* **Routing:** React Router DOM v7
* **Styling:** Bootstrap 5 & Custom CSS
* **Animations:** AOS (Animate On Scroll)
* **Icons:** Lucide React

### Backend
* **Runtime:** Node.js & Express.js 5
* **Database:** PostgreSQL with Drizzle ORM
* **Security:** JWT, bcryptjs, Helmet, & Rate Limiting
* **Validation:** Zod Schema Validation

---

## 🗂️ Project Structure



```text
mut-react/
├── backend/               # Express API & Drizzle Schema
│   ├── src/
│   │   ├── modules/       # Feature-based logic (Auth, Events, Prayer)
│   │   ├── db/            # Schema definitions & migrations
│   │   └── middleware/    # Auth & Validation guards
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # View logic (Committees, Ministries)
│   │   └── services/      # API client functions
└── AdminReadme.md         # Detailed Admin documentation

🚀 Quick Start1. Environment ConfigurationCreate .env files in both the client/ and backend/ directories.Backend (/backend/.env):Code snippetDATABASE_URL="postgresql://user:pass@localhost:5432/mutcu_db"
JWT_SECRET="your_secure_jwt_key"
FRONTEND_URL="http://localhost:5173"
ADMIN_EMAIL="admin@mutcu.ac.ke"
ADMIN_PASSWORD="admin_secure_password"
Frontend (/client/.env):Code snippetVITE_API_URL="http://localhost:5000/api"
2. Installation & LaunchBash# Clone the repository
git clone [https://github.com/your-username/mut-react.git](https://github.com/your-username/mut-react.git)

# Install & Run Backend
cd backend && npm install
npm run dev

# Install & Run Frontend (In a new terminal)
cd client && npm install
npm run dev
📡 Primary API EndpointsMethodEndpointDescriptionAccessPOST/api/auth/loginAuthenticate & get JWTPublicGET/api/eventsFetch all upcoming eventsPublicPOST/api/prayerSubmit a prayer requestPublicGET/api/admin/statsDashboard metricsAdminPATCH/api/contact/:idUpdate inquiry statusAdmin🧭 Design PhilosophyWe follow a "Leadership-First" approach. Every ministry and committee page adheres to a standardized flow:Hero: Spiritual theme and identity.Profile: Current office holders.Vision: Mandate and objectives.Action: Roles and meeting times.🛡️ License & OwnershipProprietary Software. Copyright © 2026 Murang'a University of Technology Christian Union.Unauthorized duplication or redistribution is strictly prohibited.Lead Architect: Mark Kinyanjui (De-Scientist) CEO — TechVision Studios & SolutionsBuilt with discipline.Last Updated: January 2026
