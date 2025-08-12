import { getServerUsageLogs } from "@/services/serverServices"
import ServiceHistoryPageClient from "@/components/pages/ServiceHistoryPageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { ServiceHistorySkeleton } from '@/components/skeletons/ServiceHistorySkeleton'
import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation';

export default async function ServiceHistoryPage() {
    const logsData = await getServerUsageLogs();

    if(logsData.status === 401) {
        redirect('/login?status=401');
    }
    
    return (
        <ServiceHistoryPageClient 
            initialLogs={logsData.results}
            initialNextUrl={logsData.next}
        />
    )
}