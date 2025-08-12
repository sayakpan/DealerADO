import { getServerCategoryBySlug } from "@/services/serverServices"
import CategoryPageClient from "@/components/pages/CategoryPageClient"
import ServiceHeader from "@/components/ui/serviceHeader"
import { redirect } from 'next/navigation';

export default async function CategoryPage({ params }) {
    const { slug } = params

    const category = await getServerCategoryBySlug(slug);

    if(category.status === 401) {
        redirect('/login?status=401');
    }

    return <CategoryPageClient category={category} />
}