import { getServerServiceBySlug } from "@/services/serverServices"
import ServicePageClient from "@/components/pages/ServicePageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { ServiceFormSkeleton } from '@/components/skeletons/ServiceSkeleton'

export default async function ServicePage({ params }) {
    const { slug } = params

    try {
        const service = await getServerServiceBySlug(slug)
        
        return <ServicePageClient service={service} slug={slug} />
    } catch (error) {
        console.error("Error fetching service on server:", error)
        
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Error" />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-[#B52628]">Error loading service: {error.message}</div>
                    </div>
                </div>
            </div>
        )
    }
}