import { getServerUsageLogs } from "@/services/serverServices"
import ServiceHistoryPageClient from "@/components/pages/ServiceHistoryPageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { ServiceHistorySkeleton } from '@/components/skeletons/ServiceHistorySkeleton'
import { XCircle } from 'lucide-react'

export default async function ServiceHistoryPage() {
    try {
        const logsData = await getServerUsageLogs()
        
        return (
            <ServiceHistoryPageClient 
                initialLogs={logsData.results}
                initialNextUrl={logsData.next}
            />
        )
    } catch (error) {
        console.error("Error fetching service history on server:", error)
        
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <ServiceHeader title="Service History" />
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center py-12">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Service History</h2>
                        <p className="text-gray-600">{error.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}