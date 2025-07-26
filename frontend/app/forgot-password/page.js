"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FooterContent from "@/components/core/Footer1";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert("Reset link sent to your email!");
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-red-700 relative overflow-hidden">
            {/* Desktop Layout (1024px+) */}
            <div className="hidden lg:block">
                <div className="w-full max-w-[1440px] h-screen relative mx-auto bg-red-700 overflow-hidden">
                    {/* Decorative ellipses */}
                    <div className="w-60 h-60 absolute -left-[105px] -top-[50px] opacity-20 rounded-full border-[35px] border-white" />
                    <div className="w-96 h-96 absolute -left-[167px] -top-[114px] opacity-20 rounded-full border-[35px] border-white" />
                    
                    {/* Decorative stripes */}
                    <div className="w-[1551px] h-9 absolute -left-[39px] top-[495px] origin-top-left rotate-[-5.42deg] bg-white" />
                    <div className="w-[1536px] h-3.5 absolute -left-[39px] top-[551px] origin-top-left rotate-[-5.42deg] bg-white" />
                    <div className="w-[1536px] h-3.5 absolute -left-[39px] top-[574px] origin-top-left rotate-[-5.42deg] bg-slate-700" />
                    
                    {/* Logo */}
                    <Link href="/" className="absolute left-[135px] top-[15px]">
                        <Image
                            className="w-36 h-16 rounded-[50px] hover:opacity-90 transition-opacity"
                            src="/images/core/logo.jpg"
                            alt="Dealer ADO Logo"
                            width={137}
                            height={70}
                        />
                    </Link>
                    
                    {/* Navigation */}
                    <div className="absolute left-[658px] top-[25px] flex items-center gap-9">
                        <nav className="flex items-center gap-8">
                            <Link href="/" className="text-white text-lg font-medium hover:text-white/80 transition-colors">Home</Link>
                            <Link href="/about" className="text-white text-lg font-medium hover:text-white/80 transition-colors">About Us</Link>
                            <Link href="/contact" className="text-white text-lg font-medium hover:text-white/80 transition-colors">Contact Us</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="w-36 h-12 p-2.5 bg-slate-700 rounded-[10px] flex justify-center items-center hover:bg-slate-600 transition-colors">
                                <span className="text-white text-lg font-semibold">Sign in</span>
                            </Link>
                            <Link href="/signup" className="w-36 h-12 p-2.5 bg-white rounded-[10px] border border-red-700 flex justify-center items-center hover:bg-gray-100 transition-colors">
                                <span className="text-slate-700 text-lg font-semibold">Sign up</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Forgot Password heading */}
                    <div className="w-[470px] absolute left-[135px] top-[134px]">
                        <h1 className="text-7xl font-bold text-white mb-4 leading-tight">
                            Forgot<br/>Password
                        </h1>
                        <p className="text-white text-base">
                            We will sent Reset Link to the email or Phone on your Linked Device
                        </p>
                    </div>
                    
                    {/* Illustration image */}
                    <Image
                        className="w-[776px] h-80 absolute left-[313px] top-[252px]"
                        src="/images/forgot-password/grey-car.png"
                        alt="Forgot password illustration"
                        width={776}
                        height={336}
                    />
                    
                    {/* Desktop Reset form */}
                    <form onSubmit={handleSubmit} className="w-[470px] p-10 absolute left-[835px] top-[134px] bg-gray-900 rounded-[30px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                        <div className="space-y-6">
                            <div className="p-3 border-b border-stone-300">
                                <label htmlFor="desktop-email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                    Enter Email or Phone Number
                                </label>
                                <input
                                    id="desktop-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
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
                
                {/* Desktop Footer */}
                <FooterContent />
            </div>
            
            {/* Tablet Layout (768px - 1023px) */}
            <div className="hidden md:block lg:hidden">
                <div className="w-full min-h-screen bg-red-700 relative">
                    {/* Tablet Header */}
                    <header className="flex items-center justify-between px-6 py-4">
                        <Link href="/">
                            <Image 
                                src="/images/core/logo.jpg" 
                                alt="Dealer ADO Logo"
                                width={120}
                                height={60}
                                className="rounded-[40px]"
                            />
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link href="/" className="text-white hover:text-white/80 transition-colors">Home</Link>
                            <Link href="/about" className="text-white hover:text-white/80 transition-colors">About Us</Link>
                            <Link href="/contact" className="text-white hover:text-white/80 transition-colors">Contact Us</Link>
                        </nav>
                    </header>

                    {/* Tablet Main Content */}
                    <div className="px-6 py-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <h1 className="text-5xl font-bold text-white leading-tight">
                                    Forgot<br/>Password
                                </h1>
                                <p className="text-white/90 text-base leading-relaxed">
                                    We will sent Reset Link to the email or Phone on your Linked Device
                                </p>
                                <div className="relative">
                                    <Image
                                        src="/images/forgot-password/grey-car.png"
                                        alt="Forgot password illustration"
                                        width={400}
                                        height={250}
                                        className="w-full max-w-md"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <form onSubmit={handleSubmit} className="bg-gray-900 rounded-3xl p-8 w-full max-w-md shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label htmlFor="tablet-email" className="block text-zinc-500 text-xs font-normal">
                                                Enter Email or Phone Number
                                            </label>
                                            <input
                                                id="tablet-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-transparent border-0 border-b border-gray-500 rounded-none text-white text-base font-medium py-2 focus:border-white focus:outline-none"
                                                placeholder="johndoe@gmail.com"
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
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
                    </div>

                    {/* Tablet Footer */}
                    <FooterContent />
                </div>
            </div>
            
            {/* Mobile Layout (below 768px) */}
            <div className="md:hidden">
                <div className="w-full min-h-screen relative bg-gray-900">
                    {/* Mobile red background section */}
                    <div className="w-full h-96 bg-red-700 relative">
                        {/* Mobile status bar */}
                        <div className="absolute top-0 left-0 w-full h-11 flex items-center justify-between px-6 pt-3">
                            <div className="text-white text-base font-normal">9:41</div>
                            <div className="flex items-center gap-1">
                                <div className="w-5 h-3 opacity-30 rounded-sm border border-white"></div>
                                <div className="w-[1.33px] h-1 opacity-40 bg-white"></div>
                                <div className="w-2.5 h-2 bg-white rounded-sm"></div>
                            </div>
                        </div>

                        {/* Mobile decorative elements */}
                        <div className="w-44 h-44 absolute -left-16 -top-16 opacity-20 rounded-full border-[25px] border-white" />
                        <div className="w-64 h-64 absolute -left-32 -top-32 opacity-20 rounded-full border-[25px] border-white" />

                        {/* Mobile decorative stripes */}
                        <div className="w-96 h-7 absolute -left-8 top-[339px] origin-top-left rotate-[-15deg] bg-white" />
                        <div className="w-96 h-3 absolute -left-8 top-[382px] origin-top-left rotate-[-15deg] bg-white" />
                        <div className="w-96 h-3 absolute -left-8 top-[399px] origin-top-left rotate-[-15deg] bg-slate-700" />

                        {/* Mobile forgot password text */}
                        <div className="absolute left-4 top-16 w-80">
                            <h1 className="text-4xl font-bold text-white mb-4 leading-[50px]">
                                Forgot<br/>Password
                            </h1>
                            <p className="text-white text-xs leading-tight">
                                We will sent Reset Link to the email or Phone on your Linked Device
                            </p>
                        </div>

                        {/* Mobile car image */}
                        <Image
                            className="absolute left-12 top-32 w-80 h-80"
                            src="/images/forgot-password/grey-car.png"
                            alt="Forgot password illustration"
                            width={320}
                            height={320}
                        />
                    </div>

                    {/* Mobile reset form */}
                    <div className="px-4 py-8 bg-gray-900 shadow-[0px_-8px_30px_0px_rgba(34,34,34,0.25)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="p-3 border-b border-stone-300">
                                <label htmlFor="mobile-email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                    Enter Email or Phone Number
                                </label>
                                <input
                                    id="mobile-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
                            >
                                <span className="text-white text-lg font-semibold">
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </span>
                            </button>
                            <div className="text-center">
                                <span className="text-white text-sm">Don't have an account? </span>
                                <Link href="/signup" className="text-red-700 text-sm font-semibold underline hover:text-red-600 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Mobile Footer */}
                    <FooterContent />
                </div>
            </div>
        </div>
    );
}