"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { getHomepageBanner } from "@/services/categories"

export default function CategoryHero() {
    const [carouselData, setCarouselData] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        async function fetchBannerData() {
            try {
                const data = await getHomepageBanner()
                if (data && data.images) {
                    setCarouselData(data.images.map((img) => ({ background_url: img.image })))
                }
            } catch (error) {
                console.error("Failed to fetch homepage banner:", error)
                // Fallback to default if API fails or no images
                setCarouselData([
                    { background_url: "/images/categories/categories-cars.png" },
                    { background_url: "/images/categories/categories-cars.png" },
                    { background_url: "/images/categories/categories-cars.png" },
                    { background_url: "/images/categories/categories-cars.png" },
                ])
            }
        }
        fetchBannerData()
    }, [])

    useEffect(() => {
        if (carouselData.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length)
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [carouselData.length])

    const showCarousel = carouselData.length > 1
    const currentItem = carouselData[currentSlide]

    return (
        <section className="relative bg-slate-700 text-white overflow-hidden">
            {showCarousel && currentItem ? (
                <div className="w-full h-full">
                    <div className="relative w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                        <Image
                            src={currentItem.background_url || "/placeholder.svg"}
                            alt="Carousel Image"
                            fill
                            className="w-full h-full object-cover"
                            priority
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full h-full">
                    <div className="relative w-full h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                        <Image
                            src="/images/categories/categories-car.png"
                            alt="White Porsche car top view"
                            fill
                            className="w-full h-full object-cover object-center scale-110 sm:scale-100 md:scale-95 lg:scale-90"
                            priority
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                        <div
                            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 
                                      w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] 
                                      border-[12px] sm:border-[18px] md:border-[24px] lg:border-[30px] 
                                      border-white/10 rounded-full pointer-events-none"
                        ></div>
                        <div
                            className="absolute right-6 sm:right-12 md:right-16 lg:right-20 top-1/2 transform -translate-y-1/2 
                                      w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] 
                                      border-[10px] sm:border-[15px] md:border-[20px] lg:border-[25px] 
                                      border-white/5 rounded-full pointer-events-none"
                        ></div>
                    </div>
                </div>
            )}

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