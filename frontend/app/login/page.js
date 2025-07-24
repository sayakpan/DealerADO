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
        <div className="min-h-screen bg-red-700 relative overflow-hidden overflow-x-hidden">
            {/* Desktop Layout (1024px+) */}
            <div className="hidden lg:block">
                <div className="w-full h-screen relative mx-auto bg-red-700 overflow-hidden px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
                    {/* Decorative ellipses */}
                    <div className="w-60 h-60 absolute -left-[105px] -top-[50px] opacity-20 rounded-full border-[35px] border-white" />
                    <div className="w-96 h-96 absolute -left-[167px] -top-[114px] opacity-20 rounded-full border-[35px] border-white" />
                    
                    {/* Decorative stripes */}
                    <div className="w-[calc(100%+200px)] h-9 absolute -left-[46px] top-[481px] origin-top-left rotate-[-5.42deg] bg-white" />
                    <div className="w-[calc(100%+200px)] h-3.5 absolute -left-[46px] top-[537px] origin-top-left rotate-[-5.42deg] bg-white" />
                    <div className="w-[calc(100%+200px)] h-3.5 absolute -left-[46px] top-[560px] origin-top-left rotate-[-5.42deg] bg-slate-700" />
                    
                    {/* Car */}
                    <Image 
                        className="w-full max-w-[579px] h-auto absolute left-[377px] top-[159px]" 
                        src="/images/signin/white-car.png" 
                        alt="White sedan car"
                        width={579}
                        height={579}
                    />
                    
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
                            <div className="w-36 h-12 p-2.5 bg-slate-700 rounded-[10px] flex justify-center items-center opacity-50">
                                <span className="text-white text-lg font-semibold">Sign in</span>
                            </div>
                            <Link href="/signup" className="w-36 h-12 p-2.5 bg-white rounded-[10px] border border-red-700 flex justify-center items-center hover:bg-gray-100 transition-colors">
                                <span className="text-slate-700 text-lg font-semibold">Sign up</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Welcome text */}
                    <div className="w-[470px] absolute left-[135px] top-[134px]">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                            Welcome<br/>Back!
                        </h1>
                        <p className="text-white text-sm md:text-base lg:text-base">
                            Sign in to access your Vehicle Services history and get real-time updates on all your Services
                        </p>
                    </div>    
                
                    {/* Desktop Login form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-[470px] p-6 md:p-10 absolute left-[835px] top-[134px] bg-[#151C22] rounded-[30px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)]">
                        <div className="space-y-6">
                            <div className="p-3 border-b border-stone-300">
                                <label htmlFor="desktop-email" className="block text-zinc-500 text-xs font-normal mb-1.5">Email or Phone Number</label>
                                <input
                                    id="desktop-email"
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
                                <label htmlFor="desktop-password" className="block text-zinc-500 text-xs font-normal mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        id="desktop-password"
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
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                                className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
                            >
                                <span className="text-white text-base font-semibold">
                                    {isSubmitting ? "Signing in..." : "Sign In"}
                                </span>
                            </button>
                            <div className="text-center">
                                <span className="text-white text-sm">Don&#39;t have an account? </span>
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
                <div className="w-full min-h-screen bg-red-700 relative overflow-x-hidden px-4 md:px-8 flex flex-col justify-between">
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
                        <div className="grid md:grid-cols-2 gap-8 items-center w-full max-w-full">
                            <div className="space-y-6 w-full max-w-full">
                                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                    Welcome<br/>Back!
                                </h1>
                                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                    Sign in to access your Vehicle Services history and get real-time updates on all your Services
                                </p>
                                <div className="relative w-full max-w-md mx-auto">
                                    <Image
                                        src="/images/signin/white-car.png"
                                        alt="White sedan car"
                                        width={400}
                                        height={250}
                                        className="w-full max-w-xs h-auto mx-auto"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center w-full max-w-full">
                                <form onSubmit={handleSubmit} className="bg-gray-900 rounded-3xl p-4 md:p-8 w-full max-w-md shadow-2xl mx-auto">
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label htmlFor="tablet-email" className="block text-zinc-500 text-xs font-normal">Email or Phone Number</label>
                                            <input
                                                id="tablet-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-transparent border-0 border-b border-gray-500 rounded-none text-white text-base font-medium py-2 focus:border-white focus:outline-none"
                                                placeholder="johndoe@gmail.com"
                                                aria-label="Email or Phone Number"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="tablet-password" className="block text-zinc-500 text-xs font-normal">Password</label>
                                            <div className="relative">
                                                <input
                                                    id="tablet-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="w-full bg-transparent border-0 border-b border-gray-500 rounded-none text-white text-base font-medium py-2 pr-8 focus:border-white focus:outline-none"
                                                    placeholder="••••••••"
                                                    aria-label="Password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                                            className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
                                        >
                                            <span className="text-white text-base font-semibold">
                                                {isSubmitting ? "Signing in..." : "Sign In"}
                                            </span>
                                        </button>
                                        <div className="text-center">
                                            <span className="text-white text-sm">Don&#39;t have an account? </span>
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
                <div className="w-full min-h-screen relative bg-gray-900 overflow-x-hidden">
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

                        {/* Mobile welcome text */}
                        <div className="absolute left-4 top-16 w-80">
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 leading-[40px] xs:leading-[50px]">
                                Welcome<br/>Back!
                            </h1>
                            <p className="text-white text-xs sm:text-sm leading-tight">
                                Sign in to access your Vehicle Services history and get real-time updates on all your Services
                            </p>
                        </div>

                        {/* Mobile car image */}
                        <Image
                            className="absolute left-1/2 -translate-x-1/2 top-32 w-full max-w-xs h-auto"
                            src="/images/signin/white-car.png"
                            alt="White sedan car"
                            width={320}
                            height={320}
                        />
                    </div>

                    {/* Mobile login form */}
                    <div className="px-2 xs:px-4 py-8 bg-gray-900 shadow-[0px_-8px_30px_0px_rgba(34,34,34,0.25)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="p-3 border-b border-stone-300">
                                <label htmlFor="mobile-email" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                    Email or Phone Number
                                </label>
                                <input
                                    id="mobile-email"
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
                                <label htmlFor="mobile-password" className="block text-zinc-500 text-xs font-normal mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="mobile-password"
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
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                                className="w-full h-12 bg-red-700 rounded-2xl shadow-lg flex items-center justify-center hover:bg-red-800 transition-colors disabled:opacity-50"
                            >
                                <span className="text-white text-lg font-semibold">
                                    {isSubmitting ? "Signing in..." : "Sign in"}
                                </span>
                            </button>
                            <div className="text-center">
                                <span className="text-white text-sm">Don&#39;t have an account? </span>
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