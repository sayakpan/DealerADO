import { fetchWithAuth } from "@/utils/api";

export async function getAllCategories() {
	const response = await fetchWithAuth(`/api/services/categories/`);
	
	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}
	
	return response?.data;
}