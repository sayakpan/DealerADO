"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ServiceFormSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-8 h-8" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Service Info Card Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Skeleton className="w-16 h-16 rounded-xl" />
                        <div className="flex-1">
                            <Skeleton className="h-7 w-64 mb-2" />
                            <Skeleton className="h-5 w-96" />
                        </div>
                        <div className="text-right">
                            <Skeleton className="h-6 w-20 mb-1" />
                            <Skeleton className="h-5 w-16" />
                        </div>
                    </div>
                </div>

                {/* Form Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <Skeleton className="h-7 w-32 mb-6" />
                    
                    <div className="space-y-6">
                        {/* Form Fields */}
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                        ))}
                        
                        {/* Submit Button */}
                        <div className="pt-4">
                            <Skeleton className="h-12 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ServiceResultSkeleton() {
    return (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm w-full">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
            
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                    <Skeleton className="h-5 w-24" />
                </div>
                <div className="p-4 max-h-96 overflow-auto">
                    <div className="space-y-2">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Skeleton 
                                key={index} 
                                className={`h-4 bg-gray-600/30 ${
                                    index % 4 === 0 ? 'w-full' : 
                                    index % 4 === 1 ? 'w-5/6' : 
                                    index % 4 === 2 ? 'w-3/4' : 'w-1/2'
                                }`} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}