"use client"

import CategoryCard from "./CategoryCard"


export default function CategoryList({ allCategories }) {
    return (
        <section className="py-6 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto">
                    {allCategories?.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
}
