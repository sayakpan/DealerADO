"use client"

import { useState, useEffect } from "react"
import CategoryHero from "@/components/categories/CategoryHero"
import CategoryList from "@/components/categories/CategoryList"
import { getCategories } from "@/services/categories"
import { CategoryListSkeleton } from "@/components/skeletons/CategorySkeleton"

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    const pageSize = 10

    const fetchCategories = async (page = 1, append = false) => {
        try {
            if (page === 1) {
                setLoading(true)
            } else {
                setLoadingMore(true)
            }
            
            const response = await getCategories(page, pageSize)
            
            if (append) {
                setCategories(prev => [...prev, ...response.results])
            } else {
                setCategories(response.results)
            }
            
            setHasMore(response.hasMore)
            setTotalCount(response.count)
            setCurrentPage(page)
            
        } catch (err) {
            setError(err.message)
            console.error("Error fetching categories:", err)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        fetchCategories(1, false)
    }, [])

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            fetchCategories(currentPage + 1, true)
        }
    }

    if (loading) {
        return (
            <div className="bg-white">
                <CategoryHero />
                <CategoryListSkeleton count={6} />
            </div>
        )
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
            <CategoryHero />
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