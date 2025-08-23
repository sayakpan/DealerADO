import { getServerServiceBySlug } from "@/services/serverServices"
import ServicePageClient from "@/components/pages/ServicePageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { ServiceFormSkeleton } from '@/components/skeletons/ServiceSkeleton'
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const service = await getServerServiceBySlug(slug);

    if (service.status === 401) {
        return {
            title: "Service Not Found | DealerADO",
            description: "The requested car service could not be found.",
        };
    }

    return {
        title: `${service.name} | DealerADO`,
        description: service.description || `Details about ${service.name} service offered by DealerADO.`,
    };
}


export default async function ServicePage({ params }) {
    const { slug } = await params

    const service = await getServerServiceBySlug(slug);

    if(service.status === 401) {
        redirect('/login?status=401');
    }
    
    return <ServicePageClient service={service} slug={slug} />
}
