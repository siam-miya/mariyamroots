
"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Fixed Topbar */}
      <AdminTopbar
        onMenuClick={() => setMobileOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <div className="min-h-screen pt-[76px] lg:pl-[264px]">
        <main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
