import { fetchWithAuth } from "@/utils/api";

export async function getServiceBySlug(slug) {
	const response = await fetchWithAuth(`/api/services/service/${slug}/`);
	return response?.data;
}

export async function submitServiceData(slug, formData) {
	const response = await fetchWithAuth(`/api/services/service/${slug}/submit/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	});
	return response?.data;
}