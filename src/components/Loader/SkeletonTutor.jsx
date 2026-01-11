import React from 'react';

const SkeletonTutor = () => {
  return (
    <div
      className="rounded-xl shadow-lg border overflow-hidden animate-pulse"
      style={{
        backgroundColor: "var(--color-card-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Skeleton Image Area */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <div className="absolute bottom-4 left-4 right-4">
          {/* Skeleton Name */}
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          {/* Skeleton Role */}
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Skeleton Details Area */}
      <div className="p-6">
        <div className="space-y-3 mb-4">
          {/* Skeleton Email Line */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Skeleton Button */}
          <div className="mt-6">
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTutor;