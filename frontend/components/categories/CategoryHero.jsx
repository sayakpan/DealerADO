import Image from "next/image"

export default function CategoryHero() {
    return (
        <section className="relative bg-slate-700 text-white overflow-hidden">
            {/* Background with white car */}
            <div className="absolute inset-0">
                <div className="absolute -right-2/6 md:-right-1/6 top-10 w-2/3 h-[80%]">
                    <Image
                        src="/images/categories/categories-car.png"
                        alt="White Porsche car top view"
                        fill
                        className="object-contain object-right"
                        priority
                    />
                </div>
                {/* Circular background elements */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] border-[30px] border-white/10 rounded-full"></div>
                <div className="absolute right-18 top-1/2 transform -translate-y-1/2 w-[350px] h-[350px] border-[30px] border-white/5 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-24">
                <div className="max-w-96 w-2/3 md:w-full">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                        Stay Ahead on the Road with Our Top-Tier Services
                    </h1>
                    <p className="text-xs md:text-sm text-gray-300 mb-8">Book maintenance and repairs with our certified professionals.</p>
                </div>
            </div>
        </section>
    )
}
