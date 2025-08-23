import { getServerCategoryBySlug } from "@/services/serverServices"
import CategoryPageClient from "@/components/pages/CategoryPageClient"
import ServiceHeader from "@/components/ui/serviceHeader"
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const category = await getServerCategoryBySlug(slug);

    if (category.status === 401) {
        return {
            title: "Category Not Found | DealerADO",
            description: "The requested car service category could not be found.",
        };
    }

    return {
        title: `${category.name} Services | DealerADO`,
        description: `Explore ${category.name} services offered by DealerADO. Find detailed information and book your service.`,
    };
}


export default async function CategoryPage({ params }) {
    const { slug } = await params

    const category = await getServerCategoryBySlug(slug);

    if(category.status === 401) {
        redirect('/login?status=401');
    }

    return <CategoryPageClient category={category} />
}
