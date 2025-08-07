"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

export function DeactivateModalSkeleton({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="p-0 border-0 bg-transparent shadow-none w-[min(90vw,570px)] max-w-none"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <div className="w-full h-[450px] relative bg-white rounded-[30px] shadow-[0px_8px_60px_5px_rgba(0,0,0,0.30)] overflow-hidden">
                    {/* Background ellipse with gradient */}
                    <div className="w-[678px] h-[384px] absolute -top-[244px] -left-[49px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-full z-[1] animate-pulse" />

                    {/* Red ellipse with mix-blend-darken */}
                    <div className="w-[678px] h-[384px] absolute -top-[244px] -left-[49px] bg-gray-400 rounded-full mix-blend-darken z-[2] animate-pulse" />

                    {/* White decorative blob */}
                    <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 w-[140px] h-[120px] z-10">
                        <Skeleton className="w-full h-full rounded-[50%]" />
                    </div>

                    {/* Icon Image Skeleton */}
                    <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] flex items-center justify-center z-20">
                        <Skeleton className="w-full h-full rounded-lg" />
                    </div>

                    {/* Content Area */}
                    <div className="absolute top-[180px] left-0 right-0 bottom-[120px] flex flex-col justify-center items-center px-[30px] text-center z-5">
                        <div className="flex flex-col items-center gap-3 w-full mb-4">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-80" />
                        </div>

                        {/* Password Input Skeleton */}
                        <div className="w-full max-w-[300px]">
                            <Skeleton className="w-full h-12 rounded-lg" />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                        <Skeleton className="flex-1 h-12 rounded-3xl" />
                        <Skeleton className="flex-1 h-12 rounded-3xl" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}