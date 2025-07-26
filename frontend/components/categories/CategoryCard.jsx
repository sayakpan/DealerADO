"use client"

import Image from "next/image"

export default function CategoryCard({ category, onClick }) {
    return (
        <div
            className="relative bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-600 transition-colors group overflow-hidden"
            onClick={() => onClick && onClick(category)}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0">
                {/* Background image on top of bg color */}
                <Image
                    src="/images/categories/cover-fallback.png" // replace with your actual image path
                    alt="Background pattern"
                    fill
                    className="object-cover opacity-10 pointer-events-none"
                    priority
                />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full transform translate-x-8 translate-y-8"></div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full transform -translate-x-4 -translate-y-4"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Logo */}
                    <div className="mb-4">
                        <div className="w-20 h-20 bg-white/90 rounded-lg flex items-center justify-center">
                            <Image
                                src={category.logo_url || "/images/categories/logo-fallback.png"}
                                alt={category.name + " logo"}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                    </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>

                {/* Service Count */}
                {category.service_count > 0 && (
                    <p className="text-white text-sm absolute top-0 right-0">
                        {category.service_count} service{category.service_count !== 1 ? "s" : ""}
                    </p>
                )}

                {/* Description */}
                {category.description && (
                    <p className="text-gray-200 text-sm mt-2 line-clamp-2" title={category.description}>{category.description}</p>
                )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-10" />
        </div>
    )
}