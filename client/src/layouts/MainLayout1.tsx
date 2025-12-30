import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="min-h-screen bg-slate-50 font-body">
    <Navbar />
    <main className="pt-[70px]">{children}</main>
    <Footer />
    <ConfirmationDialog />
  </div>
);
