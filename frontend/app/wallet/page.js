import { getServerWalletData } from "@/services/serverServices"
import WalletPageClient from "@/components/pages/WalletPageClient"
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Wallet | DealerADO",
    description: "Manage your DealerADO wallet. View your balance, transaction history, and add funds for seamless car services.",
};

export default async function WalletPage() {
    const walletData = await getServerWalletData();

    if(walletData.status === 401) {
        redirect('/login?status=401');
    }
    
    return <WalletPageClient walletData={walletData} />
}
