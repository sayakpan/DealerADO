"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ServiceHeader from "@/components/ui/serviceHeader";

export function WalletSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Wallet" />
            
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                    {/* Wallet Balance Card Skeleton */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[570px] mx-auto h-64 sm:h-72 relative bg-white/50 rounded-[30px] overflow-hidden animate-pulse">
                            {/* Decorative elements */}
                            <div className="w-32 h-32 sm:w-44 sm:h-44 left-[-10%] bottom-[-15%] absolute opacity-10 rounded-full border-[16px] sm:border-[22.54px] border-gray-300/30" />
                            <div className="w-48 h-48 sm:w-64 sm:h-64 left-[-15%] bottom-[-25%] absolute opacity-10 rounded-full border-[16px] sm:border-[22.54px] border-gray-300/30" />
                            <div className="w-32 h-32 sm:w-44 sm:h-44 right-[-10%] top-[-15%] absolute opacity-10 rounded-full border-[16px] sm:border-[23.12px] border-gray-300/30" />
                            <div className="w-48 h-48 sm:w-64 sm:h-64 right-[-15%] top-[-25%] absolute opacity-10 rounded-full border-[16px] sm:border-[23.12px] border-gray-300/30" />
                            
                            {/* Content skeleton */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 py-6">
                                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                                    <Skeleton className="w-12 h-14 sm:w-14 sm:h-16 rounded-[20px] bg-gray-300/40" />
                                    <Skeleton className="h-12 sm:h-16 w-32 sm:w-40 bg-gray-300/40" />
                                </div>
                                <Skeleton className="h-5 sm:h-6 w-48 mb-6 sm:mb-8 bg-gray-300/40" />
                                <Skeleton className="w-full max-w-[90%] h-12 rounded-2xl bg-gray-300/40" />
                            </div>
                        </div>
                    </div>

                    {/* Transaction History Skeleton */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[570px] bg-white rounded-2xl p-6 shadow-sm">
                            <Skeleton className="h-8 w-24 mb-6" />
                            
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className={`flex justify-between items-center py-3 ${
                                        index < 4 ? 'border-b border-gray-100' : ''
                                    }`}>
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}