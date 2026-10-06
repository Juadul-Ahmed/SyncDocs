import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DocumentList from "@/components/documents/DocumentList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <DashboardHeader />

            <DashboardStats />

            <DocumentList />
          </div>
        </main>
      </div>
    </div>
  );
}