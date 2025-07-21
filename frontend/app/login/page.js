import LoginContent from "@/components/login/login"
import { Button } from "@/components/ui/button"

import FooterContent from "@/components/core/footer";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#b52628]">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <div className="bg-white rounded-full p-2">
                        <div className="w-16 h-16 bg-[#b52628] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">DEALER ADO</span>
                        </div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
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

                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="bg-[#2a394a] text-white border-[#2a394a] hover:bg-[#263b48]">
                        Sign In
                    </Button>
                    <Button className="bg-white text-[#b52628] hover:bg-[#d9d9d9]">Sign Up</Button>
                </div>
            </header>

            {/* Main Content */}
            <LoginContent />

            {/* Footer */}
            <FooterContent />
        </div>
    )
}
