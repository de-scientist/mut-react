import express from "express";
import { getDashboardStats } from "../modules/admin/adminController.js";
import {
  authenticate,
  requireAdmin,
  requireAdminPage,
  requirePermission,
} from "../middlewares/auth.js";

const router = express.Router();

// All admin routes require authentication
router.use(authenticate);

// Dashboard accessible to all admins
router.get("/dashboard", requireAdmin, getDashboardStats);

// Members routes - require AdminMembersPage access
router.get("/members", requireAdminPage("AdminMembersPage"), (req, res) => {
  // TODO: Replace with actual handler
  res.json({ message: "Members list" });
});

router.post(
  "/members",
  requireAdminPage("AdminMembersPage"),
  requirePermission("EDIT_MEMBERS"),
  (req, res) => {
    // TODO: Replace with actual handler
    res.json({ message: "Member created" });
  }
);

// Finance routes - require AdminFinancePage access
router.get("/finance", requireAdminPage("AdminFinancePage"), (req, res) => {
  // TODO: Replace with actual handler
  res.json({ message: "Finance data" });
});

router.post(
  "/finance",
  requireAdminPage("AdminFinancePage"),
  requirePermission("EDIT_FINANCE"),
  (req, res) => {
    // TODO: Replace with actual handler
    res.json({ message: "Finance record created" });
  }
);

// Events routes - require AdminEventsPage access
router.get("/events", requireAdminPage("AdminEventsPage"), (req, res) => {
  // TODO: Replace with actual handler
  res.json({ message: "Events list" });
});

router.post(
  "/events",
  requireAdminPage("AdminEventsPage"),
  requirePermission("EDIT_EVENTS"),
  (req, res) => {
    // TODO: Replace with actual handler
    res.json({ message: "Event created" });
  }
);

// Media routes - require AdminMediaPage access
router.get("/media", requireAdminPage("AdminMediaPage"), (req, res) => {
  // TODO: Replace with actual handler
  res.json({ message: "Media list" });
});

router.post(
  "/media",
  requireAdminPage("AdminMediaPage"),
  requirePermission("EDIT_MEDIA"),
  (req, res) => {
    // TODO: Replace with actual handler
    res.json({ message: "Media uploaded" });
  }
);

export default router;
