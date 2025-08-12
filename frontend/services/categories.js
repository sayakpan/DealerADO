import { fetchWithAuth } from "@/utils/api";

export async function getCategoryBySlug(slug) {
	const response = await fetchWithAuth.get(`/api/services/categories/${slug}/`);
	
	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}
	
	if (!response.success) {
		throw new Error(response.message || 'Failed to fetch category');
	}
	
	return response.data;
}

export async function getCategories(page = 1, pageSize = 10) {
	const response = await fetchWithAuth.get(`/api/services/categories/?page=${page}&page_size=${pageSize}`);
	
	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}
	
	if (!response.success) {
		throw new Error(response.message || 'Failed to fetch categories');
	}
	
	return {
		count: response.data.count,
		next: response.data.next,
		previous: response.data.previous,
		results: response.data.results,
		hasMore: !!response.data.next
	};
}