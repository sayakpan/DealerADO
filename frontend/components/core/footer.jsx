import Image from "next/image"
import Link from "next/link"

export default function FooterContent() {
    return (
        <footer className="bg-[#151C22] relative overflow-hidden w-full pt-4">
            {/* Responsive Footer */}
            <div className="w-full mx-auto relative overflow-hidden">
                {/* Dynamic height based on screen size */}
                <div className="h-[380px] sm:h-[510px] md:h-[490px] lg:h-[522px] relative">
                    {/* Background Car Image - Responsive positioning */}
                    <div
                        className="absolute left-1/2 z-10 -translate-x-1/2
                                  top-[280px] w-[600px] h-[284px]
                                  sm:top-[340px] sm:w-[800px] sm:h-[379px]
                                  md:top-[300px] md:w-[900px] md:h-[426px]
                                  lg:top-[320px] lg:w-[1197px] lg:h-[568px]"
                    >
                        <Image
                            src="/images/core/footer-car.png"
                            alt="Red sports car background"
                            fill
                            className="object-cover lg:mt-10"
                            priority
                        />
                    </div>

                    {/* Smoke overlay effect - Responsive height */}
                    <div
                        className="absolute bottom-0 w-full pointer-events-none
                                  h-[280px] sm:h-[380px] md:h-[430px] lg:h-[508px]"
                    >
                        <Image
                            src="/images/core/footer-smoke.png"
                            alt="Smoke effect"
                            fill
                            className="object-cover mix-blend-screen"
                        />
                    </div>

                    {/* Content Layer - Responsive spacing */}
                    <div className="relative z-20 py-4 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-[3rem] lg:px-[5%]">
                        {/* Logo - Responsive size */}
                        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-[1.5rem]">
                            <Image
                                src="/images/core/logo.jpg"
                                alt="Dealer ADO Logo"
                                width={80}
                                height={41}
                                className="rounded-[3.125rem] sm:w-[90px] sm:h-[46px] md:w-[100px] md:h-[51px] lg:w-[117px] lg:h-[60px]"
                            />
                        </div>

                        {/* Description - Responsive text and spacing */}
                        <div className="text-center mb-4 sm:mb-6 lg:mb-[2rem]">
                            <p
                                className="text-white opacity-80 mx-auto
                                         text-[10px] max-w-[280px]
                                         sm:text-[11px] sm:max-w-[320px]
                                         md:text-xs md:max-w-[400px]
                                         lg:text-xs lg:max-w-[30rem]"
                            >
                                Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce
                                porttitor sed posuere
                            </p>
                        </div>

                        {/* Navigation - Responsive layout and spacing */}
                        <nav
                            className="flex justify-center mb-4 sm:mb-6 lg:mb-[2rem]
                                      gap-4 sm:gap-6 md:gap-8 lg:gap-[3rem]
                                      flex-wrap"
                        >
                            <Link
                                href="/"
                                className="text-white font-medium hover:text-gray-300 transition-colors
                                                    text-sm sm:text-base lg:text-lg"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about-us"
                                className="text-white font-medium hover:text-gray-300 transition-colors
                                                         text-sm sm:text-base lg:text-lg"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact-us"
                                className="text-white font-medium hover:text-gray-300 transition-colors
                                                           text-sm sm:text-base lg:text-lg"
                            >
                                Contact Us
                            </Link>
                        </nav>

                        {/* Social Icons - Responsive size and spacing */}
                        <div
                            className="flex justify-center mb-4 sm:mb-6 lg:mb-[2rem]
                                      gap-2 sm:gap-3 lg:gap-[0.75rem]"
                        >
                            <a
                                href="https://instagram.com/dealerado"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors
                                        w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[2.25rem] lg:h-[2.25rem]"
                            >
                                <svg
                                    className="text-gray-900 fill-current
                                             w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[1.25rem] lg:h-[1.25rem]"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com/dealerado"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors
                                        w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[2.25rem] lg:h-[2.25rem]"
                            >
                                <svg
                                    className="text-gray-900 fill-current
                                             w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[1.25rem] lg:h-[1.25rem]"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/dealerado"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors
                                        w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[2.25rem] lg:h-[2.25rem]"
                            >
                                <span
                                    className="text-gray-900 font-bold
                                               text-xs sm:text-sm md:text-base lg:text-lg"
                                >
                                    X
                                </span>
                            </a>
                        </div>

                        {/* Divider Line */}
                        <div className="border-t border-white/30 mb-3 sm:mb-4 lg:mb-[1.5rem]"></div>

                        {/* Bottom Section - Responsive layout */}
                        <div
                            className="flex flex-col items-center gap-3 px-2
                                      sm:gap-4 sm:px-4
                                      md:flex-row md:justify-between md:gap-0 md:px-6
                                      lg:px-[5%]"
                        >
                            <div
                                className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-[2rem]
                                          flex-wrap justify-center md:justify-start"
                            >
                                <Link
                                    href="/privacy-policy"
                                    className="text-white font-medium hover:text-gray-300 transition-colors
                                                               text-xs sm:text-sm lg:text-sm"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms-and-conditions"
                                    className="text-white font-medium hover:text-gray-300 transition-colors
                                                             text-xs sm:text-sm lg:text-sm"
                                >
                                    Terms & Conditions
                                </Link>
                            </div>
                            <p
                                className="text-white font-medium text-center md:text-right
                                         text-xs sm:text-sm lg:text-sm"
                            >
                                © 2024 Dealer ADO, All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
