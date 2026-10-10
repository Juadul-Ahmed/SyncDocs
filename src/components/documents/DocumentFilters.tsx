
"use client";

import {
  FiCalendar,
  FiSearch,
  FiX,
  FiArrowDown,
  FiStar,
  FiFileText,
} from "react-icons/fi";

export type SortOption =
  | "recent"
  | "oldest"
  | "title-asc"
  | "title-desc";

export type DateFilterOption =
  | "all"
  | "7days"
  | "30days"
  | "year";

export type FavoriteFilterOption = "all" | "favorites";

type DocumentFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  dateFilter: DateFilterOption;
  onDateFilterChange: (value: DateFilterOption) => void;
  favoriteFilter: FavoriteFilterOption;
  onFavoriteFilterChange: (value: FavoriteFilterOption) => void;
};

export default function DocumentFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  dateFilter,
  onDateFilterChange,
  favoriteFilter,
  onFavoriteFilterChange,
}: DocumentFiltersProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
      {/* Search */}
      <div className="relative">
        <FiSearch
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
        />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search documents by title..."
          aria-label="Search documents by title"
          className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/20 focus:ring-2 focus:ring-white/[0.05]"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Sort, date, and favorite filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Sort */}
        <div className="relative">
          <FiArrowDown
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
          />

          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as SortOption)
            }
            aria-label="Sort documents"
            className="h-11 w-full appearance-none rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-3 text-sm text-white outline-none transition focus:border-white/20 [&>option]:bg-[#171717] [&>option]:text-white"
          >
            <option value="recent">Recently updated</option>
            <option value="oldest">Oldest updated</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>

        {/* Date filter */}
        <div className="relative">
          <FiCalendar
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
          />

          <select
            value={dateFilter}
            onChange={(event) =>
              onDateFilterChange(event.target.value as DateFilterOption)
            }
            aria-label="Filter documents by update date"
            className="h-11 w-full appearance-none rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-3 text-sm text-white outline-none transition focus:border-white/20 [&>option]:bg-[#171717] [&>option]:text-white"
          >
            <option value="all">Any time</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="year">Last 365 days</option>
          </select>
        </div>

        {/* Favorites filter */}
        <div className="relative">
          {favoriteFilter === "favorites" ? (
            <FiStar
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-400"
            />
          ) : (
            <FiFileText
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45"
            />
          )}

          <select
            value={favoriteFilter}
            onChange={(event) =>
              onFavoriteFilterChange(
                event.target.value as FavoriteFilterOption,
              )
            }
            aria-label="Filter favorite documents"
            className="h-11 w-full appearance-none rounded-xl border border-white/[0.08] bg-black/20 pl-10 pr-3 text-sm text-white outline-none transition focus:border-white/20 [&>option]:bg-[#171717] [&>option]:text-white"
          >
            <option value="all">All documents</option>
            <option value="favorites">Favorites only</option>
          </select>
        </div>
      </div>
    </div>
  );
}

