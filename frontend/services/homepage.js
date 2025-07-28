import { fetchWithAuth } from "@/utils/api";

export async function getAllCategories() {
	const response = await fetchWithAuth(`/api/services/categories/`);
	return response?.data;
}