
"use client";

import { Button } from "@heroui/react";
import {
  FiClock,
  FiFileText,
  FiMoreVertical,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

type DocumentCardProps = {
  id: string;
  title: string;
  updatedAt: string;
};

function formatUpdatedAt(dateString: string): string {
  if (!dateString) return "Recently updated";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  const now = Date.now();
  const elapsed = Math.max(0, now - date.getTime());

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (elapsed < minute) {
    return "Updated just now";
  }

  if (elapsed < hour) {
    const minutes = Math.floor(elapsed / minute);
    return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (elapsed < day) {
    const hours = Math.floor(elapsed / hour);
    return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (elapsed < 7 * day) {
    const days = Math.floor(elapsed / day);
    return `Updated ${days} day${days === 1 ? "" : "s"} ago`;
  }

  return `Updated ${date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
}

export default function DocumentCard({
  id,
  title,
  updatedAt,
}: DocumentCardProps) {
  const router = useRouter();

  const handleOpenDocument = () => {
    router.push(`/documents/${id}`);
  };

  return (
    <div
      onClick={handleOpenDocument}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleOpenDocument();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`Open document ${title}`}
      className="
        group
        relative
        min-w-0
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.10]
        bg-white/[0.04]
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:border-white/[0.18]
        hover:bg-white/[0.07]
        hover:backdrop-blur-2xl
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
        active:translate-y-0
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          border
          border-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:border-white/[0.08]
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-white/[0.07]
            text-white/70
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:bg-white/[0.11]
            group-hover:text-white
          "
        >
          <FiFileText
            size={22}
            className="transition-transform duration-300 group-hover:-rotate-2"
          />
        </div>

        <Button
          isIconOnly
          variant="tertiary"
          aria-label="Document options"
          onPress={() => {
            // Options menu will be added later.
          }}
          className="
            !bg-transparent
            !text-white/40
            !shadow-none
            transition-all
            duration-300
            hover:!bg-white/[0.07]
            hover:!text-white
            hover:scale-105
          "
        >
          <FiMoreVertical size={18} />
        </Button>
      </div>

      <div className="relative z-10 mt-5">
        <h3
          className="
            truncate
            font-semibold
            text-white/90
            transition-colors
            duration-300
            group-hover:text-white
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
            text-sm
            text-white/40
            transition-colors
            duration-300
            group-hover:text-white/60
          "
        >
          <FiClock size={14} />
          <span>{formatUpdatedAt(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

