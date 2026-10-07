"use client";

import { Button } from "@heroui/react";
import {
  FiFileText,
  FiHome,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";

const navigationItems = [
  {
    label: "Dashboard",
    icon: FiHome,
    active: true,
  },
  {
    label: "My Documents",
    icon: FiFileText,
    active: false,
  },
  {
    label: "Shared with me",
    icon: FiShare2,
    active: false,
  },
  {
    label: "Trash",
    icon: FiTrash2,
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 p-4 md:block">
      <div className="glass glass-shadow sticky top-23 flex h-[calc(100vh-7rem)] flex-col rounded-2xl p-3">
        {/* Section Title */}
        <div className="mb-4 px-3 pt-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Workspace
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.label}
                variant="tertiary"
                className={`
                  group
                  relative
                  h-11
                  justify-start
                  overflow-hidden
                  rounded-xl
                  px-3
                  !shadow-none
                  transition-all
                  duration-300

                  ${
                    item.active
                      ? "!bg-white/[0.08] !text-white"
                      : "!bg-transparent !text-white/70 hover:!bg-white/[0.07] hover:!text-white"
                  }

                  hover:scale-[1.02]
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                `}
              >
                {/* Active indicator */}
                {item.active && (
                  <span
                    className="
                      absolute
                      left-0
                      h-5
                      w-[3px]
                      rounded-full
                      bg-white
                      shadow-[0_0_12px_rgba(255,255,255,0.7)]
                    "
                  />
                )}

                {/* Subtle hover highlight */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-xl
                    border
                    border-transparent
                    transition-all
                    duration-300
                    group-hover:border-white/[0.08]
                  "
                />

                {/* Icon */}
                <Icon
                  size={18}
                  className={`
                    relative
                    z-10
                    shrink-0
                    transition-all
                    duration-300

                    ${
                      item.active
                        ? "text-white"
                        : "text-white/65 group-hover:text-white group-hover:translate-x-1 group-hover:scale-110"
                    }
                  `}
                />

                {/* Text */}
                <span
                  className={`
                    relative
                    z-10
                    ml-1
                    font-medium
                    transition-all
                    duration-300

                    ${
                      item.active
                        ? "text-white"
                        : "text-white/70 group-hover:text-white group-hover:translate-x-0.5"
                    }
                  `}
                >
                  {item.label}
                </span>
              </Button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-white/10 pt-3">
          <div
            className="
              group
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-3
              py-3
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:-translate-y-0.5
              hover:border-white/[0.12]
              hover:bg-white/[0.06]
            "
          >
            <p className="text-xs font-semibold text-white/80 transition-colors duration-300 group-hover:text-white">
              SyncDocs
            </p>

            <p className="mt-1 text-[11px] text-white/50 transition-colors duration-300 group-hover:text-white/70">
              Real-time collaboration
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}