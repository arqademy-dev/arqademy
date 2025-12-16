"use client";

export default function SkeletonLoader() {
  return (
    <div className="fixed inset-0 top-16 left-0 right-0 bottom-0 lg:left-60 z-40 pointer-events-none">
      {/* Ripple background */}
      <div className="absolute inset-0 bg-gray-100">
        <div className="absolute inset-0 animate-ping bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"></div>
        <div className="absolute inset-0 animate-ping delay-300 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"></div>
      </div>

      {/* Skeleton content */}
      <div className="relative h-full p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
        {/* Upload Section Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200">
          <div className="h-8 bg-gray-200 rounded-xl w-48 mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-full mb-6 animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Performance Overview Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200">
          <div className="h-8 bg-gray-200 rounded-xl w-64 mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-20 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}