import Image from "next/image";
import Link from "next/link";

export default function FooterContent() {
    return (
        <footer className="bg-gray-900 relative overflow-hidden w-full">
            {/* Desktop Footer (1024px+) */}
            <div className="hidden lg:block">
                <div className="max-w-[90rem] mx-auto relative">
                    <div className="py-[3rem] px-[5%]">
                        {/* Logo */}
                        <div className="flex justify-center mb-[1.5rem]">
                            <Image
                                src="/images/core/logo.jpg"
                                alt="Dealer ADO Logo"
                                width={117}
                                height={60}
                                className="rounded-[3.125rem]"
                            />
                        </div>

                        {/* Description */}
                        <div className="text-center mb-[2rem]">
                            <p className="text-white text-xs opacity-80 max-w-[30rem] mx-auto">
                                Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce porttitor sed posuere
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex justify-center gap-[3rem] mb-[2rem]">
                            <Link href="/" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">Home</Link>
                            <Link href="/about" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">About Us</Link>
                            <Link href="/contact" className="text-white text-lg font-medium hover:text-gray-300 transition-colors">Contact Us</Link>
                        </nav>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-[0.75rem] mb-[2rem]">
                            <a href="https://instagram.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2.25rem] h-[2.25rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg className="w-[1.25rem] h-[1.25rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://facebook.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2.25rem] h-[2.25rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <svg className="w-[1.25rem] h-[1.25rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://twitter.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2.25rem] h-[2.25rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <span className="text-gray-900 font-bold text-lg">X</span>
                            </a>
                        </div>

                        {/* Divider Line */}
                        <div className="border-t border-white/30 mb-[1.5rem]"></div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center px-[5%]">
                            <div className="flex gap-[2rem] mb-[1rem] md:mb-0">
                                <Link href="/privacy" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">Privacy Policy</Link>
                                <Link href="/terms" className="text-white text-sm font-medium hover:text-gray-300 transition-colors">Terms & Condition</Link>
                            </div>
                            <p className="text-white text-sm font-medium">© 2024 Dealer ADO, All Rights Reserved.</p>
                        </div>
                    </div>

                    {/* Car Image - Full Width */}
                    <div className="w-full h-[18rem] relative overflow-hidden">
                        <Image
                            src="/images/core/footer-car.png"
                            alt="Red sports car"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Tablet Footer (768px - 1023px) */}
            <div className="hidden md:block lg:hidden">
                <div className="py-[2.5rem] px-[5%]">
                    <div className="text-center mb-[2rem]">
                        <Image
                            src="/images/core/logo.jpg"
                            alt="Dealer ADO Logo"
                            width={80}
                            height={40}
                            className="mx-auto rounded-[1.5625rem] mb-[1rem]"
                        />
                        <p className="text-white text-xs opacity-80 max-w-[24rem] mx-auto">
                            Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce porttitor sed posuere
                        </p>
                    </div>
                    <nav className="flex justify-center gap-[2rem] mb-[2rem]">
                        <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
                        <Link href="/about" className="text-white hover:text-gray-300 transition-colors">About Us</Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact Us</Link>
                    </nav>
                    <div className="flex justify-center gap-[1rem] mb-[2rem]">
                        <a href="https://instagram.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2rem] h-[2rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg className="w-[1rem] h-[1rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="https://facebook.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2rem] h-[2rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg className="w-[1rem] h-[1rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://twitter.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[2rem] h-[2rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-gray-900 font-bold text-sm">X</span>
                        </a>
                    </div>
                    <div className="border-t border-white/30 pt-[1.5rem]">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-[1rem]">
                            <div className="flex gap-[1.5rem]">
                                <Link href="/privacy" className="text-white text-xs hover:text-gray-300 transition-colors">Privacy Policy</Link>
                                <Link href="/terms" className="text-white text-xs hover:text-gray-300 transition-colors">Terms & Condition</Link>
                            </div>
                            <p className="text-white text-xs">© 2024 Dealer ADO, All Rights Reserved.</p>
                        </div>
                    </div>
                </div>

                {/* Car Image - Full Width */}
                <div className="w-full h-[12rem] relative overflow-hidden">
                    <Image
                        src="/images/core/footer-car.png"
                        alt="Red sports car"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>

            {/* Mobile Footer (below 768px) */}
            <div className="md:hidden">
                <div className="py-[2rem] px-[5%]">
                    <div className="text-center mb-[1.5rem]">
                        <Image
                            src="/images/core/logo.jpg"
                            alt="Dealer ADO Logo"
                            width={78}
                            height={40}
                            className="mx-auto rounded-[2.0625rem] mb-[1rem]"
                        />
                        <p className="text-white text-xs opacity-80 leading-tight">
                            Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius
                        </p>
                    </div>
                    <nav className="text-center mb-[1.5rem] space-y-[0.5rem]">
                        <Link href="/" className="block text-white text-base font-medium hover:text-gray-300 transition-colors">Home</Link>
                        <Link href="/about" className="block text-white text-base font-medium hover:text-gray-300 transition-colors">About Us</Link>
                        <Link href="/contact" className="block text-white text-base font-medium hover:text-gray-300 transition-colors">Contact Us</Link>
                    </nav>
                    <div className="flex justify-center gap-[0.5rem] mb-[1.5rem]">
                        <a href="https://instagram.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[1.75rem] h-[1.75rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg className="w-[1rem] h-[1rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="https://facebook.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[1.75rem] h-[1.75rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg className="w-[1rem] h-[1rem] text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://twitter.com/dealerado" target="_blank" rel="noopener noreferrer" className="w-[1.75rem] h-[1.75rem] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <span className="text-gray-900 font-bold text-sm">X</span>
                        </a>
                    </div>
                    <div className="border-t border-white/30 pt-[1rem]">
                        <div className="flex justify-center gap-[1.25rem] mb-[1rem]">
                            <Link href="/privacy" className="text-white text-xs font-medium hover:text-gray-300 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-white text-xs font-medium hover:text-gray-300 transition-colors">
                                Terms & Condition
                            </Link>
                        </div>
                        <p className="text-white text-xs font-medium text-center mb-[1rem]">
                            © 2024 Dealer ADO, All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Car Image - Full Width */}
                <div className="w-full h-[10rem] relative overflow-hidden">
                    <Image
                        src="/images/core/footer-car.png"
                        alt="Red sports car"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>
        </footer>
    );
}