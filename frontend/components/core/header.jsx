import Image from "next/image";
import Link from "next/link";

export default function Header({ currentPage = "" }) {
    return (
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
            <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-9 pr-[80px] lg-pr-[40px] lg:pr-[80px]">
                <nav className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
                    <Link href="/" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">Home</Link>
                    <Link href="/about" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">About Us</Link>
                    <Link href="/contact" className="text-white text-sm sm:text-base lg:text-lg font-medium hover:text-white/80 transition-colors">Contact Us</Link>
                </nav>
                
                {/* Auth buttons - Responsive sizing */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-slate-700 rounded-[10px] min-w-[100px] sm:min-w-[120px] lg:min-w-[144px] ${currentPage === 'login' ? 'opacity-50' : ''}`}>
                        <span className="text-white text-sm sm:text-base lg:text-lg font-semibold text-center block">Sign in</span>
                    </div>
                    <Link href="/signup" className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white rounded-[10px] border border-red-700 hover:bg-gray-100 transition-colors min-w-[100px] sm:min-w-[120px] lg:min-w-[144px]">
                        <span className="text-slate-700 text-sm sm:text-base lg:text-lg font-semibold text-center block">Sign up</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}