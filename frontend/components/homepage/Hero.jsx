'use client'
import Image from "next/image"
import { isAuthenticated } from "@/lib/auth"
import SmartLink from "../utils/SmartLink"
import ClientOnly from "../utils/ClientOnly"

export default function Hero({ bannerData }) {
    const bannerImage = bannerData?.image || "/images/homepage/redcar.png";
    const bannerTitle = bannerData?.title || "Welcome Garage Companion, Simplify Service Scheduling";
    const bannerDescription = bannerData?.description || "Experience hassle-free car care with just a few taps.";

    return (
        <section className="relative bg-[#151C22] text-white overflow-hidden flex items-center justify-center px-2 md:px-10 lg:px-20">
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32 w-2/3 lg:w-1/2 h-full">
                <div className="max-w-xl">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold mb-6 leading-tight">
                        {bannerTitle}
                    </h1>
                    <p className="text-sm lg:text-base mb-8 text-gray-100">{bannerDescription}</p>
                    <ClientOnly>

                        {isAuthenticated() ? (
                            <SmartLink
                                href="/categories"
                                className="bg-red-800 hover:bg-red-900 text-white px-6 md:px-10 py-1.5 md:py-3 rounded-lg font-semibold transition-colors cursor-pointer inline-block"
                            >
                                Explore
                            </SmartLink>
                        ) : (
                            <SmartLink
                                href="/login"
                                className="bg-red-800 hover:bg-red-900 text-white px-6 md:px-10 py-1.5 md:py-3 rounded-lg font-semibold transition-colors cursor-pointer inline-block"
                            >
                                Sign In
                            </SmartLink>
                        )}
                    </ClientOnly>
                </div>
            </div>

            {/* Background with red car */}
            <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40 w-1/3 lg:w-1/2 h-full">
                <div className="absolute top-10 md:top-20 -right-16 md:-right-32 w-[200%] md:w-full h-[150px] md:h-[400px] transform rotate-[60deg] md:rotate-[30deg] z-10">
                    <Image
                        src={bannerImage}
                        alt="Homepage banner"
                        fill
                        className="object-contain object-right"
                        priority
                    />
                </div>
                <div className="absolute top-10 md:top-20 -right-6 md:right-10 w-[200%] md:w-full h-[150px] md:h-[400px] transform rotate-[60deg] md:rotate-[30deg] opacity-30">
                    <Image
                        src="/images/homepage/cloud.png"
                        alt="Red sports car"
                        fill
                        className="object-contain object-right"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
