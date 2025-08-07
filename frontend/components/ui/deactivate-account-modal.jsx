"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { logout } from "@/lib/auth";
import { toast } from "@/plugin/toast";
import { deactivateAccount } from "@/services/settings";
import { DeactivateModalSkeleton } from "@/components/skeletons/ModalSkeleton";

export default function DeactivateAccountModal({ 
    open, 
    onOpenChange,
    trigger
}) {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleDeactivate = async () => {
        if (!password.trim()) {
            toast.error("Please enter your password");
            return;
        }

        setIsLoading(true);
        try {
            const result = await deactivateAccount(password);
            
            if (result.success) {
                toast.success("Account deactivated successfully");
                
                // Logout the user
                const logoutResponse = await logout();
                if (logoutResponse.success) {
                    window.location.href = "/login";
                } else {
                    // Still redirect even if logout API fails
                    window.location.href = "/login";
                }
            } else {
                toast.error(result.message || "Failed to deactivate account");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while deactivating account");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setPassword("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="p-0 border-0 bg-transparent shadow-none w-[min(90vw,570px)] max-w-none"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <div className="w-full h-[450px] relative bg-white rounded-[30px] shadow-[0px_8px_60px_5px_rgba(0,0,0,0.30)] overflow-hidden">
                    {/* Background ellipse with gradient */}
                    <div className="w-[678px] h-[384px] absolute -top-[244px] -left-[49px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-full z-[1]" />

                    {/* Red ellipse with mix-blend-darken */}
                    <div className="w-[678px] h-[384px] absolute -top-[244px] -left-[49px] bg-[#B52628] rounded-full mix-blend-darken z-[2]" />

                    {/* Car image overlay ellipse */}
                    <div className="w-[678px] h-[384px] absolute -top-[244px] -left-[49px] rounded-full overflow-hidden opacity-30 z-[3]">
                        <img
                            src="/images/homepage/carbg1.png"
                            alt="Car background"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* White decorative blob */}
                    <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2 w-[140px] h-[120px] z-10">
                        <svg className="w-full h-full" viewBox="0 0 146 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M74.8115 17.7723C53.3331 20.6293 19.0078 5.52973 5.38807 22.3816C-8.17181 39.1594 12.5002 61.2166 16.1223 82.4827C19.1553 100.29 10.8944 122.316 24.4441 134.262C38.0211 146.232 59.5494 130.361 77.6456 130.73C98.5595 131.155 119.784 150.019 135.771 136.529C153.143 121.869 132.572 95.2601 132.925 72.532C133.315 47.3644 158.546 19.041 137.815 4.76637C117.519 -9.20844 99.2383 14.523 74.8115 17.7723Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    {/* Icon Image */}
                    <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] flex items-center justify-center z-20">
                        <Image
                            width={60}
                            height={60}
                            src="/images/modal/deactivate-profile.png"
                            alt="Deactivate account icon"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="absolute top-[180px] left-0 right-0 bottom-[120px] flex flex-col justify-center items-center px-[30px] text-center z-5">
                        <DialogHeader className="flex flex-col items-center gap-3 w-full">
                            <DialogTitle className="text-gray-700 text-2xl font-bold leading-tight m-0">
                                Deactivate My Account
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-sm font-normal leading-relaxed m-0 max-w-[90%] text-center">
                                Please enter your password to confirm account deactivation
                            </DialogDescription>
                        </DialogHeader>

                        {/* Password Input */}
                        <div className="w-full max-w-[300px] mt-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-[#B52628] transition-colors"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex-1 h-12 bg-white border-2 border-gray-700 rounded-3xl text-gray-700 text-base font-medium cursor-pointer transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeactivate}
                            disabled={isLoading || !password.trim()}
                            className="flex-1 h-12 bg-gray-700 border-none rounded-3xl text-white text-base font-medium cursor-pointer transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                        >
                            {isLoading ? "Deactivating..." : "Deactivate Account"}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}