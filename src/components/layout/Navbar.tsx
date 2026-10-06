import { Button } from "@heroui/react";
import { FiBell, FiLogIn } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="border-b border-default-200">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
            <span className="text-lg font-bold">S</span>
          </div>

          <span className="text-xl font-bold">SyncDocs</span>
        </div>

        <div className="flex items-center gap-3">
          <Button isIconOnly variant="tertiary" aria-label="Notifications">
            <FiBell size={18} />
          </Button>

          <Button variant="tertiary">
            <FiLogIn size={17} />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
