"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ServiceHeader from "@/components/ui/serviceHeader";

export function SettingsSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Settings" />
            
            {/* Settings Content */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-[20px] p-6 shadow-sm">
                    <div className="flex flex-col justify-center items-end gap-5">
                        {/* Change Password Setting Skeleton */}
                        <div className="self-stretch flex justify-between items-center p-2">
                            <div className="flex justify-start items-center gap-3">
                                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <Skeleton className="w-4 h-4" />
                        </div>
                        
                        {/* Divider Line */}
                        <div className="w-full h-0 opacity-5 border-t border-gray-200"></div>
                        
                        {/* Deactivate Account Setting Skeleton */}
                        <div className="self-stretch flex justify-between items-center p-2">
                            <div className="flex justify-start items-center gap-3">
                                <Skeleton className="w-[50px] h-[50px] rounded-full" />
                                <Skeleton className="h-6 w-40" />
                            </div>
                            <Skeleton className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}