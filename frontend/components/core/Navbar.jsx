import Link from "next/link";
import SmartLink from "../utils/SmartLink";
import Image from "next/image";

export default function Navbar() {
    return (
        <>
            <header className="sticky top-0 z-50">
                <SmartLink href="/" className="absolute left-[135px] top-[15px]">
                    <Image
                        className="w-36 h-16 rounded-[50px] hover:opacity-90 transition-opacity"
                        src="/images/core/logo.jpg"
                        alt="Dealer ADO Logo"
                        width={137}
                        height={70}
                    />
                </SmartLink>

                {/* Navigation */}
                <div className="absolute left-[658px] top-[25px] flex items-center gap-9">
                    <nav className="flex items-center gap-8">
                        <SmartLink href="/" className="text-white text-lg font-medium hover:text-white/80 transition-colors">Home</SmartLink>
                        <SmartLink href="/about" className="text-white text-lg font-medium hover:text-white/80 transition-colors">About Us</SmartLink>
                        <SmartLink href="/contact" className="text-white text-lg font-medium hover:text-white/80 transition-colors">Contact Us</SmartLink>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="w-36 h-12 p-2.5 bg-slate-700 rounded-[10px] flex justify-center items-center opacity-50">
                            <span className="text-white text-lg font-semibold">Sign in</span>
                        </div>
                        <SmartLink href="/signup" className="w-36 h-12 p-2.5 bg-white rounded-[10px] border border-red-700 flex justify-center items-center hover:bg-gray-100 transition-colors">
                            <span className="text-slate-700 text-lg font-semibold">Sign up</span>
                        </SmartLink>
                    </div>
                </div>
            </header>
        </>
    );
}