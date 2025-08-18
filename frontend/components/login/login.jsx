import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";

export default function LoginContent() {
    return (
        <main className="relative min-h-[75vh] overflow-hidden">
            {/* Welcome Text - positioned on left */}
            <div className="absolute left-16 top-12 z-20 max-w-md">
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    Welcome
                    <br />
                    Back!
                </h1>
                <p className="text-white/90 text-sm max-w-xs leading-relaxed mt-4">
                    Sign in to access your Vehicle Services history and get real-time updates on all your Services
                </p>
            </div>

            {/* Sign In Form - positioned with exact specifications */}
            <div
                className="absolute z-20"
                style={{
                    top: '104px',
                    left: '835px'
                }}
            >
                <div
                    className="bg-[#151C22]"
                    style={{
                        width: '470px',
                        height: '393px',
                        borderRadius: '30px',
                        padding: '40px',
                        boxShadow: '0px 12px 40px 0px #0000004D',
                        opacity: '1'
                    }}
                >
                    <form
                        className="flex flex-col"
                        style={{
                            gap: '40px'
                        }}
                    >
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-400 text-xs font-normal uppercase tracking-wide">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                className="bg-transparent border-0 border-b border-gray-500 rounded-none text-white placeholder:text-gray-400 focus:border-white focus:ring-0 px-0 py-2 text-sm"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-gray-400 text-xs font-normal uppercase tracking-wide">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-transparent border-0 border-b border-gray-500 rounded-none text-white placeholder:text-gray-400 focus:border-white focus:ring-0 px-0 py-2 pr-8 text-sm"
                                />
                                <Eye className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                            </div>
                        </div>

                        <div className="text-right pt-2">
                            <a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <Button className="w-full bg-[#c53030] hover:bg-[#b91c1c] text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg mt-6">
                            Sing In
                        </Button>

                        <div className="text-center pt-3">
                            <span className="text-gray-400 text-xs">
                                Don't have an account?{" "}
                                <a href="#" className="text-[#c53030] hover:text-[#b91c1c] font-medium transition-colors">
                                    Sign Up
                                </a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Decorative stripes - positioned behind the car */}
            <div className="absolute bottom-24 left-0 right-0 z-5">
                {/* First white stripe */}
                <div
                    className="absolute bg-white"
                    style={{
                        width: '100vw',
                        height: '40px',
                        left: '0',
                        transform: 'skewY(-3deg)',
                        transformOrigin: 'left'
                    }}
                ></div>

                {/* Second white stripe */}
                <div
                    className="absolute bg-white"
                    style={{
                        width: '100vw',
                        height: '16px',
                        left: '0',
                        top: '50px',
                        transform: 'skewY(-3deg)',
                        transformOrigin: 'left'
                    }}
                ></div>

                {/* Dark stripe */}
                <div
                    className="absolute"
                    style={{
                        width: '100vw',
                        height: '16px',
                        left: '0',
                        top: '70px',
                        background: '#2A394A',
                        transform: 'skewY(-3deg)',
                        transformOrigin: 'left'
                    }}
                ></div>
            </div>

            {/* Car positioned in center-left area like in image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-3/4 translate-y-1/4 z-10">
                <Image
                    src="/images/signin/white-car.png"
                    alt="White sedan car"
                    width={500}
                    height={320}
                    className="w-full max-w-2xl"
                    style={{
                        objectFit: 'contain'
                    }}
                />

                {/* Small black ellipse shadow */}
                <div
                    className="absolute"
                    style={{
                        width: '80px',
                        height: '25px',
                        left: '60%',
                        bottom: '10px',
                        transform: 'translateX(-50%)',
                        background: '#010101',
                        borderRadius: '50%',
                        opacity: '0.3'
                    }}
                ></div>
            </div>
        </main>
    );
}