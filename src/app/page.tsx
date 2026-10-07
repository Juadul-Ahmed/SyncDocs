"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DocumentList from "@/components/documents/DocumentList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addDocument } from "@/store/slices/documentSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const documents = useAppSelector(
    (state) => state.documents.documents
  );

  const handleCreateDocument = () => {
    dispatch(
      addDocument({
        id: crypto.randomUUID(),
        title: "Untitled Document",
        content: "",
      })
    );
  };

  console.log("Redux documents:", documents);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <DashboardHeader
              onCreateDocument={handleCreateDocument}
            />

            <DashboardStats />

            <DocumentList />
          </div>
        </main>
      </div>
    </div>
  );
}