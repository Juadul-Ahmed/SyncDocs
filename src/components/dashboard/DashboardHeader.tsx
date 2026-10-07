import { Button } from "@heroui/react";
import { FiPlus } from "react-icons/fi";

type DashboardHeaderProps = {
  onCreateDocument: () => void;
};

export default function DashboardHeader({
  onCreateDocument,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome to SyncDocs
        </h1>

        <p className="mt-2 text-default-500">
          Create, edit, and collaborate on documents in real time.
        </p>
      </div>

      <Button
        variant="primary"
        onPress={onCreateDocument}
      >
        <FiPlus size={18} />
        New Document
      </Button>
    </div>
  );
}