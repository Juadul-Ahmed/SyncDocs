"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FiClock, FiFileText, FiTrash2, FiX, FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import {
  deleteDocument as deleteDocumentApi,
  getDocument,
  updateDocument as updateDocumentApi,
} from "@/lib/api";

import {
  deleteDocument as deleteDocumentAction,
  updateDocument as updateDocumentAction,
} from "@/store/slices/documentSlice";

import { useAppDispatch } from "@/store/hooks";
import RenameDocumentModal from "./RenameDocumentModal";

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

  const elapsed = Math.max(0, Date.now() - date.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (elapsed < minute) return "Updated just now";

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
  const dispatch = useAppDispatch();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [error, setError] = useState("");

  const handleOpenDocument = () => {
    router.push(`/documents/${id}`);
  };

  const handleRename = async (newTitle: string) => {
    // Fetch the latest document so its content is preserved.
    const document = await getDocument(id);

    const updatedDocument = await updateDocumentApi(id, {
      title: newTitle,
      content: document.content,
    });

    // Update Redux only after MongoDB confirms success.
    dispatch(updateDocumentAction(updatedDocument));
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setError("");

    try {
      await deleteDocumentApi(id);

      dispatch(deleteDocumentAction(id));
      setIsConfirmOpen(false);
    } catch (err) {
      console.error("Failed to delete document:", err);
      setError("Couldn't delete this document. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Document Card */}
      <div
        onClick={(event) => {
          // Clicking action buttons should not open the editor.
          if ((event.target as HTMLElement).closest("button")) {
            return;
          }

          handleOpenDocument();
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpenDocument();
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={`Open document ${title}`}
        className="
          group relative min-w-0 cursor-pointer overflow-hidden
          rounded-2xl border border-white/[0.10] bg-white/[0.04]
          p-5 backdrop-blur-xl transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-white/[0.18]
          hover:bg-white/[0.07]
          hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
          active:translate-y-0
        "
      >
        {/* Glass border effect */}
        <div
          className="
            pointer-events-none absolute inset-0 rounded-2xl border
            border-transparent opacity-0 transition-opacity duration-300
            group-hover:border-white/[0.08] group-hover:opacity-100
          "
        />

        {/* Document icon and actions */}
        <div className="relative z-10 flex items-start justify-between">
          <div
            className="
              flex h-11 w-11 items-center justify-center rounded-xl
              bg-white/[0.07] text-white/70 transition-all duration-300
              group-hover:scale-105 group-hover:bg-white/[0.11]
              group-hover:text-white
            "
          >
            <FiFileText
              size={22}
              className="transition-transform duration-300 group-hover:-rotate-2"
            />
          </div>

          <div className="flex items-center gap-1">
            {/* Rename button */}
            <Button
              isIconOnly
              variant="tertiary"
              aria-label={`Rename document ${title}`}
              onPress={() => {
                setError("");
                setIsRenameOpen(true);
              }}
              className="
                !bg-transparent !text-white/40 !shadow-none
                transition-all duration-200
                hover:!bg-blue-500/10 hover:!text-blue-300
                hover:scale-105
              "
            >
              <FiEdit3 size={17} />
            </Button>

            {/* Delete button */}
            <Button
              isIconOnly
              variant="tertiary"
              aria-label={`Delete document ${title}`}
              isDisabled={isDeleting}
              onPress={() => {
                setError("");
                setIsConfirmOpen(true);
              }}
              className="
                !bg-transparent !text-white/40 !shadow-none
                transition-all duration-200
                hover:!bg-red-500/10 hover:!text-red-400
                hover:scale-105
              "
            >
              <FiTrash2 size={18} />
            </Button>
          </div>
        </div>

        {/* Document details */}
        <div className="relative z-10 mt-5">
          <h3
            className="
              truncate font-semibold text-white/90 transition-colors
              duration-300 group-hover:text-white
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-2 flex items-center gap-2 text-sm text-white/40
              transition-colors duration-300 group-hover:text-white/60
            "
          >
            <FiClock size={14} />
            <span>{formatUpdatedAt(updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Rename modal */}
      <RenameDocumentModal
        key={`${id}-${isRenameOpen ? "open" : "closed"}-${title}`}
        isOpen={isRenameOpen}
        title={title}
        onClose={() => setIsRenameOpen(false)}
        onSave={handleRename}
      />

      {/* Glassmorphism delete confirmation */}
      {isConfirmOpen && (
        <div
          className="
            fixed inset-0 z-[100] flex items-center justify-center
            bg-black/50 p-4 backdrop-blur-md
            animate-in fade-in duration-200
          "
          onClick={() => {
            if (!isDeleting) setIsConfirmOpen(false);
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${id}`}
            aria-describedby={`delete-description-${id}`}
            className="
              relative w-full max-w-md overflow-hidden rounded-3xl
              border border-white/[0.14] bg-white/[0.07]
              p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl sm:p-7
              animate-in zoom-in-95 duration-200
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Red glass glow */}
            <div
              className="
                pointer-events-none absolute -right-16 -top-20
                h-48 w-48 rounded-full bg-red-500/[0.10] blur-3xl
              "
            />

            <div
              className="
                pointer-events-none absolute inset-0 rounded-3xl
                border border-white/[0.04]
              "
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-start justify-between">
                <div
                  className="
                    flex h-14 w-14 items-center justify-center rounded-2xl
                    border border-red-400/20 bg-red-500/[0.10]
                    text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.08)]
                  "
                >
                  <FiTrash2 size={24} />
                </div>

                <Button
                  isIconOnly
                  variant="tertiary"
                  aria-label="Close confirmation"
                  isDisabled={isDeleting}
                  onPress={() => setIsConfirmOpen(false)}
                  className="
                    !bg-white/[0.05] !text-white/50 !shadow-none
                    hover:!bg-white/[0.12] hover:!text-white
                  "
                >
                  <FiX size={18} />
                </Button>
              </div>

              <h2
                id={`delete-title-${id}`}
                className="text-xl font-semibold tracking-tight text-white"
              >
                Delete document?
              </h2>

              <p
                id={`delete-description-${id}`}
                className="mt-3 text-sm leading-6 text-white/60"
              >
                Are you sure you want to delete{" "}
                <span className="font-medium text-white/90">{title}</span>? This
                action cannot be undone.
              </p>

              {error && (
                <div
                  role="alert"
                  className="
                    mt-4 rounded-xl border border-red-400/20
                    bg-red-500/[0.08] px-4 py-3 text-sm text-red-300
                    backdrop-blur-md
                  "
                >
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="tertiary"
                  isDisabled={isDeleting}
                  onPress={() => setIsConfirmOpen(false)}
                  className="
                    !border !border-white/[0.10] !bg-white/[0.04]
                    !text-white/70 !shadow-none
                    hover:!border-white/[0.18] hover:!bg-white/[0.09]
                    hover:!text-white
                  "
                >
                  Cancel
                </Button>

                <Button
                  isDisabled={isDeleting}
                  onPress={handleDelete}
                  className="
                    !border !border-red-400/20 !bg-red-500 !text-white
                    !shadow-[0_4px_20px_rgba(239,68,68,0.20)]
                    transition-all duration-200 hover:!bg-red-400
                    hover:!shadow-[0_6px_26px_rgba(239,68,68,0.30)]
                    active:scale-[0.98]
                  "
                >
                  <FiTrash2 size={16} />
                  {isDeleting ? "Deleting..." : "Delete document"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
