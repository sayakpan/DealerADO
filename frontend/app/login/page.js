"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FooterContent from "@/components/core/footer";

export default function LoginPage() {
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert("Login successful!");
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-red-700 relative overflow-hidden">
            {/* Single Responsive Layout */}
            <div className="w-full h-[650px] lg:min-h-[630px] relative bg-red-700 overflow-hidden">
                {/* Mobile Status Bar - Only visible on mobile */}
                <div className="md:hidden flex items-center justify-between px-6 pt-3 pb-2 relative z-20">
                    <div className="text-white text-base font-normal">9:41</div>
                    <div className="flex items-center gap-1">
                        <div className="w-5 h-3 opacity-30 rounded-sm border border-white"></div>
                        <div className="w-[1.33px] h-1 opacity-40 bg-white"></div>
                        <div className="w-2.5 h-2 bg-white rounded-sm"></div>
                    </div>
                </div>

                {/* Decorative ellipses - Responsive positioning */}
                <div className="w-[15%] sm:w-[12%] lg:w-[240px] max-w-[240px] aspect-square absolute -left-[8%] sm:-left-[105px] -top-[10%] sm:-top-[50px] opacity-20 rounded-full border-[25px] sm:border-[35px] border-white" />
                <div className="w-[20%] sm:w-[16%] lg:w-[366px] max-w-[366px] aspect-square absolute -left-[12%] sm:-left-[167px] -top-[8%] sm:-top-[114px] opacity-20 rounded-full border-[25px] sm:border-[35px] border-white" />
                
                {/* Decorative stripes - Responsive positioning */}
                <div className="w-[120%] h-[2%] sm:h-[1.5%] lg:h-[36px] absolute -left-[3%] sm:-left-[46px] top-[60%] sm:top-[75%] lg:top-[526px] origin-top-left rotate-[-15deg] sm:rotate-[-5.42deg] bg-white" />
                <div className="w-[120%] h-[1%] sm:h-[0.8%] lg:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[65%] sm:top-[82%] lg:top-[577px] origin-top-left rotate-[-15deg] sm:rotate-[-5.42deg] bg-white" />
                <div className="w-[120%] h-[1%] sm:h-[0.8%] lg:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[67%] sm:top-[85%] lg:top-[600px] origin-top-left rotate-[-15deg] sm:rotate-[-5.42deg] bg-slate-700" />
                
                {/* Navigation Header - Responsive */}
                <header className="flex flex-col sm:flex-row justify-between items-between sm:items-center left-[40px] pt-[3%] sm:pt-[15px] pb-[3%] gap-4 relative z-10">
                    {/* Logo - Fixed size for brand consistency */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            className="w-[100px] sm:w-[120px] lg:w-[137px] h-auto rounded-[50px] hover:opacity-90 transition-opacity"
                            src="/images/core/logo.jpg"
                            alt="Dealer ADO Logo"
                            width={137}
                            height={70}
                        />
                    </Link>
                    
                    {/* Navigation Menu - Responsive layout */}
                    <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-9 w-full sm:w-auto absolute pr-[40px] lg-pr-0 lg:right-[40px] xl:right-[80px] lg:top-[25px]">
                        <nav className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
                            <Link href="/" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">Home</Link>
                            <Link href="/about" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">About Us</Link>
                            <Link href="/contact" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">Contact Us</Link>
                        </nav>
                        
                        {/* Auth buttons - Responsive sizing */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-slate-700 rounded-[10px] opacity-50 min-w-[100px] sm:min-w-[120px] lg:min-w-[144px]">
                                <span className="text-white text-sm sm:text-base lg:text-lg font-semibold text-center block">Sign in</span>
                            </div>
                            <Link href="/signup" className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white rounded-[10px] border border-red-700 hover:bg-gray-100 transition-colors min-w-[100px] sm:min-w-[120px] lg:min-w-[144px]">
                                <span className="text-slate-700 text-sm sm:text-base lg:text-lg font-semibold text-center block">Sign up</span>
                            </Link>
                        </div>
                    </div>
                </header>
                
                {/* Main Content Area - Responsive layout */}
                <div className="flex flex-col lg:flex-row items-center justify-between px-[5%] sm:px-[8%] lg:px-[135px] pt-[2%] sm:pt-[5%] lg:pt-[90px] gap-8 lg:gap-12 relative z-10">
                    {/* Welcome Section - Responsive content */}
                    <div className="w-full lg:w-[470px] text-center lg:text-left lg:absolute lg:left-[40px] xl:left-[85px] lg:top-[40px]">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Welcome<br/>Back!
                        </h1>
                        <p className="text-white text-sm sm:text-base lg:text-base mb-6 lg:mb-0 leading-relaxed">
                            Sign in to access your Vehicle Services history and get real-time updates on all your Services
                        </p>
                        
                        {/* Car Image - Mobile/Tablet only */}
                        <div className="lg:hidden mt-8 flex justify-center">
                            <Image
                                src="/images/signin/white-car.png"
                                alt="White sedan car"
                                width={320}
                                height={320}
                                className="w-full max-w-[280px] sm:max-w-[320px] h-auto"
                            />
                        </div>
                    </div>
                    
                    {/* Login Form - Responsive form */}
                    <div className="w-full lg:w-[470px] max-w-[470px] lg:absolute lg:right-[40px] xl:right-[80px] lg:top-[40px]">
                        <form onSubmit={handleSubmit} className="bg-[#151C22] rounded-[30px] sm:rounded-t-[30px] lg:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                            <div className="space-y-6">
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
                                <div className="text-right">
                                    <Link href="/forgot-password" className="text-white text-sm hover:text-gray-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 sm:h-[50px] bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50 min-h-[44px]"
                                    aria-label={isSubmitting ? "Signing in..." : "Sign In"}
                                >
                                    <span className="text-white text-base font-semibold">
                                        {isSubmitting ? "Signing in..." : "Sign In"}
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
                <div className="hidden lg:block absolute right-[435px] lg:top-[210px] xl:top-[190px] w-[579px] max-w-[579px] z-0">
                    <Image
                        src="/images/signin/white-car.png"
                        alt="White sedan car"
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