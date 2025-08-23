import { getServerCategories } from "@/services/serverServices"
import CategoriesPageClient from "@/components/pages/CategoriesPageClient"
import { redirect } from 'next/navigation';
import { getHomepageBanner } from "@/services/categories";

export const metadata = {
    title: "Categories | DealerADO",
    description: "Explore a wide range of car service categories offered by DealerADO. Find the perfect service for your vehicle.",
};

export default async function CategoriesPage() {
    const initialData = await getServerCategories();
    if (initialData.status === 401) {
        redirect('/login?status=401');
    }
    const carouselData = await getHomepageBanner();

    return (
        <CategoriesPageClient
            initialCategories={initialData.results}
            initialTotalCount={initialData.count}
            initialHasMore={initialData.hasMore}
            carouselData={carouselData}
        />
    )
}
