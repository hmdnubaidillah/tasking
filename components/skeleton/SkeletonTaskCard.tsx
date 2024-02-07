import { Skeleton } from "../ui/skeleton";

export default function SkeletonTaskCard() {
  return (
    <>
      {[...Array(3)].map((e, i) => (
        <div
          key={i}
          className="rounded-sm bg-white h-fit border-[1.5px] border-gray-300 cursor-default transition-all mb-3"
        >
          <div className="border-b border-gray-300 p-4 flex items-center justify-between">
            <Skeleton className="w-[200px] h-5 bg-slate-300" />
            <div className="sm:text-sm text-xs">
              <Skeleton className="w-[80px] h-4 bg-slate-300" />
            </div>
          </div>

          {/* title and desc */}
          <div className="border-b border-gray-300 p-4">
            <Skeleton className="w-[140px] h-4 bg-slate-300 mb-2"></Skeleton>
            <Skeleton className="w-[300px] h-3 bg-slate-300 mb-2"></Skeleton>
          </div>

          {/* badges */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-5">
              <Skeleton className="w-[50px] h-5 bg-slate-300 rounded-full" />
              <Skeleton className="w-[50px] h-5 bg-slate-300 rounded-full" />
            </div>

            {/* buttons */}
            <Skeleton className="w-[70px] h-7 bg-slate-300" />
          </div>
        </div>
      ))}
    </>
  );
}
