import { getServerCategories } from "@/services/serverServices"
import CategoriesPageClient from "@/components/pages/CategoriesPageClient"
import CategoryHero from "@/components/categories/CategoryHero"
import { CategoryListSkeleton } from "@/components/skeletons/CategorySkeleton"

export default async function CategoriesPage() {
    try {
        const initialData = await getServerCategories(1, 10)
        
        return (
            <CategoriesPageClient 
                initialCategories={initialData.results}
                initialTotalCount={initialData.count}
                initialHasMore={initialData.hasMore}
            />
        )
    } catch (error) {
        console.error("Error fetching categories on server:", error)
        
        return (
            <div>
                <CategoryHero />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-[#B52628]">Error loading categories: {error.message}</div>
                    </div>
                </div>
            </div>
        )
    }
}