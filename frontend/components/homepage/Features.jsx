import Image from "next/image"

export default function Features() {
    return (
        <section className="bg-gray-50 py-6 md:py-10 lg:py-14 px-4 lg:px-10">
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Card - Services */}
                    <div className="bg-slate-700 text-white rounded-2xl p-8 relative overflow-hidden flex items-center justify-between ">
                        <div className="relative z-10 w-3/5">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Ahead on the Road with Our Top-Tier Services</h2>
                            <p className="text-[10px] md:text-sm text-gray-300 mb-8">Book maintenance and repairs with our certified professionals.</p>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                Find Out More
                            </button>
                        </div>
                        {/* Car image positioned on the right */}
                        <div className="relative w-2/5 h-72">
                            <Image
                                src="/images/homepage/whitecar.png"
                                alt="White car top view"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Card - Services */}
                    <div className="bg-red-800 text-white rounded-2xl p-8 relative overflow-hidden">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted Car Services for a Smooth Journey Ahead</h2>
                            <p className="text-[10px] md:text-sm text-red-100 mb-8">
                                From routine maintenance to major repairs, we've got your car covered.
                            </p>

                            {/* Service buttons */}
                            <div className="grid grid-cols-2 gap-2 mb-2 mt-auto">
                                <button className="bg-white/20 hover:bg-white/30 text-white px-2 backdrop-blur-[2px] py-2 rounded-full text-[8px] md:text-xs font-medium transition-colors">
                                    Vehicle Search
                                </button>
                                <button className="bg-white/20 hover:bg-white/30 text-white px-2 backdrop-blur-[2px] py-2 rounded-full text-[8px] md:text-xs font-medium transition-colors">
                                    Search History
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <button className="bg-white/20 hover:bg-white/30 text-white px-2 backdrop-blur-[2px] py-2 rounded-full text-[8px] md:text-xs font-medium transition-colors">
                                    Credit Report
                                </button>
                                <button className="bg-white/20 hover:bg-white/30 text-white px-2 backdrop-blur-[2px] py-2 rounded-full text-[8px] md:text-xs font-medium transition-colors">
                                    Pollution Services
                                </button>
                                <button className="bg-white/20 hover:bg-white/30 text-white px-2 backdrop-blur-[2px] py-2 rounded-full text-[8px] md:text-xs font-medium transition-colors">
                                    More
                                </button>
                            </div>
                        </div>

                        {/* Background car image */}
                        <div className="absolute inset-0 opacity-20">
                            <Image src="/images/homepage/carbg1.png" alt="Car on road" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
