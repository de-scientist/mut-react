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
