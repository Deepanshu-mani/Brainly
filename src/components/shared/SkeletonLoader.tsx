import { useTheme } from "../../contexts/ThemeContext";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`animate-pulse ${
        theme === "light" ? "bg-gray-200" : "bg-white/10"
      } rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

// Card Skeleton Components
export function CardSkeleton() {
  return (
    <div className="w-full max-w-sm">
      <Skeleton className="h-48 w-full mb-3" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function WebsiteCardSkeleton() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Content */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6 mb-4" />

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Date */}
        <Skeleton className="h-3 w-20 ml-auto" />
      </div>
    </div>
  );
}

export function NoteCardSkeleton() {
  return (
    <div className="w-[280px] h-[240px]">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg h-full">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-3 w-12" />
        </div>

        {/* Content */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>

        {/* Date */}
        <Skeleton className="h-3 w-20 ml-auto" />
      </div>
    </div>
  );
}

export function AddToBrainCardSkeleton() {
  return (
    <div className="w-[280px] h-[240px]">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg h-full flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="w-12 h-12 rounded-full mx-auto mb-3" />
          <Skeleton className="h-4 w-24 mx-auto mb-2" />
          <Skeleton className="h-3 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}
