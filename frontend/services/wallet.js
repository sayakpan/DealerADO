import { fetchWithAuth } from "@/utils/api";

export async function getWalletData() {
    const response = await fetchWithAuth(`/api/wallet/`);
    
    if (response.status === 401) {
        window.location.href = '/login?status=401';
        return;
    }
    
    return response?.data;
}

