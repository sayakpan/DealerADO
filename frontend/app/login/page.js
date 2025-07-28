"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/auth";
import { toast } from "@/plugin/toast";
import { validateFields, validators } from "@/utils/validations";
// import FooterContent from "@/components/core/Footer";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validationRules = {
        email: [validators.required, validators.email],
        password: [validators.required, validators.minLength(6)]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFields({ email, password }, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            const response = await login({ user_email: email, password: password });
            if (response.success) {
                window.location.href = "/categories";
            } else {
                toast.error(response.message || "Login failed");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during login");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-red-800 relative overflow-hidden">
            {/* Single Responsive Layout */}
            <div className="w-full pt-20 h-[800px] sm:h-[1050px] lg:h-[650px] lg:min-h-[630px] relative bg-red-800 overflow-hidden">

                {/* Decorative ellipses - Responsive positioning */}
                <div className="w-[240px] max-w-[240px] aspect-square absolute -left-[105px] -top-[50px] opacity-20 rounded-full border-[25px] md:border-[35px] border-white" />
                <div className="w-[366px] max-w-[366px] aspect-square absolute -left-[167px] -top-[114px] opacity-20 rounded-full border-[25px] md:border-[35px] border-white" />

                {/* Decorative stripes - Responsive positioning */}
                <div className="w-[120%] h-[2%] sm:h-[26px] md:h-[36px] absolute -left-[3%] sm:-left-[46px] top-[360px] md:top-[406px] lg:top-[526px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] sm:h-[18px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[392px] md:top-[456px] lg:top-[577px] origin-top-left rotate-[-6.42deg] bg-white" />
                <div className="w-[120%] h-[1%] sm:h-[10px] md:h-[14px] absolute -left-[3%] sm:-left-[46px] top-[416px] md:top-[480px] lg:top-[600px] origin-top-left rotate-[-6.42deg] bg-slate-700" />

                {/* Navigation Header - Responsive */}
                {/* <Header currentPage="login" /> */}

                {/* Main Content Area - Responsive layout */}
                <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between px-[5%] sm:px-[8%] lg:px-[135px] lg:pt-[90px] gap-8 lg:gap-12 relative z-10">
                    {/* Welcome Section - Responsive content */}
                    <div className="w-full lg:w-[470px] text-left lg:absolute lg:left-[40px] xl:left-[85px] lg:top-[80px]">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Welcome<br />Back!
                        </h1>
                        <p className="text-white text-sm sm:text-base lg:text-base mb-6 lg:mb-0 leading-relaxed">
                            Sign in to access your Vehicle Services history and get real-time updates on all your Services
                        </p>
                    </div>

                    {/* Login Form - Responsive form */}
                    <div className="w-full lg:w-[470px] sm:max-w-[470px] absolute right-0 sm:right-[calc(50%-235px)] lg:right-[40px] xl:right-[80px] top-[360px] sm:top-[350px] md:top-[465px] lg:top-[40px]">
                        <form onSubmit={handleSubmit} className="bg-[#151C22] sm:rounded-[30px] sm:rounded-t-[30px] lg:rounded-[30px] p-6 sm:p-8 lg:p-10 shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                            <div className="space-y-6">
                                <div className="p-3 border-b border-stone-300">
                                    <label htmlFor="email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                        Email or Phone Number
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium"
                                        placeholder="johndoe@gmail.com"
                                        aria-label="Email or Phone Number"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
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
                <div className="block absolute right-[calc(50%-289px)] lg:right-[435px] top-[130px] lg:top-[210px] xl:top-[190px] w-[410px] md:w-[579px] md:max-w-[579px] z-0">
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
            {/* <FooterContent /> */}
        </div>
    );
}