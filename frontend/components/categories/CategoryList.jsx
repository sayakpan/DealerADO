"use client"

import CategoryCard from "./CategoryCard"

const categoryList = [
    {
        "id": 1,
        "name": "Vehicle Search",
        "slug": "vehicle-search",
        "description": "Find vehicle owner registration details online. Check car & bike owner details & RC details from the number plate using Vahan & Sms.",
        "rank": 1,
        "logo_url": "http://127.0.0.1:8000/media/service_categories/logos/Frame.png",
        "cover_image_url": "http://127.0.0.1:8000/media/service_categories/covers/bc48e7a936f37d63d44cee2db79b7a5a99d529ab_1.png",
        "service_count": 1
    },
    {
        "id": 2,
        "name": "Credit Report",
        "slug": "credit-report",
        "description": "",
        "rank": 2,
        "logo_url": "http://127.0.0.1:8000/media/service_categories/logos/Frame_1.png",
        "cover_image_url": "http://127.0.0.1:8000/media/service_categories/covers/cb2fe57dbcc1a078b744f0d61a9b9642ce952e24.png",
        "service_count": 0
    },
    {
        "id": 3,
        "name": "Services History",
        "slug": "services-history",
        "description": "",
        "rank": 3,
        "logo_url": "http://127.0.0.1:8000/media/service_categories/logos/Frame_2.png",
        "cover_image_url": "http://127.0.0.1:8000/media/service_categories/covers/9029540a57795453410f9613257c706d8b6c8155.png",
        "service_count": 0
    },
    {
        "id": 4,
        "name": "Other Services",
        "slug": "other-services",
        "description": "",
        "rank": 4,
        "logo_url": "http://127.0.0.1:8000/media/service_categories/logos/Frame_4.png",
        "cover_image_url": "http://127.0.0.1:8000/media/service_categories/covers/ea7c5057ef7fe1bdf39335f83ee7e12e496587dc.png",
        "service_count": 0
    },
    {
        "id": 5,
        "name": "Pollution Services",
        "slug": "pollution-services",
        "description": "",
        "rank": 5,
        "logo_url": "http://127.0.0.1:8000/media/service_categories/logos/Frame_3.png",
        "cover_image_url": "http://127.0.0.1:8000/media/service_categories/covers/ff19a6308bd4de52bf4fcb19339150f36639f6c4.png",
        "service_count": 0
    }
]

export default function CategoryList() {
    const handleCategoryClick = (category) => {
        console.log("Category clicked:", category)
        // Handle navigation or other actions here
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Grid layout - 3 cards on top row, 2 cards on bottom row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* First row - 3 cards */}
                    {categoryList.slice(0, 3).map((category) => (
                        <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                    ))}
                </div>

                {/* Second row - 2 cards centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
                    {categoryList.slice(3, 5).map((category) => (
                        <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} />
                    ))}
                </div>
            </div>
        </section>
    )
}
