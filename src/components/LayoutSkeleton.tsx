"use client";

export const LayoutSkeleton = () => (
  <div className="animate-pulse px-4 py-8 space-y-4 max-w-2xl mx-auto">
    <div className="h-12 bg-gray-200 rounded w-1/3" />
    <div className="h-6 bg-gray-200 rounded w-1/2" />
    <div className="h-8 bg-gray-200 rounded w-full" />
    <div className="h-8 bg-gray-200 rounded w-full" />
  </div>
);