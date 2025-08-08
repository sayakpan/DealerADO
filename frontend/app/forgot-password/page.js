"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserNotExistModal from "@/components/ui/user-not-exist-modal";
import ResetLinkSentModal from "@/components/ui/reset-link-sent-modal";
import { forgotPassword } from "@/lib/auth";

// import Header from "@/components/core/header";
// import FooterContent from "@/components/core/footer";
// import FooterContent from "@/components/core/Footer1";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showUserNotExistModal, setShowUserNotExistModal] = useState(false);
    const [showResetLinkSentModal, setShowResetLinkSentModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await forgotPassword({ email });

            if (response.success) {
                // Reset link sent successfully
                setShowResetLinkSentModal(true);
            } else {
                // Handle different error cases
                if (response.status === 404 || response.message?.toLowerCase().includes('user') || response.message?.toLowerCase().includes('not found')) {
                    // User doesn't exist
                    setShowUserNotExistModal(true);
                } else {
                    // Other errors - still show user not exist modal for security
                    setShowUserNotExistModal(true);
                }
            }

        } catch (error) {
            console.error('Forgot password error:', error);
            setShowUserNotExistModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetry = () => {
        // Clear the email field or keep it for retry
        // setEmail(''); // Uncomment if you want to clear the field
    };

    const handleOkay = () => {
        // Optionally redirect to login page or clear form
        // window.location.href = '/login';
    };

    return (
        <div className="bg-red-700 relative overflow-hidden">
            {/* Single Responsive Layout */}
            <div className="w-full pt-20 h-[800px] sm:h-[1050px] lg:h-[540px] lg:min-h-[590px] relative bg-red-700 overflow-hidden">

                {/* Decorative ellipses - Responsive positioning */}
                <div className="w-[240px] max-w-[240px] aspect-square absolute -left-[105px] -top-[50px] opacity-20 rounded-full border-[25px] border-[35px] border-white" />
                <div className="w-[366px] max-w-[366px] aspect-square absolute -left-[167px] -top-[114px] opacity-20 rounded-full border-[25px] border-[35px] border-white" />

                {/* Decorative stripes - Responsive positioning */}
                <div className="w-[120%] h-[2%] h-[26px] md:h-[36px] absolute -left-[3%] sm:-left-[46px] top-[360px] md:top-[406px] lg:top-[526px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] h-[18px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[392px] md:top-[456px] lg:top-[577px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] h-[10px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[416px] md:top-[480px] lg:top-[600px] origin-top-left rotate-[-6.42deg] bg-slate-700" />

                {/* Navigation Header - Responsive */}
                {/* <Header currentPage="forgot-password" /> */}

                {/* Main Content Area - Responsive layout */}
                <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between px-[5%] sm:px-[8%] lg:px-[135px] lg:pt-[90px] gap-8 lg:gap-12 relative z-10">
                    {/* Welcome Section - Responsive content */}
                    <div className="w-full lg:w-[470px] text-left lg:absolute lg:left-[40px] xl:left-[85px] lg:top-[90px]">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Forgot<br />Password
                        </h1>
                        <p className="text-white text-sm sm:text-base lg:text-base mb-6 lg:mb-0 leading-relaxed">
                            We will sent Reset Link To The Email Or Phone On Your Linked Device
                        </p>
                    </div>

                    {/* Reset Form - Responsive form */}
                    <div className="w-full lg:w-[470px] sm:max-w-[470px] absolute right-0 sm:right-[calc(50%-235px)] lg:right-[40px] xl:right-[80px] top-[338px] sm:top-[380px] md:top-[370px] lg:top-[40px] xl:top-[40px]">
                        <form onSubmit={handleSubmit} className="bg-[#151C22] h-[400px] sm:rounded-[30px] sm:rounded-t-[30px] lg:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                            <div className="space-y-6">
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Enter Email or Phone Number
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium"
                                        placeholder="johndoe@gmail.com"
                                        aria-label="Email or Phone Number"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 sm:h-[50px] bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50 min-h-[44px]"
                                    aria-label={isSubmitting ? "Sending reset link..." : "Send Reset Link"}
                                >
                                    <span className="text-white text-base font-semibold">
                                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                                    </span>
                                </button>
                                <div className="text-center">
                                    <span className="text-white text-sm">Don't have an account? </span>
                                    <Link href="/signup" className="text-red-700 text-sm font-semibold underline hover:text-red-600 transition-colors">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Car Image - Desktop only, positioned behind content */}
                <div className="block absolute right-[calc(50%-289px)] lg:right-[435px] sm:top-[220px] lg:top-[350px] xl:top-[340px] w-[410px] sm:w-[579px] md:max-w-[579px] z-0">
                    <Image
                        src="/images/forgot-password/grey-car.png"
                        alt="Grey sedan car"
                        width={579}
                        height={579}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Footer */}
            {/* <FooterContent /> */}

            {/* User Not Exist Modal */}
            <UserNotExistModal
                open={showUserNotExistModal}
                onOpenChange={setShowUserNotExistModal}
                onRetry={handleRetry}
            />

            {/* Reset Link Sent Modal */}
            <ResetLinkSentModal
                open={showResetLinkSentModal}
                onOpenChange={setShowResetLinkSentModal}
                onOkay={handleOkay}
            />
        </div>
    );
}