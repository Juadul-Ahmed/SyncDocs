import { Button } from "@heroui/react";
import {
  FiClock,
  FiFileText,
  FiMoreVertical,
} from "react-icons/fi";

type DocumentCardProps = {
  title: string;
  updatedAt: string;
};

export default function DocumentCard({
  title,
  updatedAt,
}: DocumentCardProps) {
  return (
    <div className="group rounded-xl border border-default-200 p-5 transition hover:border-default-400 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-default-100">
          <FiFileText size={22} />
        </div>

        <Button
          isIconOnly
          variant="tertiary"
          aria-label="Document options"
        >
          <FiMoreVertical size={18} />
        </Button>
      </div>

      <div className="mt-5">
        <h3 className="truncate font-semibold">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-default-500">
          <FiClock size={14} />
          <span>{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}