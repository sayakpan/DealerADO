import { getServerWalletData } from "@/services/serverServices"
import WalletPageClient from "@/components/pages/WalletPageClient"
import ServiceHeader from '@/components/ui/serviceHeader'
import { WalletSkeleton } from '@/components/skeletons/WalletSkeleton'

export default async function WalletPage() {
    try {
        const walletData = await getServerWalletData()
        
        return <WalletPageClient walletData={walletData} />
    } catch (error) {
        console.error("Error fetching wallet data on server:", error)
        
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Wallet" />
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-red-800">Error loading wallet: {error.message}</div>
                    </div>
                </div>
            </div>
        )
    }
}