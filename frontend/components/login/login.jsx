import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react"

export default function LoginContent() {
    return (
        <main className="relative px-6 py-12">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Welcome Text and Car */}
                <div className="relative">
                    <div className="mb-8">
                        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
                            Welcome
                            <br />
                            Back!
                        </h1>
                        <p className="text-white text-lg max-w-md">
                            Sign in to access your Vehicle Services history and get real-time updates on all your Services
                        </p>
                    </div>

                    {/* Car Image */}
                    <div className="relative">
                        <Image
                            src="/placeholder.svg?height=300&width=500"
                            alt="White sedan car"
                            width={500}
                            height={300}
                            className="relative z-10"
                        />
                        {/* Decorative stripes */}
                        <div className="absolute bottom-0 left-0 right-0 h-20">
                            <div className="h-4 bg-white mb-2"></div>
                            <div className="h-4 bg-[#2a394a] mb-2"></div>
                            <div className="h-4 bg-[#808080]"></div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="flex justify-center lg:justify-end">
                    <div className="bg-[#2a394a] rounded-2xl p-8 w-full max-w-md">
                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-[#808080] text-sm">
                                    Email or Phone Number
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    className="mt-2 bg-transparent border-b border-[#808080] border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-[#808080] focus:border-white"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-[#808080] text-sm">
                                    Password
                                </Label>
                                <div className="relative mt-2">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-transparent border-b border-[#808080] border-t-0 border-l-0 border-r-0 rounded-none text-white placeholder:text-[#808080] focus:border-white pr-10"
                                    />
                                    <Eye className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#808080] w-5 h-5" />
                                </div>
                            </div>

                            <div className="text-right">
                                <a href="#" className="text-[#808080] text-sm hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <Button className="w-full bg-[#b52628] hover:bg-[#a01f21] text-white py-3 rounded-lg">Sign In</Button>

                            <div className="text-center">
                                <span className="text-[#808080] text-sm">
                                    Don't have an account?{" "}
                                    <a href="#" className="text-[#b52628] hover:underline">
                                        Sign Up
                                    </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
