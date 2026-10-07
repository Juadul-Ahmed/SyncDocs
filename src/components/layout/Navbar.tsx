"use client";

import { Button } from "@heroui/react";
import {
  FiBell,
  FiLogIn,
  FiMenu,
} from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass glass-shadow mx-auto flex h-16 max-w-[1600px] items-center justify-between rounded-2xl px-3 sm:px-5">
        {/* Logo */}
        <div className="group flex cursor-pointer items-center gap-3">
          {/* Mobile Menu */}
          <Button
            isIconOnly
            variant="tertiary"
            className="
              rounded-xl
              !bg-transparent
              !text-white
              !shadow-none
              transition-all
              duration-300
              hover:!bg-white/[0.06]
              hover:scale-105
              hover:-translate-y-0.5
              hover:!text-white
              md:hidden
            "
            aria-label="Open navigation"
          >
            <FiMenu
              size={20}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </Button>

          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-white
                text-black
                shadow-lg
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:-rotate-3
                group-hover:shadow-[0_0_20px_rgba(255,255,255,0.18)]
              "
            >
              <span className="text-lg font-bold">
                S
              </span>
            </div>

            {/* Brand Text */}
            <div>
              <span className="block text-lg font-semibold tracking-tight text-white transition-all duration-300 group-hover:tracking-normal sm:text-xl">
                SyncDocs
              </span>

              <span className="hidden text-[11px] font-medium text-white/60 transition-all duration-300 group-hover:text-white/80 sm:block">
                Collaborate in real time
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <Button
            isIconOnly
            variant="tertiary"
            aria-label="Notifications"
            className="
              group
              rounded-xl
              !bg-transparent
              !text-white/75
              !shadow-none
              transition-all
              duration-300
              hover:!bg-white/[0.07]
              hover:scale-105
              hover:-translate-y-0.5
              hover:!text-white
              hover:shadow-[0_8px_25px_rgba(255,255,255,0.06)]
              active:scale-95
            "
          >
            <FiBell
              size={18}
              className="
                transition-all
                duration-300
                group-hover:-rotate-12
                group-hover:scale-110
              "
            />
          </Button>

          {/* Sign In */}
          <Button
            variant="tertiary"
            className="
              group
              hidden
              rounded-xl
              !bg-transparent
              !text-white/75
              !shadow-none
              transition-all
              duration-300
              hover:!bg-white/[0.07]
              hover:scale-[1.02]
              hover:-translate-y-0.5
              hover:!text-white
              hover:shadow-[0_8px_25px_rgba(255,255,255,0.06)]
              active:scale-[0.98]
              sm:flex
            "
          >
            <FiLogIn
              size={17}
              className="
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:scale-110
              "
            />

            <span className="font-medium transition-all duration-300 group-hover:translate-x-0.5">
              Sign In
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}