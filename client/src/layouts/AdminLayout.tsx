import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Props = {
  children: React.ReactNode;
};

export const AdminLayout: React.FC<Props> = ({ children }) => {
  const { email, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden w-60 flex-shrink-0 flex-col bg-mutcu-navy text-white md:flex">
        <div className="px-4 py-4 border-b border-white/20">
          <h1 className="text-lg font-heading font-bold uppercase">
            MUTCU Admin
          </h1>
        </div>
        <nav className="flex-1 px-4 py-4 text-sm space-y-2">
          <Link to="/admin" className="block hover:text-mutcu-orange">
            Dashboard
          </Link>
          <Link to="/admin/events" className="block hover:text-mutcu-orange">
            Events
          </Link>
          <Link to="/admin/ministry-applications" className="block hover:text-mutcu-orange">
            Ministry Applications
          </Link>
          <Link to="/admin/members" className="block hover:text-mutcu-orange">
            Members
          </Link>
          <Link to="/admin/finances" className="block hover:text-mutcu-orange">
            Finances
          </Link>
          <Link to="/admin/programs" className="block hover:text-mutcu-orange">
            Programs
          </Link>
          <Link to="/admin/evaluations" className="block hover:text-mutcu-orange">
            Evaluations
          </Link>
          <Link to="/admin/nominations" className="block hover:text-mutcu-orange">
            Nominations
          </Link>
          <Link to="/admin/reports" className="block hover:text-mutcu-orange">
            Reports
          </Link>
        </nav>
        <div className="px-4 py-4 border-t border-white/20 text-xs text-white/80">
          {email && <p className="mb-2">Signed in as {email}</p>}
          <button
            onClick={handleLogout}
            className="rounded bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1">
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm md:hidden">
          <h1 className="text-base font-heading uppercase text-mutcu-navy">
            MUTCU Admin
          </h1>
          {email && (
            <button
              onClick={handleLogout}
              className="text-xs text-mutcu-red underline"
            >
              Logout
            </button>
          )}
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};
