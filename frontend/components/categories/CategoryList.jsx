"use client"

import CategoryCard from "./CategoryCard"
import { Button } from "@/components/ui/button"
import { CategoryCardSkeleton } from "@/components/skeletons/CategorySkeleton"

export default function CategoryList({
    allCategories,
    totalCount,
    hasMore,
    loadingMore,
    onLoadMore
}) {
    return (
        <section className="py-6 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto">
                    {allCategories?.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}

                    {/* Show skeleton cards while loading more */}
                    {loadingMore && Array.from({ length: 3 }).map((_, index) => (
                        <CategoryCardSkeleton key={`loading-${index}`} />
                    ))}
                </div>

                {/* Load More Section */}
                {hasMore && (
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={onLoadMore}
                            disabled={loadingMore}
                            className="bg-[#c53030] hover:bg-[#a02626] text-white px-8 py-2 rounded-lg transition-colors"
                        >
                            {loadingMore ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Loading...
                                </div>
                            ) : (
                                'Load More'
                            )}
                        </Button>
                    </div>
                )}

                {/* Results Info */}
                {totalCount > 0 && (
                    <div className="text-center mt-4 text-gray-600 text-sm">
                        Showing {allCategories?.length || 0} of {totalCount} categories
                    </div>
                )}
            </div>
        </section>
    )
}
