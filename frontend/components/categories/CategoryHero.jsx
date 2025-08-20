"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function CategoryHero() {
    const carouselData = [
        {
            background_url: "/images/categories/categories-cars.png",
            title: "Stay Ahead on the Road with Our Top-Tier Services",
            description: "Book maintenance and repairs with our certified professionals.",
        },
        // {
        //     background_url: "/images/homepage/hero-bg.png",
        //     title: "Comprehensive Vehicle Care",
        //     description: "From routine maintenance to complex repairs, we've got you covered."
        // },
        {
            background_url: "/images/categories/categories-cars.png",
            title: "Stay Ahead on the Road with Our Top-Tier Services",
            description: "Book maintenance and repairs with our certified professionals.",
        },
        {
            background_url: "/images/categories/categories-cars.png",
            title: "Stay Ahead on the Road with Our Top-Tier Services",
            description: "Book maintenance and repairs with our certified professionals.",
        },
        {
            background_url: "/images/categories/categories-cars.png",
            title: "Stay Ahead on the Road with Our Top-Tier Services",
            description: "Book maintenance and repairs with our certified professionals.",
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        if (carouselData.length > 2) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length)
            }, 5000) // Change slide every 5 seconds
            return () => clearInterval(interval)
        }
    }, [carouselData.length])

    const showCarousel = carouselData.length > 3
    const currentItem = carouselData[currentSlide]

    return (
        <section className="relative bg-slate-700 text-white overflow-hidden">
            {showCarousel ? (
                <div className="w-full">
                    <div className="relative w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                        <Image
                            src={currentItem.background_url || "/placeholder.svg"}
                            alt={currentItem.title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <div className="relative w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                        <Image
                            src="/images/categories/categories-car.png"
                            alt="White Porsche car top view"
                            fill
                            className="object-right scale-90 sm:scale-90 md:scale-100 lg:scale-100 object-cover"
                            priority
                        />
                        <div
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 
                                      w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] 
                                      border-[15px] sm:border-[20px] md:border-[25px] lg:border-[30px] 
                                      border-white/10 rounded-full"
                        ></div>
                        <div
                            className="absolute right-4 sm:right-8 md:right-12 lg:right-18 top-1/2 transform -translate-y-1/2 
                                      w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] 
                                      border-[15px] sm:border-[20px] md:border-[25px] lg:border-[30px] 
                                      border-white/5 rounded-full"
                        ></div>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 z-10 flex items-center">
                <div className="px-4">
                    <div className="max-w-[250px] sm:max-w-md md:max-w-lg lg:max-w-xl p-4">
                        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                            {showCarousel ? currentItem.title : "Stay Ahead on the Road with Our Top-Tier Services"}
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg">
                            {showCarousel
                                ? currentItem.description
                                : "Book maintenance and repairs with our certified professionals."}
                        </p>
                    </div>
                </div>
            </div>

            {showCarousel && (
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {carouselData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 sm:w-8 md:w-10 bg-white" : "w-2 sm:w-2.5 md:w-3 bg-gray-400"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
