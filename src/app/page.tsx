
"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DocumentList from "@/components/documents/DocumentList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import {
  addDocument,
  setDocuments,
} from "@/store/slices/documentSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  getDocuments,
  createDocument,
} from "@/lib/api";

export default function Home() {
  const dispatch = useAppDispatch();

  const documents = useAppSelector(
    (state) => state.documents.documents
  );

  const [loadingDocuments, setLoadingDocuments] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadDocuments = async () => {
      setLoadingDocuments(true);

      try {
        const data = await getDocuments();

        if (!cancelled) {
          dispatch(setDocuments(data));
        }
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        if (!cancelled) {
          setLoadingDocuments(false);
        }
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const handleCreateDocument = async () => {
    try {
      const newDocument = await createDocument({
        title: "Untitled Document",
        content: "",
      });

      dispatch(addDocument(newDocument));
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

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

            <DocumentList
              loading={loadingDocuments}
              documents={documents}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

