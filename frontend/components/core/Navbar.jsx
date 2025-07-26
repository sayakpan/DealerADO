'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SmartLink from "../utils/SmartLink";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

export default function Navbar() {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
    ];

    const textColor = isLoginPage ? "text-white hover:text-gray-300" : "text-slate-800 hover:text-slate-600";

    return (
        <header className={`${baseClasses} ${isLoginPage ? loginBgClasses : defaultBgClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-10 lg:px-20 xl:px-0">
                <div className="flex items-center justify-between h-14 md:h-20">

                    {/* Logo */}
                    <SmartLink href="/" className="flex-shrink-0">
                        <div className="relative w-28 h-12 sm:w-32 sm:h-14 md:w-36 md:h-16">
                            <Image
                                src="/images/core/logo.jpg"
                                alt="Dealer ADO Logo"
                                fill
                                className="rounded-full object-contain hover:opacity-90 transition-opacity"
                                priority
                            />
                        </div>
                    </SmartLink>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
                        {navLinks.map((item) => (
                            <SmartLink
                                key={item.href}
                                href={item.href}
                                className={`text-base font-medium transition-colors ${textColor}`}
                            >
                                {item.label}
                            </SmartLink>
                        ))}
                        <div className="flex items-center gap-3">
                            <SmartLink
                                href="/login"
                                className={`w-32 h-10 px-4 border rounded-md flex justify-center items-center transition-colors ${isLoginPage
                                        ? 'bg-gray-800 border-gray-900 text-white hover:bg-gray-900'
                                        : 'bg-red-800 border-red-800 text-white hover:bg-red-700'
                                    }`}
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

                    {/* Hamburger Icon */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2"
                    >
                        {menuOpen ? <X className={`w-6 h-6 ${isLoginPage ? 'text-white' : 'text-black'}`} /> : <Menu className={`w-6 h-6 ${isLoginPage ? 'text-white' : 'text-black'}`} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <div className="flex flex-col items-start px-6 gap-6 mt-4">
                    {navLinks.map((item) => (
                        <SmartLink
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-lg font-medium text-slate-800 hover:text-red-600 transition-colors"
                        >
                            {item.label}
                        </SmartLink>
                    ))}
                    <div className="w-full flex flex-col items-center gap-2">

                        <SmartLink
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="w-full text-center py-2 px-4 bg-red-800 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Sign In
                        </SmartLink>
                        <SmartLink
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="w-full text-center py-2 px-4 border border-red-700 text-slate-800 rounded-md hover:bg-gray-100 transition"
                        >
                            Sign Up
                        </SmartLink>
                    </div>
                </div>
            </div>
        </header>
    );
}