import { fetchWithAuth } from "@/utils/api";

export async function getServiceBySlug(slug) {
	const response = await fetchWithAuth(`/api/services/service/${slug}/`);
	return response?.data;
}