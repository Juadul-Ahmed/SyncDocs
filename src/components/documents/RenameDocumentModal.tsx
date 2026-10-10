"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FiEdit3, FiX } from "react-icons/fi";

type RenameDocumentModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave: (newTitle: string) => Promise<void>;
};

export default function RenameDocumentModal({
  isOpen,
  title,
  onClose,
  onSave,
}: RenameDocumentModalProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");



  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setError("Document title cannot be empty.");
      return;
    }

    if (trimmedTitle === title.trim()) {
      onClose();
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await onSave(trimmedTitle);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to rename document. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
      onClick={() => {
        if (!isSaving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-document-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.14] bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Subtle glass glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-500/[0.10] blur-3xl" />

        <form onSubmit={handleSave} className="relative z-10">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/[0.10] text-blue-300">
              <FiEdit3 size={24} />
            </div>

            <Button
              type="button"
              isIconOnly
              variant="tertiary"
              aria-label="Close rename dialog"
              isDisabled={isSaving}
              onPress={onClose}
              className="!bg-white/[0.05] !text-white/50 !shadow-none hover:!bg-white/[0.12] hover:!text-white"
            >
              <FiX size={18} />
            </Button>
          </div>

          <h2
            id="rename-document-title"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Rename document
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Choose a new name for your document.
          </p>

          {/* Title input */}
          <div className="mt-6">
            <label
              htmlFor="rename-document-input"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Document title
            </label>

            <input
              id="rename-document-input"
              type="text"
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.target.value);
                setError("");
              }}
              maxLength={150}
              autoFocus
              disabled={isSaving}
              placeholder="Enter document title"
              className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/10 disabled:opacity-50"
            />

            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>Maximum 150 characters</span>
              <span>{newTitle.length}/150</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="tertiary"
              isDisabled={isSaving}
              onPress={onClose}
              className="!border !border-white/[0.10] !bg-white/[0.04] !text-white/70 !shadow-none hover:!bg-white/[0.09] hover:!text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isDisabled={isSaving || !newTitle.trim()}
              className="!border !border-blue-400/20 !bg-blue-500 !text-white !shadow-[0_4px_20px_rgba(59,130,246,0.20)] hover:!bg-blue-400"
            >
              <FiEdit3 size={16} />
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}