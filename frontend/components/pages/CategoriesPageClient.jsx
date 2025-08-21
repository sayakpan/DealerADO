"use client"

import { useState } from "react"
import CategoryHero from "@/components/categories/CategoryHero"
import CategoryList from "@/components/categories/CategoryList"
import { getCategories } from "@/services/categories"

export default function CategoriesPageClient({ initialCategories, initialTotalCount, initialHasMore, carouselData }) {
    const [categories, setCategories] = useState(initialCategories || [])
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(initialHasMore || false)
    const [totalCount, setTotalCount] = useState(initialTotalCount || 0)

    const pageSize = 10

    const handleLoadMore = async () => {
        if (!loadingMore && hasMore) {
            try {
                setLoadingMore(true)
                const nextPage = currentPage + 1
                const response = await getCategories(nextPage, pageSize)
                
                setCategories(prev => [...prev, ...response.results])
                setHasMore(response.hasMore)
                setTotalCount(response.count)
                setCurrentPage(nextPage)
                
            } catch (err) {
                setError(err.message)
                console.error("Error fetching more categories:", err)
            } finally {
                setLoadingMore(false)
            }
        }
    }

    if (error) {
        return (
            <div>
                <CategoryHero />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-[#B52628]">Error loading categories: {error}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <CategoryHero data={carouselData} />
            <CategoryList 
                allCategories={categories}
                totalCount={totalCount}
                hasMore={hasMore}
                loadingMore={loadingMore}
                onLoadMore={handleLoadMore}
            />
        </div>
    )
}