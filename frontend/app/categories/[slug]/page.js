"use client"

import ServiceHeader from "@/components/ui/serviceHeader"
import ServiceCard from "@/components/ui/ServiceCard"
import { getCategoryBySlug } from "@/services/categories"
import { useEffect, useState, use } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CategoryPage({ params }) {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    // Unwrap params using React.use()
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    const handleServiceClick = (service) => {
        // Navigate to service page or open service modal
        router.push(`/services/${service.slug}`)
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true)
                const categoryData = await getCategoryBySlug(slug)
                setCategory(categoryData)
            } catch (err) {
                setError(err.message)
                console.error("Error fetching category:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCategory()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Loading..." />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="flex justify-center items-center h-32 sm:h-48 lg:h-64">
                        <div className="text-base sm:text-lg text-gray-600">Loading category...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Error" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                        <div className="text-red-800 text-sm sm:text-base">
                            Error loading category: {error}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title={category?.name || "Category"} />

            {/* Header Section */}
            <div className="bg-white py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Dealer Ado Point Logo and Title */}
                    <div className="flex justify-center items-center mb-6 sm:mb-8">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                                src="/images/wallet/logo.png"
                                alt="Dealer Ado Point Logo"
                                width={40}
                                height={40}
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                            />
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                                Dealer Ado Point
                            </h1>
                        </div>
                    </div>

                    {/* Services Grid - Single Responsive Grid */}
                    {category?.services && category.services.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center mb-6 sm:mb-8 lg:mb-12">
                            {category.services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onClick={handleServiceClick}
                                    backgroundImage={service?.image || '/images/categories/default.png'}
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {category?.services && category.services.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-gray-500 text-sm sm:text-base">
                                No services available in this category.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}