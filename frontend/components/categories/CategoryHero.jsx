import Image from "next/image"

export default function CategoryHero() {
    return (
        <section className="relative bg-slate-700 text-white overflow-hidden">
            {/* Background with white car */}
            <div className="absolute inset-0">
                <div className="absolute right-0 top-0 w-2/3 h-full">
                    <Image
                        src="/images/car-white-porsche-top.png"
                        alt="White Porsche car top view"
                        fill
                        className="object-contain object-right"
                        priority
                    />
                </div>
                {/* Circular background elements */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
                <div className="max-w-2xl">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                        Stay Ahead on the Road with Our Top-Tier Services
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">Book maintenance and repairs with our certified professionals.</p>
                </div>
            </div>

            {/* Bottom indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-8 h-1 bg-white rounded"></div>
                <div className="w-8 h-1 bg-white/30 rounded"></div>
                <div className="w-8 h-1 bg-white/30 rounded"></div>
            </div>
        </section>
    )
}
