'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function ModalSkeleton() {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-6 w-1/3 mb-4" />
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
