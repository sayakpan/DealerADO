import { getServerCategoryBySlug } from "@/services/serverServices"
import CategoryPageClient from "@/components/pages/CategoryPageClient"
import ServiceHeader from "@/components/ui/serviceHeader"

export default async function CategoryPage({ params }) {
    const { slug } = params

    try {
        const category = await getServerCategoryBySlug(slug)

        return <CategoryPageClient category={category} />
    } catch (error) {
        console.error("Error fetching category on server:", error)

        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Error" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                        <div className="text-red-800 text-sm sm:text-base">
                            Error loading category: {error.message}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}