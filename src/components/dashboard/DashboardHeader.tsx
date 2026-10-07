import { Button } from "@heroui/react";
import { FiPlus } from "react-icons/fi";

type DashboardHeaderProps = {
  onCreateDocument: () => void;
};

export default function DashboardHeader({
  onCreateDocument,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Heading */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
          Workspace
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Welcome to SyncDocs
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
          Create, edit, and collaborate on documents in real time.
        </p>
      </div>

      {/* New Document */}
      <Button
        variant="primary"
        onPress={onCreateDocument}
        className="
          group
          h-12
          rounded-xl
          border
          border-white/15
          bg-white
          px-5
          font-semibold
          text-black
          !shadow-none
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:-translate-y-0.5
          hover:bg-white
          hover:shadow-[0_10px_35px_rgba(255,255,255,0.12)]
          active:scale-[0.98]
        "
      >
        <FiPlus
          size={19}
          className="
            transition-transform
            duration-300
            group-hover:rotate-90
            group-hover:scale-110
          "
        />

        <span>New Document</span>
      </Button>
    </div>
  );
}