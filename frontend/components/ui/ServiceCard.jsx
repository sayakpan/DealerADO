"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const ServiceCard = ({ service, onClick, backgroundImage, className = "" }) => {
    return (
        <div
            onClick={() => onClick?.(service)}
            className={`
                relative w-full max-w-[270px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[333px]
                rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden cursor-pointer
                group hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300
                shadow-md hover:shadow-xl mx-auto bg-[#DDDDDD] flex flex-col
                ${className}
            `}
            style={{
                outline: "1px black solid",
                outlineOffset: "-1px",
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = "/images/placeholder-service.jpg"
                    }}
                />
            </div>

            {/* Radial Gradient Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 67.61% 65.44% at 81.79% 32.75%, rgba(54, 69, 85, 0.10) 0%, rgba(54, 69, 85, 0.95) 100%)",
                }}
            />

            {/* Content Container */}
            <div className="relative z-30 flex flex-col h-full p-5">
                {/* Price Section - Top */}
                <div className="flex items-center gap-[10.33px] md:gap-[13.33px] mb-3">
                    {/* Logo Background */}
                    <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{
                            width: 35,
                            height: 35,
                        }}
                    >
                        <Image
                            src="/images/wallet/logo.png"
                            alt="Logo"
                            width={35}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Price */}
                    <div
                        className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl"
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                    >
                        {Number.parseFloat(service.price_per_hit || 0).toFixed(0)}
                    </div>
                </div>

                {/* Spacer to push content to bottom */}
                <div className="flex-grow" />

                {/* Bottom Section */}
                <div className="mt-auto">
                    {/* Service Title */}
                    <div
                        className="text-white font-semibold leading-tight mb-2 text-base sm:text-lg md:text-xl lg:text-2xl max-w-[228px]"
                        style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                    >
                        {service.name}
                    </div>
                    {service.short_description && (
                        <div
                            className="text-white font-normal mb-2 text-[10px] xl:text-xs"
                            style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                        >
                            {service.short_description}
                        </div>
                    )}

                    {/* Arrow and Line Section */}
                    <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                        {/* Horizontal Line */}
                        <svg width="30" height="2" viewBox="0 0 54 4" fill="none" className="flex-shrink-0">
                            <path
                                d="M2 2H52"
                                stroke="white"
                                strokeWidth="3"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {/* Arrow Icon */}
                        <ArrowRight
                            className="w-[14px] h-[24px] text-white -translate-x-4 flex-shrink-0"
                            strokeWidth={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
