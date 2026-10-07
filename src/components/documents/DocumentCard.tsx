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
      {/* Subtle glass highlight */}
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

      {/* Top */}
      <div className="relative z-10 flex items-start justify-between">
        {/* File Icon */}
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

        {/* Options */}
        <Button
          isIconOnly
          variant="tertiary"
          aria-label="Document options"
          onPress={() => {
            // Options menu will be added later
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

      {/* Content */}
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
          <span>{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}