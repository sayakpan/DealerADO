"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
// import { getHomepageBanner } from "@/services/categories"
import useEmblaCarousel from "embla-carousel-react"

export default function CategoryHero({data = []}) {
    const [carouselData, setCarouselData] = useState(data?.images || [])
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    // useEffect(() => {
    //     async function fetchBannerData() {
    //         try {
    //             // const data = await getHomepageBanner()
    //             if (data && data.images) {
    //                 setCarouselData(
    //                     data.images.map((img) => ({ background_url: img.image }))
    //                 )
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch homepage banner:", error)
    //             setCarouselData([
    //                 { background_url: "/images/categories/categories-cars.png" },
    //                 { background_url: "/images/categories/categories-cars.png" },
    //                 { background_url: "/images/categories/categories-cars.png" },
    //             ])
    //         }
    //     }
    //     fetchBannerData()
    // }, [])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)

        // Autoplay
        const autoplay = setInterval(() => {
            if (emblaApi) emblaApi.scrollNext()
        }, 5000)

        return () => {
            clearInterval(autoplay)
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className="relative w-full overflow-hidden">
            {/* Carousel */}
            {carouselData.length > 0 ? (
                <div className="embla w-full h-full">
                    <div className="embla__viewport w-full h-full" ref={emblaRef}>
                        <div className="embla__container flex w-full h-full">
                            {carouselData.map((item, index) => (
                                <div
                                    className="embla__slide relative flex-[0_0_100%] w-full"
                                    key={index}
                                >
                                    {/* Image with natural aspect ratio */}
                                    <div className="relative w-full">
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name || "Category Image"}
                                            width={1920}
                                            height={1080}
                                            priority
                                            sizes="100vw"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // fallback image
                <div className="relative w-full">
                    <Image
                        src="/images/categories/categories-cars.png"
                        alt="Fallback banner"
                        width={1920}
                        height={1080}
                        priority
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                    />
                </div>
            )}

            {/* Dots */}
            {carouselData.length > 0 && (
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {carouselData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                className={`h-2 sm:h-3 rounded-full transition-all duration-300 
                  ${index === selectedIndex
                                        ? "w-6 sm:w-8 bg-white"
                                        : "w-2 sm:w-3 bg-gray-400"
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
