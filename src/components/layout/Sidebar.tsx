import { Button } from "@heroui/react";
import { FiFileText, FiHome, FiShare2, FiTrash2 } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="hidden w-60 border-r border-default-200 md:block">
      <div className="flex h-full flex-col p-4">
        <nav className="flex flex-col gap-6">
          <Button className="justify-start" variant="tertiary">
            <FiHome size={18} />
            Dashboard
          </Button>

          <Button className="justify-start" variant="tertiary">
            <FiFileText size={18} />
            My Documents
          </Button>

          <Button className="justify-start" variant="tertiary">
            <FiShare2 size={18} />
            Shared with me
          </Button>

          <Button className="justify-start" variant="tertiary">
            <FiTrash2 size={18} />
            Trash
          </Button>
        </nav>
      </div>
    </aside>
  );
}
