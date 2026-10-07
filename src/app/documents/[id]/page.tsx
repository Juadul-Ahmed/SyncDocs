"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  FiArrowLeft,
  FiCheck,
  FiFileText,
  FiSave,
} from "react-icons/fi";
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

  const [saved, setSaved] = useState(false);

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div
          className="
            glass
            glass-shadow
            w-full
            max-w-md
            rounded-3xl
            p-8
            text-center
            glass-enter
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.10]
              bg-white/[0.06]
              text-white/60
            "
          >
            <FiFileText size={25} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-white">
            Document not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/45">
            This document does not exist in the current
            session.
          </p>

          <Button
            variant="tertiary"
            onPress={() => router.push("/")}
            className="
              mt-6
              !bg-white/[0.07]
              !text-white
              !shadow-none
              border
              border-white/[0.10]
              rounded-xl
              transition-all
              duration-300
              hover:!bg-white/[0.12]
              hover:border-white/[0.18]
              hover:-translate-y-0.5
            "
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

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* ========================================
          Top Navigation
      ======================================== */}

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className="
            glass
            glass-shadow
            mx-auto
            flex
            h-16
            max-w-[1600px]
            items-center
            justify-between
            rounded-2xl
            px-3
            sm:px-5
          "
        >
          {/* Back */}
          <Button
            variant="tertiary"
            onPress={() => router.push("/")}
            className="
              group
              rounded-xl
              !bg-transparent
              !text-white/70
              !shadow-none
              transition-all
              duration-300
              hover:!bg-white/[0.07]
              hover:!text-white
              hover:-translate-x-0.5
            "
          >
            <FiArrowLeft
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            <span className="font-medium">
              Back
            </span>
          </Button>

          {/* Document Name */}
          <div className="hidden items-center gap-2 sm:flex">
            <FiFileText
              size={17}
              className="text-white/45"
            />

            <span className="max-w-[300px] truncate text-sm font-medium text-white/70">
              {title || "Untitled Document"}
            </span>
          </div>

          {/* Save */}
          <Button
            variant="primary"
            onPress={handleSave}
            className="
              group
              h-10
              rounded-xl
              border
              border-white/[0.12]
              bg-white
              px-4
              font-semibold
              text-black
              !shadow-none

              transition-all
              duration-300

              hover:scale-[1.03]
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-[0_10px_30px_rgba(255,255,255,0.12)]

              active:scale-[0.97]
            "
          >
            {saved ? (
              <FiCheck
                size={17}
                className="animate-pulse"
              />
            ) : (
              <FiSave
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-y-[-1px]
                "
              />
            )}

            <span>
              {saved ? "Saved" : "Save"}
            </span>
          </Button>
        </div>
      </header>

      {/* ========================================
          Editor
      ======================================== */}

      <main className="px-4 py-8 sm:px-6 sm:py-10">
        <div
          className="
            glass
            glass-shadow
            glass-enter
            mx-auto
            max-w-5xl
            overflow-hidden
            rounded-3xl
          "
        >
          {/* Editor Header */}
          <div
            className="
              border-b
              border-white/[0.08]
              px-5
              py-5
              sm:px-8
              sm:py-6
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.06]
                  text-white/60
                "
              >
                <FiFileText size={19} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                  Document Editor
                </p>

                <p className="mt-1 text-sm text-white/50">
                  Write and edit your document
                </p>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-5 sm:p-8">
            {/* Title */}
            <TextField>
              <Label
                className="
                  mb-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-white/45
                "
              >
                Document Title
              </Label>

              <Input
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter document title"
                className="
                  !border-white/[0.10]
                  !bg-white/[0.05]
                  !text-white
                  placeholder:!text-white/25
                  rounded-xl

                  transition-all
                  duration-300

                  hover:!bg-white/[0.07]
                  focus-within:!border-white/[0.20]
                  focus-within:!bg-white/[0.08]
                "
              />
            </TextField>

            {/* Content */}
            <TextField className="mt-7">
              <Label
                className="
                  mb-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-white/45
                "
              >
                Document Content
              </Label>

              <TextArea
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
                placeholder="Start writing your document..."
                rows={18}
                className="
                  !border-white/[0.10]
                  !bg-white/[0.05]
                  !text-white
                  placeholder:!text-white/25
                  rounded-xl

                  transition-all
                  duration-300

                  hover:!bg-white/[0.07]
                  focus-within:!border-white/[0.20]
                  focus-within:!bg-white/[0.08]
                "
              />
            </TextField>

            {/* Bottom Info */}
            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-white/[0.07]
                pt-4
              "
            >
              <p className="text-xs text-white/30">
                Changes are saved manually
              </p>

              <p className="text-xs text-white/30">
                {content.length} characters
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}