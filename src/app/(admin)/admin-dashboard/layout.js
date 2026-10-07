import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      
      <AdminSidebar />

      <div className="flex-1">
        <AdminTopbar />

        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}