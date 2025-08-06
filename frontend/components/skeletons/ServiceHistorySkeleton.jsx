"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ServiceHeader from "@/components/ui/serviceHeader";

export function ServiceHistoryCardSkeleton() {
    return (
        <div className="w-full">
            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <div className="flex flex-wrap items-center gap-4">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <Skeleton className="w-8 h-8 rounded-md" />
                    </div>

                    {/* Request Data Skeleton */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Skeleton className="w-2 h-2 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="bg-gray-50 rounded-md p-3">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* API Response Code Block */}
            <div className="mt-3">
                <div className="bg-slate-900 rounded-lg border border-gray-300 overflow-hidden">
                    <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="p-3 max-h-64 sm:max-h-80">
                        <div className="space-y-2">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Skeleton 
                                    key={index} 
                                    className={`h-4 bg-gray-600/30 ${
                                        index % 3 === 0 ? 'w-full' : 
                                        index % 3 === 1 ? 'w-3/4' : 'w-1/2'
                                    }`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ServiceHistorySkeleton({ count = 3 }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mb-6 sm:mb-8">
                <ServiceHeader title="Service History" />
            </div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Tabs Skeleton */}
                <div className="mb-6">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-8 w-24 rounded-md" />
                        ))}
                    </div>
                </div>

                {/* Service History Cards */}
                <div className="space-y-4 sm:space-y-6">
                    {Array.from({ length: count }).map((_, index) => (
                        <ServiceHistoryCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}