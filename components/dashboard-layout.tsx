import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-surface-alt to-surface-alt/95">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 custom-scrollbar overflow-auto">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
