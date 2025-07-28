import { fetchWithAuth } from "@/utils/api";

export async function getWalletData() {
    const response = await fetchWithAuth(`/api/wallet/`);
    return response?.data;
}

