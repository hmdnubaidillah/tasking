import { Skeleton } from "../ui/skeleton";

export default function SkeletonProfile() {
  return (
    <div className="flex flex-col gap-2 p-4 border-b border-gray-300">
      <Skeleton className="h-3 w-[150px] bg-slate-300" />
      <Skeleton className="h-3 w-[200px] bg-slate-300" />
    </div>
  );
}
