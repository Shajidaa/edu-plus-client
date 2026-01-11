import React from 'react';

export default function SkeletonTuition() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 animate-pulse overflow-hidden">
      <div className="card-body p-6">
        
        {/* Header Skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {/* Subject Title */}
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            {/* Posted Date */}
            <div className="flex items-center gap-2 mt-3">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Tuition Details Skeleton */}
        <div className="space-y-3 mb-4">
          
          {/* Class/Grade Box */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider my-2 opacity-50"></div>

        {/* Action Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-2"></div>
      </div>
    </div>
  );
}