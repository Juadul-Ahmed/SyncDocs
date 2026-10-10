
"use client";

import { useMemo, useState } from "react";

import DocumentCard from "./DocumentCard";
import DocumentFilters, {
  type SortOption,
  type DateFilterOption,
  type FavoriteFilterOption,
} from "./DocumentFilters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
};

type DocumentListProps = {
  loading: boolean;
  documents: Document[];
};

export default function DocumentList({
  loading,
  documents,
}: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [dateFilter, setDateFilter] =
    useState<DateFilterOption>("all");
  const [favoriteFilter, setFavoriteFilter] =
    useState<FavoriteFilterOption>("all");

  // Calculate the cutoff when the date filter changes.
  const [dateCutoff, setDateCutoff] = useState<number | null>(null);

  const handleDateFilterChange = (value: DateFilterOption) => {
    const durations: Record<DateFilterOption, number | null> = {
      all: null,
      "7days": 7 * 24 * 60 * 60 * 1000,
      "30days": 30 * 24 * 60 * 60 * 1000,
      year: 365 * 24 * 60 * 60 * 1000,
    };

    const duration = durations[value];

    setDateCutoff(
      duration === null ? null : Date.now() - duration,
    );
    setDateFilter(value);
  };

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...documents]
      .filter((document) => {
        // Search by title.
        const matchesTitle = document.title
          .toLowerCase()
          .includes(query);

        // Filter by updated date.
        const updatedAt = new Date(document.updatedAt).getTime();

        const matchesDate =
          dateFilter === "all" ||
          (dateCutoff !== null &&
            Number.isFinite(updatedAt) &&
            updatedAt >= dateCutoff);

        // Filter favorites.
        const matchesFavorite =
          favoriteFilter === "all" || document.isFavorite;

        return matchesTitle && matchesDate && matchesFavorite;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "oldest":
            return (
              new Date(a.updatedAt).getTime() -
              new Date(b.updatedAt).getTime()
            );

          case "title-asc":
            return a.title.localeCompare(b.title);

          case "title-desc":
            return b.title.localeCompare(a.title);

          case "recent":
          default:
            return (
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
            );
        }
      });
  }, [
    documents,
    searchQuery,
    sortBy,
    dateFilter,
    dateCutoff,
    favoriteFilter,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    handleDateFilterChange("all");
    setFavoriteFilter("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    dateFilter !== "all" ||
    favoriteFilter !== "all";

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          {favoriteFilter === "favorites"
            ? "Favorite Documents"
            : "Recent Documents"}
        </h2>

        <p className="mt-1 text-sm text-default-500">
          {loading
            ? "Loading your documents..."
            : `${filteredDocuments.length} ${
                filteredDocuments.length === 1
                  ? "document"
                  : "documents"
              } found`}
        </p>
      </div>

      <DocumentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        dateFilter={dateFilter}
        onDateFilterChange={handleDateFilterChange}
        favoriteFilter={favoriteFilter}
        onFavoriteFilterChange={setFavoriteFilter}
      />

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <LoadingSpinner
            size="lg"
            label="Loading recent documents..."
          />
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
          <p className="font-medium text-white/80">
            No documents yet.
          </p>

          <p className="mt-2 text-sm text-white/45">
            Create your first document to get started.
          </p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
          <p className="font-medium text-white/80">
            {favoriteFilter === "favorites"
              ? "No favorite documents found"
              : "No matching documents"}
          </p>

          <p className="mt-2 text-sm text-white/45">
            {favoriteFilter === "favorites" &&
            !searchQuery.trim() &&
            dateFilter === "all"
              ? "Mark a document as a favorite using its star button."
              : "Try changing your search or filters."}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl border border-white/[0.10] bg-white/[0.05] px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.10] hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              id={document.id}
              title={document.title}
              updatedAt={document.updatedAt}
              isFavorite={document.isFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

