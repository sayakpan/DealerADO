'use client';

import SmartLink from "../utils/SmartLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const baseClasses = "sticky top-0 z-50 transition-all duration-300";
    const loginBgClasses = scrolled
        ? "bg-transparent bg-opacity-10 backdrop-blur-md shadow-md"
        : "bg-red-800";
    const defaultBgClasses = "bg-white shadow-md";

    return (
        <header className={`${baseClasses} ${isLoginPage ? loginBgClasses : defaultBgClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <SmartLink href="/" className="flex-shrink-0">
                        <Image
                            src="/images/core/logo.jpg"
                            alt="Dealer ADO Logo"
                            width={137}
                            height={70}
                            className="rounded-full hover:opacity-90 transition-opacity"
                        />
                    </SmartLink>

                    {/* Nav Links */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {["/", "/about", "/contact"].map((path, idx) => (
                            <SmartLink
                                key={path}
                                href={path}
                                className={`text-base font-medium transition-colors ${isLoginPage ? 'text-white hover:text-gray-300' : 'text-slate-800 hover:text-slate-600'}`}
                            >
                                {["Home", "About Us", "Contact Us"][idx]}
                            </SmartLink>
                        ))}

                        <div className="flex items-center gap-3">
                            <SmartLink
                                href="/login"
                                className={`w-32 h-10 px-4 border rounded-md flex justify-center items-center transition-colors ${isLoginPage ? 'bg-gray-800 border-gray-900 text-white hover:bg-gray-900' : 'bg-red-800 border-red-900 text-white'}`}
                            >
                                <span className="text-base font-semibold">Sign In</span>
                            </SmartLink>
                            <SmartLink
                                href="/login"
                                className="w-32 h-10 px-4 bg-white border border-red-700 rounded-md flex justify-center items-center hover:bg-gray-200 transition"
                            >
                                <span className="text-slate-700 text-base font-semibold">Sign Up</span>
                            </SmartLink>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}