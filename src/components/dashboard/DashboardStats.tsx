import {
  FiFileText,
  FiShare2,
  FiClock,
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
            className="rounded-xl border border-default-200 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-default-500">
                {stat.label}
              </p>

              <Icon size={19} />
            </div>

            <p className="mt-3 text-2xl font-bold">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}