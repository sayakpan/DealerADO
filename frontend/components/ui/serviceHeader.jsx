import Image from "next/image"

const ServiceHeader = ({ title = "Wallet" }) => {
    return (
        <div className="w-full h-44 md:h-72 relative rounded-b-[30px] md:rounded-b-[60px] overflow-hidden">
            {/* Background Image using Next.js Image component */}
            <Image unoptimized src="/images/ui/red-car.png" alt="Background" fill className="object-cover" priority />

            {/* Lighter Red Overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-red-600 bg-opacity-40 z-10" /> */}

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pt-5">
                <h1 className="text-white text-2xl md:text-5xl font-semibold drop-shadow-lg">{title}</h1>
            </div>
        </div>
    )
}

export default ServiceHeader
