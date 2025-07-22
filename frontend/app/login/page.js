"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            alert("Login successful!");
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-red-700 relative overflow-hidden">
            {/* Desktop Layout */}
            <div className="hidden lg:block w-[1440px] h-[1110px] relative mx-auto bg-red-700 overflow-hidden">
            {/* Decorative ellipses */}
            <div className="w-60 h-60 left-[-105.46px] top-[-50px] absolute opacity-20 rounded-full border-[35px] border-white" />
            <div className="w-96 h-96 left-[-167.46px] top-[-114px] absolute opacity-20 rounded-full border-[35px] border-white" />
            
            {/* Decorative stripes */}
            <div className="w-[1551.53px] h-9 left-[-46px] top-[481.50px] absolute origin-top-left rotate-[-5.42deg] bg-white" />
            <div className="w-[1536.10px] h-3.5 left-[-46px] top-[537.36px] absolute origin-top-left rotate-[-5.42deg] bg-white" />
            <div className="w-[1536.10px] h-3.5 left-[-46px] top-[559.83px] absolute origin-top-left rotate-[-5.42deg] bg-slate-700" />
            
            {/* Car shadow */}
            <div className="w-6 h-4 left-[712.37px] top-[590.68px] absolute bg-black" />
            
            {/* Car image */}
            <Image 
                className="w-[579px] h-[579px] left-[376.62px] top-[159px] absolute" 
                src="/images/signin/white-car.png" 
                alt="White sedan car"
                width={579}
                height={579}
            />
            
            {/* Main logo - clickable */}
            <Link href="/" className="absolute left-[135px] top-[15px]">
                <Image 
                    className="w-36 h-16 rounded-[50px] hover:opacity-90 transition-opacity cursor-pointer" 
                    src="/images/core/logo.jpg" 
                    alt="Dealer ADO Logo"
                    width={137}
                    height={70}
                />
            </Link>
            
            {/* Navigation - clickable */}
            <div className="left-[658px] top-[25px] absolute inline-flex justify-start items-center gap-9">
                <nav className="flex items-center gap-8">
                    <Link href="/" className="text-white text-lg font-medium hover:text-white/80 transition-colors cursor-pointer">
                        Home
                    </Link>
                    <Link href="/about" className="text-white text-lg font-medium hover:text-white/80 transition-colors cursor-pointer">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-white text-lg font-medium hover:text-white/80 transition-colors cursor-pointer">
                        Contact Us
                    </Link>
                </nav>
                <div className="flex justify-start items-start gap-3">
                    <div className="w-36 h-12 p-2.5 bg-slate-700 rounded-[10px] flex justify-center items-center gap-2.5 opacity-50 cursor-not-allowed">
                        <div className="justify-end text-white text-lg font-semibold font-['Plus_Jakarta_Sans'] capitalize">Sign in</div>
                    </div>
                    <Link href="/signup" className="w-36 h-12 p-2.5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-red-700 flex justify-center items-center gap-2.5 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="justify-end text-slate-700 text-lg font-semibold font-['Plus_Jakarta_Sans'] capitalize">Sign up</div>
                    </Link>
                </div>
            </div>
            
            {/* Welcome text */}
            <div className="w-[470px] left-[135px] top-[134px] absolute inline-flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch justify-start">
                    <span className="text-white text-7xl font-bold font-['Plus_Jakarta_Sans']">Welcome <br/></span>
                    <span className="text-white text-7xl font-normal font-['Plus_Jakarta_Sans']">Back!</span>
                </div>
                <div className="self-stretch justify-start text-white text-base font-normal font-['Plus_Jakarta_Sans']">
                    Sign in to access your Vehicle Services history and get real-time updates on all your Services
                </div>
            </div>
            
            {/* Login form - functional */}
            <form onSubmit={handleSubmit} className="w-[470px] p-10 left-[835px] top-[134px] absolute bg-gray-900 rounded-[30px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-start items-center gap-10">
                <div className="self-stretch flex flex-col justify-center items-end gap-6">
                    <div className="self-stretch flex flex-col justify-start items-end gap-4">
                        <div className="self-stretch p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-1.5">
                            <label htmlFor="email" className="justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">
                                Email or Phone Number
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium font-['Plus_Jakarta_Sans'] placeholder:text-gray-400"
                                placeholder="johndoe@gmail.com"
                            />
                        </div>
                        <div className="self-stretch p-3 border-b border-stone-300 inline-flex justify-between items-end">
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                                <label htmlFor="password" className="self-stretch justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">
                                    Password
                                </label>
                                <div className="relative w-full">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium font-['Plus_Jakarta_Sans'] pr-8"
                                        placeholder="••••••••"
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
                        </div>
                        <div className="self-stretch text-right justify-start">
                            <Link href="/forgot-password" className="text-white text-sm font-normal font-['Plus_Jakarta_Sans'] leading-none hover:text-gray-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="self-stretch h-12 p-2.5 bg-red-700 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] inline-flex justify-center items-center gap-2.5 hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="justify-end text-white text-base font-semibold font-['Plus_Jakarta_Sans'] capitalize">
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </div>
                    </button>
                </div>
                <div className="self-stretch text-center justify-start">
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans']">Don't have an account ?  </span>
                    <Link href="/signup" className="text-red-700 text-sm font-semibold font-['Plus_Jakarta_Sans'] underline hover:text-red-600 transition-colors">
                        Sign Up
                    </Link>
                </div>
            </form>
            
            {/* Footer */}
            <div className="w-[1440px] h-[522px] left-0 top-[588px] absolute bg-gray-900 overflow-hidden">
                <Image 
                    className="w-[1387px] h-[650px] left-[122px] top-[50px] absolute opacity-20" 
                    src="/images/core/footer-smoke.png" 
                    alt="Footer smoke effect"
                    width={1387}
                    height={650}
                />
                <Image 
                    className="w-[1387px] h-[650px] left-[729px] top-[680px] absolute origin-top-left rotate-180 opacity-20" 
                    src="/images/core/footer-smoke.png" 
                    alt="Footer smoke effect"
                    width={1387}
                    height={650}
                />
                <Image 
                    className="w-[1197px] h-[568px] left-[122px] top-[355px] absolute" 
                    src="/images/core/footer-car.png" 
                    alt="Red sports car"
                    width={1197}
                    height={568}
                />
                <Image 
                    className="w-28 h-14 left-[662px] top-[50px] absolute rounded-[50px]" 
                    src="/images/core/logo.jpg" 
                    alt="Dealer ADO Logo"
                    width={117}
                    height={60}
                />
                {/* Footer navigation - clickable */}
                <nav className="left-[572px] top-[200px] absolute flex items-center gap-12">
                    <Link href="/" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">
                        Contact Us
                    </Link>
                </nav>
                
                {/* Social media links - clickable */}
                <div className="left-[656px] top-[253px] absolute inline-flex justify-start items-start gap-3">
                    <a 
                        href="https://instagram.com/dealerado" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 text-gray-900 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a 
                        href="https://facebook.com/dealerado" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 text-gray-900 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a 
                        href="https://twitter.com/dealerado" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <span className="text-gray-900 font-bold text-lg">X</span>
                    </a>
                </div>
                
                <div className="left-[1033px] top-[358px] absolute justify-start">
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">© 2024  </span>
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans']">Dealer ADO, </span>
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">All Rights Reserved.</span>
                </div>
                
                {/* Footer legal links - clickable */}
                <div className="left-[135px] top-[358px] absolute flex items-center gap-8">
                    <Link href="/privacy" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
                        Terms & Condition
                    </Link>
                </div>
                <div className="w-[1170px] h-0 left-[135px] top-[328px] absolute outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                <div className="w-96 left-[520px] top-[130px] absolute opacity-80 text-center justify-start text-white text-xs font-normal font-['Plus_Jakarta_Sans'] leading-tight">Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce porttitor sed posuere</div>
            </div>
            </div>

            {/* Mobile Layout - Exact specifications from your HTML */}
            <div className="lg:hidden w-96 h-[1292px] relative bg-gray-900 overflow-hidden">
                {/* Mobile red background section */}
                <div className="w-96 h-96 left-0 top-0 absolute bg-red-700" />
                
                {/* Mobile status bar */}
                <div className="w-96 h-11 left-0 top-0 absolute bg-white/0" />
                <div className="w-5 h-3 left-[334.33px] top-[17.30px] absolute opacity-30 rounded-sm outline outline-1 outline-offset-[-0.50px] outline-white" />
                <div className="w-[1.33px] h-1 left-[357.33px] top-[21.18px] absolute opacity-40 bg-white" />
                <div className="w-2.5 h-2 left-[336.33px] top-[19.06px] absolute bg-white rounded-sm" />
                <div className="w-11 h-5 left-[25px] top-[13.77px] absolute justify-end text-white text-base font-normal font-['SF_Pro_Text']">9:41</div>
                
                {/* Mobile decorative elements */}
                <div className="w-44 h-44 left-[-72.10px] top-[-67.65px] absolute opacity-20 rounded-full border-[25px] border-white" />
                <div className="w-64 h-64 left-[-117px] top-[-114px] absolute opacity-20 rounded-full border-[25px] border-white" />
                
                {/* Mobile decorative stripes */}
                <div className="w-96 h-7 left-[-32px] top-[338.99px] absolute origin-top-left rotate-[-15deg] bg-white" />
                <div className="w-96 h-3 left-[-32px] top-[382.35px] absolute origin-top-left rotate-[-15deg] bg-white" />
                <div className="w-96 h-3 left-[-32px] top-[399.35px] absolute origin-top-left rotate-[-15deg] bg-slate-700" />
                
                {/* Mobile car shadow */}
                <div className="w-5 h-3 left-[306.99px] top-[448.56px] absolute bg-black" />
                
                {/* Mobile car image */}
                <Image 
                    className="w-96 h-96 left-[53px] top-[122px] absolute" 
                    src="/images/signin/white-car.png" 
                    alt="White sedan car"
                    width={384}
                    height={384}
                />
                
                {/* Mobile welcome text */}
                <div className="w-80 left-[16px] top-[72px] absolute inline-flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch justify-start">
                        <span className="text-white text-4xl font-bold font-['Plus_Jakarta_Sans'] leading-[50px]">Welcome <br/></span>
                        <span className="text-white text-4xl font-normal font-['Plus_Jakarta_Sans'] leading-[50px]">Back!</span>
                    </div>
                    <div className="self-stretch justify-start text-white text-xs font-normal font-['Plus_Jakarta_Sans'] capitalize leading-none">
                        Sign in to access your Vehicle Services history and get real-time updates on all your Services
                    </div>
                </div>
                
                {/* Mobile login form - functional */}
                <form onSubmit={handleSubmit} className="w-96 px-4 pb-8 left-0 top-[465px] absolute shadow-[0px_-8px_30px_0px_rgba(34,34,34,0.25)] inline-flex flex-col justify-start items-center gap-10">
                    <div className="self-stretch flex flex-col justify-center items-end gap-6">
                        <div className="self-stretch flex flex-col justify-start items-end gap-4">
                            <div className="self-stretch p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-1.5">
                                <label htmlFor="mobile-email" className="justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">
                                    Email or Phone Number
                                </label>
                                <input
                                    id="mobile-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium font-['Plus_Jakarta_Sans'] placeholder:text-gray-400"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                            <div className="self-stretch p-3 border-b border-stone-300 inline-flex justify-between items-end">
                                <div className="w-20 inline-flex flex-col justify-start items-start gap-1.5">
                                    <label htmlFor="mobile-password" className="self-stretch justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">
                                        Password
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            id="mobile-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-transparent border-0 outline-0 text-white text-base font-medium font-['Plus_Jakarta_Sans'] pr-8"
                                            placeholder="••••••••"
                                        />
                                        {!showPassword && (
                                            <div className="self-stretch h-5 inline-flex justify-center items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="self-stretch text-right justify-start">
                                <Link href="/forgot-password" className="text-white text-sm font-normal font-['Plus_Jakarta_Sans'] leading-none hover:text-gray-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="self-stretch h-12 p-2.5 bg-red-700 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] inline-flex justify-center items-center gap-2.5 hover:bg-red-800 transition-colors disabled:opacity-50"
                        >
                            <div className="justify-end text-white text-lg font-semibold font-['Plus_Jakarta_Sans'] capitalize">
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </div>
                        </button>
                    </div>
                    <div className="self-stretch text-center justify-start">
                        <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans']">Don't have an account ?  </span>
                        <Link href="/signup" className="text-red-700 text-sm font-semibold font-['Plus_Jakarta_Sans'] underline hover:text-red-600 transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </form>
                
                {/* Mobile footer */}
                <div className="w-96 h-[568px] left-0 top-[812px] absolute bg-gray-900 overflow-hidden">
                    <Image 
                        className="w-96 h-48 left-[18.28px] top-[314.74px] absolute opacity-20" 
                        src="/images/core/footer-smoke.png" 
                        alt="Footer smoke effect"
                        width={384}
                        height={192}
                    />
                    <Image 
                        className="w-96 h-48 left-[194.38px] top-[497.50px] absolute origin-top-left rotate-180 opacity-20" 
                        src="/images/core/footer-smoke.png" 
                        alt="Footer smoke effect"
                        width={384}
                        height={192}
                    />
                    <Image 
                        className="w-80 h-40 left-[18.28px] top-[403.22px] absolute" 
                        src="/images/core/footer-car.png" 
                        alt="Red sports car"
                        width={320}
                        height={160}
                    />
                    <Image 
                        className="w-20 h-10 left-[149px] top-[40px] absolute rounded-[33.33px]" 
                        src="/images/core/logo.jpg" 
                        alt="Dealer ADO Logo"
                        width={78}
                        height={40}
                    />
                    <div className="w-80 left-[16px] top-[94px] absolute opacity-80 text-center justify-start text-white text-xs font-normal font-['Plus_Jakarta_Sans'] leading-none">
                        Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius
                    </div>
                    <nav className="left-[145px] top-[150px] absolute text-center justify-start text-white text-base font-medium font-['Plus_Jakarta_Sans'] leading-loose">
                        <Link href="/" className="block hover:text-gray-300 transition-colors">Home</Link>
                        <Link href="/about" className="block hover:text-gray-300 transition-colors">About Us</Link>
                        <Link href="/contact" className="block hover:text-gray-300 transition-colors">Contact Us</Link>
                    </nav>
                    <div className="left-[138px] top-[263px] absolute inline-flex justify-start items-start gap-2">
                        <a href="https://instagram.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-slate-700 text-sm">📷</span>
                        </a>
                        <a href="https://facebook.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-slate-700 text-sm font-bold">f</span>
                        </a>
                        <a href="https://twitter.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-slate-700 text-sm font-bold">X</span>
                        </a>
                    </div>
                    <div className="w-80 h-0 left-[16px] top-[321px] absolute outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                    <div className="left-[71px] top-[376px] absolute justify-start">
                        <span className="text-white text-xs font-medium font-['Plus_Jakarta_Sans'] capitalize">© 2024  </span>
                        <span className="text-white text-xs font-medium font-['Plus_Jakarta_Sans']">Dealer ADO, </span>
                        <span className="text-white text-xs font-medium font-['Plus_Jakarta_Sans'] capitalize">All Rights Reserved.</span>
                    </div>
                    <div className="left-[86px] top-[341px] absolute inline-flex justify-start items-center gap-5">
                        <Link href="/privacy" className="text-white text-xs font-medium hover:text-gray-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-white text-xs font-medium hover:text-gray-300 transition-colors">
                            Terms & Condition
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}