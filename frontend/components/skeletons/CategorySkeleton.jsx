"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-xl" />
                <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
        </div>
    );
}

export function CategoryListSkeleton({ count = 6 }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: count }).map((_, index) => (
                    <CategoryCardSkeleton key={index} />
                ))}
            </div>
            
            <div className="flex justify-center mt-8">
                <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
        </div>
    );
}