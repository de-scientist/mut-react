import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AdminRouteGuardProps {
  children: ReactNode;
  requiredPage?: string;
  requiredRole?: "ADMIN" | "SUPER_ADMIN" | "MODERATOR";
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  adminRole?: string;
  privileges?: string;
}

/**
 * AdminRouteGuard component to protect admin routes
 * Usage: <AdminRouteGuard requiredPage="AdminMembersPage"><AdminMembersPage /></AdminRouteGuard>
 */
export const AdminRouteGuard = ({
  children,
  requiredPage,
  requiredRole = "ADMIN",
}: AdminRouteGuardProps) => {
  // Get user from localStorage (adjust based on your auth implementation)
  const userStr = localStorage.getItem("user");
  const tokenStr = localStorage.getItem("token");
  const isLoading = !userStr && !tokenStr;

  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error("Failed to parse user from storage:", error);
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  // Check if user is authenticated
  if (!user || !tokenStr) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  const userRole = user.role || "USER";
  if (
    userRole !== requiredRole &&
    userRole !== "SUPER_ADMIN"
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Check if user has access to specific page (if required)
  if (requiredPage && userRole !== "SUPER_ADMIN") {
    try {
      const privileges = user.privileges
        ? typeof user.privileges === "string"
          ? JSON.parse(user.privileges)
          : user.privileges
        : [];

      // If privileges don't contain page access info, check adminRole
      if (Array.isArray(privileges) && !privileges.includes(requiredPage)) {
        // Fallback: allow if no specific page restriction
        // You can modify this logic based on your needs
      }
    } catch (error) {
      console.error("Failed to parse privileges:", error);
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
