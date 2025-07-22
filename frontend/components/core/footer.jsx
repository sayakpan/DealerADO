import Image from "next/image";

export default function FooterContent() {
    return (
        <footer className="bg-[#1a202c] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                {/* Logo and Description */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white rounded-full p-3">
                            <Image
                                src="/images/core/logo.jpg"
                                alt="Dealer ADO Logo"
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce
                        porttitor sed posuere
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex justify-center space-x-12 mb-12">
                    <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
                        Home
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
                        About Us
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">
                        Contact Us
                    </a>
                </nav>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mb-12">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#1a202c]">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#1a202c]">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-[#1a202c] font-bold text-lg">X</span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-600 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-8 mb-4 md:mb-0">
                            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                                Terms & Condition
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">© 2024 Dealer ADO, All Rights Reserved.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Red Car Image */}
            <div className="relative h-40 overflow-hidden">
                <Image
                    src="/images/core/footer-car.png"
                    alt="Red sports car"
                    width={1000}
                    height={300}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl"
                />
                {/* Footer smoke effect */}
                <Image
                    src="/images/core/footer-smoke.png"
                    alt="Smoke effect"
                    width={1000}
                    height={200}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl opacity-70"
                />
                {/* Gradient overlay to blend with footer */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#1a202c]"></div>
            </div>
        </footer>
    );
}