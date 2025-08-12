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
