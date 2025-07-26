"use client"

import CategoryCard from "./CategoryCard"


export default function CategoryList({ allCategories }) {
    const handleCategoryClick = (category) => {
        console.log("Category clicked:", category)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                    {allCategories?.map((category) => (
                        <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                    ))}
                </div>
            </div>
        </section>
    )
}
