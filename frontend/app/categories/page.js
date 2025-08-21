import { getServerCategories } from "@/services/serverServices"
import CategoriesPageClient from "@/components/pages/CategoriesPageClient"
import { redirect } from 'next/navigation';
import { getHomepageBanner } from "@/services/categories";

export default async function CategoriesPage() {
    const initialData = await getServerCategories();
    const carouselData = await getHomepageBanner();
    if (initialData.status === 401) {
        redirect('/login?status=401');
    }

    return (
        <CategoriesPageClient
            initialCategories={initialData.results}
            initialTotalCount={initialData.count}
            initialHasMore={initialData.hasMore}
            carouselData={carouselData}
        />
    )
}