"use client"

import { Search, FileText, Wrench, List, Leaf } from "lucide-react"

const iconMap = {
    "vehicle-search": Search,
    "credit-report": FileText,
    "services-history": Wrench,
    "other-services": List,
    "pollution-services": Leaf,
}

export default function CategoryCard({ category, onClick }) {
    const IconComponent = iconMap[category.slug] || Search

    return (
        <div
            className="relative bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-600 transition-colors group overflow-hidden"
            onClick={() => onClick && onClick(category)}
        >
            {/* Background pattern/texture */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full transform translate-x-8 translate-y-8"></div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full transform -translate-x-4 -translate-y-4"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-red-400" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>

                {/* Service count if available */}
                {category.service_count > 0 && (
                    <p className="text-gray-400 text-sm">
                        {category.service_count} service{category.service_count !== 1 ? "s" : ""}
                    </p>
                )}

                {/* Description if available */}
                {category.description && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{category.description}</p>}
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
        </div>
    )
}
