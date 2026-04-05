import { Skeleton } from "./ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button Skeleton */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <Skeleton className="h-6 md:h-8 w-24 md:w-32 bg-gray-200" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Image Skeleton */}
            <Skeleton className="w-full aspect-square lg:aspect-[4/5] bg-gray-200 rounded-none lg:rounded-l-2xl shadow-sm" />

            {/* Info Skeleton */}
            <div className="p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
              <div className="space-y-2 md:space-y-3">
                <Skeleton className="h-4 md:h-5 w-24 md:w-32 bg-gray-200" />
                <Skeleton className="h-8 md:h-12 lg:h-16 w-full bg-gray-300" />
                <Skeleton className="h-8 md:h-12 w-2/3 bg-gray-300" />
              </div>

              {/* Price Row */}
              <div className="flex items-center gap-4 py-4 md:py-6 border-b border-gray-100 mt-2 md:mt-4">
                <Skeleton className="h-10 md:h-16 w-32 md:w-48 bg-gray-300" />
                <Skeleton className="h-6 md:h-10 w-24 md:w-32 bg-gray-200" />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-12 md:h-16 w-full bg-gray-200 rounded-xl shadow-sm" />
                <Skeleton className="h-12 md:h-16 w-full bg-gray-200 rounded-xl shadow-sm" />
              </div>

              <Skeleton className="h-12 md:h-16 w-full bg-gray-200 rounded-xl shadow-sm md:mt-4" />

              {/* Badges Container */}
              <div className="grid grid-cols-3 gap-4 py-6 md:py-8 border-b border-gray-100">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200" />
                  <Skeleton className="h-3 md:h-4 w-12 md:w-20 bg-gray-100" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200" />
                  <Skeleton className="h-3 md:h-4 w-12 md:w-20 bg-gray-100" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200" />
                  <Skeleton className="h-3 md:h-4 w-12 md:w-20 bg-gray-100" />
                </div>
              </div>

              {/* Benefits Section */}
              <div className="space-y-4 pt-6 md:pt-8">
                <Skeleton className="h-6 md:h-8 w-40 md:w-48 bg-gray-200" />
                <div className="space-y-3">
                  <Skeleton className="h-4 md:h-5 w-full bg-gray-100 px-2" />
                  <Skeleton className="h-4 md:h-5 w-full bg-gray-100 px-2" />
                  <Skeleton className="h-4 md:h-5 w-4/5 bg-gray-100 px-2" />
                  <Skeleton className="h-4 md:h-5 w-3/5 bg-gray-100 px-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
