import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export default function FooterContent() {
    return (
        <footer className="bg-[#151c22] mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Logo and Description */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white rounded-full p-2">
                            <div className="w-16 h-16 bg-[#b52628] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">DEALER ADO</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[#808080] max-w-md mx-auto text-sm">
                        Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce
                        porttitor sed posuere
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex justify-center space-x-8 mb-8">
                    <a href="#" className="text-white hover:text-[#d9d9d9] transition-colors">
                        Home
                    </a>
                    <a href="#" className="text-white hover:text-[#d9d9d9] transition-colors">
                        About Us
                    </a>
                    <a href="#" className="text-white hover:text-[#d9d9d9] transition-colors">
                        Contact Us
                    </a>
                </nav>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-[#151c22]" />
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-[#151c22]" />
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#151c22] font-bold text-sm">X</span>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-[#263b48] pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <a href="#" className="text-[#808080] text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-[#808080] text-sm hover:text-white transition-colors">
                                Terms & Condition
                            </a>
                        </div>
                        <p className="text-[#808080] text-sm">© 2024 Dealer ADO, All Rights Reserved.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Car Image */}
            <div className="relative h-32 overflow-hidden">
                <Image
                    src="/placeholder.svg?height=200&width=800"
                    alt="Red sports car"
                    width={800}
                    height={200}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                />
            </div>
        </footer>
    )
}
