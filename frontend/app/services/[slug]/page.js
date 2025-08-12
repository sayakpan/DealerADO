import { getServerServiceBySlug } from "@/services/serverServices"
import ServicePageClient from "@/components/pages/ServicePageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { ServiceFormSkeleton } from '@/components/skeletons/ServiceSkeleton'
import { redirect } from 'next/navigation';

export default async function ServicePage({ params }) {
    const { slug } = params

    const service = await getServerServiceBySlug(slug);

    if(service.status === 401) {
        redirect('/login?status=401');
    }
    
    return <ServicePageClient service={service} slug={slug} />
}