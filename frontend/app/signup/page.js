"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/core/header";
import FooterContent from "@/components/core/footer";

export default function SignupPage() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [password, setPassword] = useState("password123");
    const [confirmPassword, setConfirmPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert("Account created successfully!");
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-red-700 relative overflow-hidden">
            {/* Single Responsive Layout */}
            <div className="w-full h-[945px] sm:h-[1000px] md:h-[1160px] lg:h-[650px] lg:min-h-[680px] relative bg-red-700 overflow-hidden">

                {/* Decorative ellipses - Responsive positioning */}
                <div className="w-[240px] max-w-[240px] aspect-square absolute -left-[105px] -top-[50px] opacity-20 rounded-full border-[25px] border-[35px] border-white" />
                <div className="w-[366px] max-w-[366px] aspect-square absolute -left-[167px] -top-[114px] opacity-20 rounded-full border-[25px] border-[35px] border-white" />

                {/* Decorative stripes - Responsive positioning */}
                <div className="w-[120%] h-[2%] h-[26px] md:h-[36px] absolute -left-[3%] sm:-left-[46px] top-[360px] md:top-[406px] lg:top-[536px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] h-[18px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[392px] md:top-[456px] lg:top-[587px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] h-[10px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[416px] md:top-[480px] lg:top-[610px] origin-top-left rotate-[-6.42deg] bg-slate-700" />

                {/* Navigation Header - Responsive */}
                <Header currentPage="signup" />

                {/* Main Content Area - Responsive layout */}
                <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between px-[5%] sm:px-[8%] lg:px-[135px] lg:pt-[100px] gap-8 lg:gap-12 relative z-10">
                    {/* Welcome Section - Responsive content */}
                    <div className="w-full lg:w-[580px] text-left lg:absolute lg:left-[40px] xl:left-[115px] lg:top-[40px]">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Getting Started<br />With Dealer ADO!
                        </h1>
                        <p className="text-white text-sm sm:text-base lg:text-base mb-6 lg:mb-0 leading-relaxed">
                            By signing up, you will get the benefit of all our services
                        </p>
                    </div>

                    {/* Signup Form - Responsive form */}
                    <div className="w-full lg:w-[470px] sm:max-w-[470px] absolute right-0 sm:right-[calc(50%-235px)] lg:right-[40px] xl:right-[80px] top-[360px] sm:top-[350px] md:top-[465px] lg:top-[0px] xl:-top-[10px]">
                        <form onSubmit={handleSubmit} className="bg-[#151C22] sm:rounded-[30px] sm:rounded-t-[30px] lg:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                            <div className="space-y-6">
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="name" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium"
                                        placeholder="John Doe"
                                        aria-label="Name"
                                    />
                                </div>
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Email or Phone Number
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
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="password" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium pr-8"
                                            placeholder="••••••••"
                                            aria-label="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="confirmPassword" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium pr-8"
                                            placeholder="••••••••"
                                            aria-label="Confirm Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 sm:h-[50px] bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50 min-h-[44px]"
                                    aria-label={isSubmitting ? "Creating account..." : "Sign Up"}
                                >
                                    <span className="text-white text-base font-semibold">
                                        {isSubmitting ? "Creating..." : "Sign Up"}
                                    </span>
                                </button>
                                <div className="text-center">
                                    <span className="text-white text-sm">Already have an account? </span>
                                    <Link href="/login" className="text-red-700 text-sm font-semibold underline hover:text-red-600 transition-colors">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Car Image - Desktop only, positioned behind content */}
                <div className="block absolute right-[calc(50%-289px)] lg:right-[435px] top-[230px] lg:top-[340px] xl:top-[320px] w-[410px] md:w-[579px] md:max-w-[579px] z-0">
                    <Image
                        src="/images/signup/sign-up-car.png"
                        alt="Silver sedan car"
                        width={579}
                        height={579}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Footer */}
            <FooterContent />
        </div>
    );
}