import AdminSidebar from "@/components/admin/Sidebar.admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const user = await verifyToken(token);

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen">
      <AdminSidebar />

      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}