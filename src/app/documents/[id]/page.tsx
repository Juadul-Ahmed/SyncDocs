"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";
import { updateDocument } from "@/store/slices/documentSlice";

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const documentId = params.id as string;

  const document = useAppSelector((state) =>
    state.documents.documents.find(
      (item) => item.id === documentId
    )
  );

  const [title, setTitle] = useState(
    document?.title ?? ""
  );

  const [content, setContent] = useState(
    document?.content ?? ""
  );

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Document not found
          </h1>

          <p className="mt-2 text-default-500">
            This document does not exist in the current session.
          </p>

          <Button
            className="mt-6"
            variant="primary"
            onPress={() => router.push("/")}
          >
            <FiArrowLeft size={18} />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    dispatch(
      updateDocument({
        id: document.id,
        title,
        content,
      })
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-default-200">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Button
            variant="tertiary"
            onPress={() => router.push("/")}
          >
            <FiArrowLeft size={18} />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-default-500 sm:block">
              Changes are saved manually
            </span>

            <Button
              variant="primary"
              onPress={handleSave}
            >
              <FiSave size={17} />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="mx-auto max-w-4xl p-4 sm:p-8">
        <div className="rounded-xl border border-default-200 p-5 sm:p-8">
          {/* Title */}
          <TextField>
            <Label>Document Title</Label>

            <Input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter document title"
            />
          </TextField>

          {/* Content */}
          <TextField className="mt-6">
            <Label>Document Content</Label>

            <TextArea
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              placeholder="Start writing your document..."
              rows={15}
            />
          </TextField>
        </div>
      </main>
    </div>
  );
}