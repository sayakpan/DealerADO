import Image from "next/image"

export default function AboutUs() {
    return (
        <section className="py-6 md:py-10 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">About Us</h2>

                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Dolor at neque ut mauris amet at. Quisque tincidunt velit fusce
                        porttitor sed posuere nunc mauris. Vehicula consectetur ut urna ultrices scelerisque ut urna ultrices arcu
                        elit. Ultrices adipiscing adipiscing lectus elit ultrices tempor. Donec facilisi ut velit mauris ut
                        adipiscing. Commodo commodo mauris mauris.
                    </p>
                </div>
            </div>

            {/* Background cars */}
            <div className="relative bottom-0 left-0 right-0 h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px]">
                {/* Red diagonal background */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent transform skew-y-1"></div> */}

                {/* Left car */}
                <div
                    className="absolute bottom-0 left-[-50%] sm:left-[-15%] lg:left-[-12%] w-[400px] h-[240px] md:w-[600px] md:h-[360px] lg:w-[800px] lg:h-[480px] xl:w-[1000px] xl:h-[600px] z-10"
                >
                    <Image
                        src="/images/homepage/car2.png"
                        alt="Gray sedan"
                        fill
                        className="object-contain object-left-bottom"
                        priority
                    />
                </div>

                {/* Right car */}
                <div
                    className="absolute bottom-0 right-[-30%] sm:right-[-15%] lg:right-[-12%] w-[400px] h-[240px] md:w-[600px] md:h-[360px] lg:w-[800px] lg:h-[480px] xl:w-[1000px] xl:h-[600px]"
                >
                    <Image
                        src="/images/homepage/car1.png"
                        alt="White SUV"
                        fill
                        className="object-contain object-right-bottom"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
