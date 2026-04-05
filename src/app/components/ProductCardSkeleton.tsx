import { Skeleton } from "./ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square">
        <Skeleton className="w-full h-full rounded-t-xl opacity-40 bg-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 md:p-5 flex flex-col flex-grow space-y-3 md:space-y-4">
        {/* Category */}
        <Skeleton className="h-3 w-1/3 opacity-40 bg-gray-300" />
        
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-full opacity-40 bg-gray-300" />
          <Skeleton className="h-4 md:h-5 w-2/3 opacity-40 bg-gray-300" />
        </div>
        
        {/* Short Description */}
        <div className="space-y-1.5 md:space-y-2">
          <Skeleton className="h-3 w-full opacity-30 bg-gray-200" />
          <Skeleton className="h-3 w-full opacity-30 bg-gray-200" />
          <Skeleton className="h-3 w-3/4 opacity-30 bg-gray-200" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 md:h-8 w-16 md:w-20 opacity-40 bg-gray-300" />
          </div>
          <Skeleton className="h-4 md:h-5 w-16 md:w-24 opacity-30 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
