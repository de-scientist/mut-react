/**
 * Maps email addresses to their admin roles and permissions
 * This is your source of truth for who can access what
 */

interface AdminAccess {
  role: "SUPER_ADMIN" | "ADMIN" | "MODERATOR";
  permissions: string[];
  pages: string[]; // Admin pages they can access
}

export const ADMIN_EMAIL_MAPPING: Record<string, AdminAccess> = {
  "secretary@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_MEMBERS", "EDIT_MEMBERS"],
    pages: ["AdminMembersPage", "AdminMembersListPage"],
  },
  "treasurer@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_FINANCE", "EDIT_FINANCE"],
    pages: ["AdminFinancePage"],
  },
  "communications@mutcu.org": {
    role: "ADMIN",
    permissions: ["VIEW_COMMUNICATIONS", "EDIT_COMMUNICATIONS"],
    pages: ["AdminCommunicationsPage", "AdminNewsletterPage"],
  },
  "media@mutcu.org": {
    role: "MODERATOR",
    permissions: ["VIEW_MEDIA", "EDIT_MEDIA"],
    pages: ["AdminMediaPage"],
  },
  "events@mutcu.org": {
    role: "MODERATOR",
    permissions: ["VIEW_EVENTS", "EDIT_EVENTS"],
    pages: ["AdminEventsPage"],
  },
  "pastor@mutcu.org": {
    role: "SUPER_ADMIN",
    permissions: [
      "VIEW_MEMBERS",
      "EDIT_MEMBERS",
      "VIEW_FINANCE",
      "EDIT_FINANCE",
      "VIEW_COMMUNICATIONS",
      "EDIT_COMMUNICATIONS",
      "VIEW_MEDIA",
      "EDIT_MEDIA",
      "VIEW_EVENTS",
      "EDIT_EVENTS",
      "VIEW_PRAYERS",
      "EDIT_PRAYERS",
      "MANAGE_USERS",
      "MANAGE_ADMINS",
    ],
    pages: ["*"], // Access all pages
  },
};

/**
 * Get admin access for an email
 */
export const getAdminAccess = (email: string): AdminAccess | null => {
  return ADMIN_EMAIL_MAPPING[email] || null;
};

/**
 * Check if email can access a specific page
 */
export const canAccessPage = (email: string, page: string): boolean => {
  const access = getAdminAccess(email);
  if (!access) return false;
  if (access.pages.includes("*")) return true;
  return access.pages.includes(page);
};
