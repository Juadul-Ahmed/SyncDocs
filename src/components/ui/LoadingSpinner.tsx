
"use client";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};

export default function LoadingSpinner({
  size = "md",
  label = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-7 w-7 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-white/15 border-t-white`}
      />

      <span className="text-sm text-white/50">
        {label}
      </span>
    </div>
  );
}
