"use client";

import { useAppSelector } from "@/store/hooks";
import DocumentCard from "./DocumentCard";

export default function DocumentList() {
  const documents = useAppSelector(
    (state) => state.documents.documents
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Documents
        </h2>

        <button className="text-sm text-default-500 hover:text-foreground">
          View all
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-xl border border-dashed border-default-300 p-10 text-center">
          <p className="text-default-500">
            No documents yet.
          </p>

          <p className="mt-1 text-sm text-default-400">
            Create your first document to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              id={document.id}
              title={document.title}
              updatedAt="Just now"
            />
          ))}
        </div>
      )}
    </section>
  );
}