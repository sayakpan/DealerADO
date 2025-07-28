import { fetchWithAuth } from "@/utils/api";

export async function getCategoryBySlug(slug) {
	const response = await fetchWithAuth(`/api/services/categories/${slug}/`);
	return response?.data;
}