import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-mhs-border/60 dark:bg-mhs-border/40",
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-mhs-card border border-mhs-border rounded-[12px] p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <Skeleton className="w-3 h-3 rounded-full mt-1.5 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-mhs-card border border-mhs-border rounded-xl p-5 flex flex-col gap-3">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <div className="flex-1 flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  );
}
