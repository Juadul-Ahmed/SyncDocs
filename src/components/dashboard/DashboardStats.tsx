"use client";

import {
  FiClock,
  FiFileText,
  FiShare2,
} from "react-icons/fi";

const stats = [
  {
    label: "My Documents",
    value: "12",
    icon: FiFileText,
  },
  {
    label: "Shared with me",
    value: "5",
    icon: FiShare2,
  },
  {
    label: "Recently Edited",
    value: "4",
    icon: FiClock,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.10]
              bg-white/[0.04]
              p-5
              backdrop-blur-xl

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-white/[0.18]
              hover:bg-white/[0.07]
              hover:backdrop-blur-2xl
              hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]

              active:translate-y-0
            "
          >
            {/* Subtle glass highlight */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                border
                border-transparent
                opacity-0
                transition-opacity
                duration-300
                group-hover:border-white/[0.08]
                group-hover:opacity-100
              "
            />

            {/* Top row */}
            <div className="relative z-10 flex items-center justify-between">
              {/* Label */}
              <p
                className="
                  text-sm
                  font-medium
                  text-white/50
                  transition-colors
                  duration-300
                  group-hover:text-white/70
                "
              >
                {stat.label}
              </p>

              {/* Icon */}
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
                  text-white/50

                  transition-all
                  duration-300

                  group-hover:scale-110
                  group-hover:bg-white/[0.10]
                  group-hover:text-white
                  group-hover:border-white/[0.14]
                "
              >
                <Icon
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-rotate-6
                  "
                />
              </div>
            </div>

            {/* Number */}
            <p
              className="
                relative
                z-10
                mt-5
                text-3xl
                font-semibold
                tracking-tight
                text-white/90

                transition-all
                duration-300

                group-hover:text-white
                group-hover:translate-x-0.5
              "
            >
              {stat.value}
            </p>

            {/* Bottom accent */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-5
                right-5
                h-px
                bg-white/[0.06]
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </div>
        );
      })}
    </div>
  );
}