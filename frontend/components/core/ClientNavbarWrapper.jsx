'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SmartLink from "../utils/SmartLink";
import { ChevronDown, Headset, Home, Info, Menu, X, User, RefreshCcw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Wallet, Settings, LogOut, History } from "lucide-react";
import { ChevronRight } from "lucide-react";
import LogoutModal from "@/components/ui/logout-modal";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { getWalletBalance } from "@/services/wallet";
import WalletLogo from "@/public/images/wallet/logo.png";

export default function ClientNavbarWrapper({ isAuthenticated, user, navLinks }) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);
    const [loadingBalance, setLoadingBalance] = useState(false);

    const fixedNavPathList = ['/login', '/signup', '/forgot-password', '/reset-password', '/contact-us', '/wallet', '/profile', '/service-history', '/about-us', '/privacy-policy', '/terms-and-conditions'];
    const fixedNav = fixedNavPathList.includes(pathname) || pathname.startsWith('/categories/') || pathname.startsWith('/settings') || pathname.startsWith('/services/');

    const fetchWalletBalance = useCallback(async () => {
        if (isAuthenticated) {
            setLoadingBalance(true);
            try {
                const data = await getWalletBalance();
                setWalletBalance(data?.balance);
            } catch (error) {
                console.error("Failed to fetch wallet balance:", error);
                setWalletBalance("Error");
            } finally {
                setLoadingBalance(false);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        fetchWalletBalance();
    }, [fetchWalletBalance]);

    const baseClasses = fixedNav ? "fixed top-0 z-50 transition-all duration-300 w-full" : "sticky top-0 z-50 transition-all duration-300";
    const loginBgClasses = scrolled ? "bg-black/40 bg-opacity-10 backdrop-blur-md shadow-md" : "bg-transparent";
    const defaultBgClasses = "bg-white shadow-md";
    const textColor = fixedNav ? "text-white hover:text-gray-300" : "text-slate-800 hover:text-slate-600";

    return (
        <header className={`${baseClasses} ${fixedNav ? loginBgClasses : defaultBgClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-10 lg:px-20 xl:px-0">
                <div className="flex items-center justify-between h-14 md:h-20">

                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <SmartLink href="/" className="flex-shrink-0">
                            <div className="relative w-28 h-12 sm:w-32 sm:h-14 md:w-36 md:h-16">
                                <Image
                                    src="/images/core/logo.jpg"
                                    alt="Dealer ADO Logo"
                                    fill
                                    className="rounded-full object-cover hover:opacity-90 transition-opacity"
                                    priority
                                />
                            </div>
                        </SmartLink>


                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
                        {/* Wallet Balance - New Location */}
                        {isAuthenticated && (
                            <div className={`hidden md:flex items-center bg-white border border-gray-100 shadow rounded-full p-2 gap-2 text-sm ${fixedNav ? 'text-gray-800' : 'text-gray-900'}`}>

                                <div className="flex items-center gap-2">
                                    <Image src={WalletLogo} alt="Wallet Logo" width={16} height={16} />
                                    <span className="font-semibold">
                                        {loadingBalance ? <span className="text-gray-400">---.--</span> : (walletBalance !== null ? `${walletBalance}` : "N/A")}
                                    </span>
                                    <button onClick={fetchWalletBalance} disabled={loadingBalance} className={`p-1 rounded-full ${fixedNav ? 'hover:bg-gray-100/15' : 'hover:bg-gray-100'}`}>
                                        <RefreshCcw className={`w-3 h-3 cursor-pointer ${loadingBalance ? 'animate-spin text-green-600' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        )}
                        {navLinks.map((item) => (
                            <SmartLink
                                key={item.href}
                                href={item.href}
                                className={`text-base font-medium transition-colors ${textColor}`}
                            >
                                {item.label}
                            </SmartLink>
                        ))}
                        {isAuthenticated ? (
                            <NavigationMenu.Root className="relative z-50">
                                <NavigationMenu.List className="flex items-center">
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${fixedNav ? 'hover:backdrop-blur-sm bg-transparent' : 'hover:bg-gray-100'}`}>
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    {user?.firstName?.[0] ?? 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className={`text-base font-medium hidden lg:inline-block ${textColor}`}>
                                                Welcome, {user?.firstName || "User"}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        </NavigationMenu.Trigger>

                                        <NavigationMenu.Content className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                                            <NavigationMenu.Link asChild>
                                                <SmartLink
                                                    href="/wallet"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                                                >
                                                    <Wallet className="w-4 h-4" />
                                                    Wallet
                                                </SmartLink>
                                            </NavigationMenu.Link>

                                            <NavigationMenu.Link asChild>
                                                <SmartLink
                                                    href="/profile"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                                                >
                                                    <User className="w-4 h-4" />
                                                    Profile
                                                </SmartLink>
                                            </NavigationMenu.Link>

                                            <NavigationMenu.Link asChild>
                                                <SmartLink
                                                    href="/service-history"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                                                >
                                                    <History className="w-4 h-4" />
                                                    History
                                                </SmartLink>
                                            </NavigationMenu.Link>

                                            <NavigationMenu.Link asChild>
                                                <SmartLink
                                                    href="/settings"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </SmartLink>
                                            </NavigationMenu.Link>

                                            <div className="border-t border-gray-100 my-2" />

                                            <LogoutModal
                                                trigger={
                                                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left cursor-pointer">
                                                        <LogOut className="w-4 h-4" />
                                                        Logout
                                                    </button>
                                                }
                                            />
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>
                            </NavigationMenu.Root>
                        ) : (
                            <div className="flex items-center gap-3">
                                <SmartLink
                                    href="/login"
                                    className={`w-32 h-10 px-4 border rounded-md flex justify-center items-center transition-colors ${fixedNav
                                        ? 'bg-gray-800 border-gray-900 text-white hover:bg-gray-900'
                                        : 'bg-red-800 border-red-800 text-white hover:bg-red-700'
                                        }`}
                                >
                                    <span className="text-base font-semibold">Sign In</span>
                                </SmartLink>
                                <SmartLink
                                    href="/signup"
                                    className="w-32 h-10 px-4 bg-white border border-red-700 rounded-md flex justify-center items-center hover:bg-gray-200 transition"
                                >
                                    <span className="text-slate-700 text-base font-semibold">Sign Up</span>
                                </SmartLink>
                            </div>
                        )}
                    </nav>

                    <div className="flex items-center gap-1">
                        {/* {isAuthenticated && (
                            <div className={`flex items-center bg-white border border-gray-100 shadow rounded-full p-1 px-1.5 gap-0.5 text-xs ${fixedNav ? 'text-gray-800' : 'text-gray-900'}`}>

                                <div className="flex items-center gap-1">
                                    <Image src={WalletLogo} alt="Wallet Logo" width={12} height={12} />
                                    <span className="font-semibold">
                                        {loadingBalance ? <span className="text-gray-400">---.--</span> : (walletBalance !== null ? `${walletBalance}` : "N/A")}
                                    </span>
                                    <button onClick={fetchWalletBalance} disabled={loadingBalance} className={`p-1 rounded-full ${fixedNav ? 'hover:bg-gray-100/15' : 'hover:bg-gray-100'}`}>
                                        <RefreshCcw className={`w-3 h-3 cursor-pointer ${loadingBalance ? 'animate-spin text-green-600' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        )} */}

                        {/* Hamburger Icon */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2"
                        >
                            {menuOpen ? <X className={`w-6 h-6 ${fixedNav ? 'text-white' : 'text-black'}`} /> : <Menu className={`w-6 h-6 ${fixedNav ? 'text-white' : 'text-black'}`} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 md:hidden right-0 h-screen w-72 bg-white shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setMenuOpen(false)}>
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <div className="px-4 bg-white h-screen">
                    {isAuthenticated && (
                        <div className="relative overflow-hidden rounded-xl mb-6 bg-red-700 text-white">
                            <div className="absolute inset-0 opacity-20">
                                <Image
                                    src="/images/homepage/carbg1.png"
                                    alt="Car on road"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10 p-4 space-y-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-16 w-16 border border-white">
                                        <AvatarFallback>
                                            {user?.firstName?.[0] ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col justify-between">
                                        <span className="text-lg font-bold">
                                            {user?.firstName || "User"} {user?.lastName || ""}
                                        </span>

                                        <SmartLink
                                            href="/profile"
                                            className="flex items-center justify-left text-[10px] font-semibold hover:underline text-white/90 pt-1"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            My Profile <ChevronRight className="w-3 h-3 ml-1" />
                                        </SmartLink>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm bg-white text-gray-800 justify-center p-2 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <Image src={WalletLogo} alt="Wallet Logo" width={16} height={16} />
                                        <span className="font-semibold">
                                            {loadingBalance ? <span className="text-gray-400">---.--</span> : (walletBalance !== null ? `${walletBalance}` : "N/A")}
                                        </span>
                                        <button onClick={fetchWalletBalance} disabled={loadingBalance} className="p-1 rounded-full hover:bg-red-600">
                                            <RefreshCcw className={`w-3 h-3 ${loadingBalance ? 'animate-spin' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <nav className="flex flex-col gap-1 text-slate-800">
                        {[
                            { href: "/", label: "Home", icon: <Home strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                            { href: "/about-us", label: "About Us", icon: <Info strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                            { href: "/contact-us", label: "Contact Us", icon: <Headset strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                            ...(isAuthenticated
                                ? [
                                    { href: "/wallet", label: "Wallet", icon: <Wallet strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                                    { href: "/profile", label: "Profile", icon: <User strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                                    { href: "/service-history", label: "History", icon: <History strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                                    { href: "/settings", label: "Settings", icon: <Settings strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" /> },
                                ]
                                : []
                            )
                        ].map((item) => (
                            <SmartLink
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex justify-between items-center gap-3 px-0 py-2 hover:bg-gray-100 transition-colors text-sm font-medium border-b-[.5px] border-gray-200 last:border-b-0 text-slate-800 hover:text-slate-600"
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </SmartLink>
                        ))}

                        {isAuthenticated ? (
                            <LogoutModal
                                trigger={
                                    <button className="flex items-center gap-3 px-0 py-2 text-slate-800 rounded-md hover:bg-red-50 transition-colors text-sm font-medium w-full">
                                        <LogOut strokeWidth={1.5} className="w-7 h-7 bg-rose-50 p-1.5 rounded-full" />
                                        Logout
                                    </button>
                                }
                                onLogoutSuccess={() => setMenuOpen(false)}
                            />
                        ) : (
                            <>
                                <SmartLink
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-center py-2 px-4 bg-red-800 text-white rounded-md hover:bg-red-700 transition"
                                >
                                    Sign In
                                </SmartLink>
                                <SmartLink
                                    href="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-center py-2 px-4 border border-red-700 text-slate-800 rounded-md hover:bg-gray-100 transition mt-1"
                                >
                                    Sign Up
                                </SmartLink>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
