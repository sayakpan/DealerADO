import CategoryHero from "@/components/categories/CategoryHero"
import CategoryList from "@/components/categories/CategoryList"
import { getAllCategories } from "@/services/homepage";

export default async function CategoriesPage() {
    const allCategories = await getAllCategories();

    return (
        <main>
            <CategoryHero />
            <CategoryList allCategories={allCategories} />
        </main>
    )
}