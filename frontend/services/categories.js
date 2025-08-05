import { fetchWithAuth } from "@/utils/api";

export async function getCategoryBySlug(slug) {
	try {
		const response = await fetchWithAuth.get(`/api/services/categories/${slug}/`);
		
		if (!response.success) {
			throw new Error(response.message || 'Failed to fetch category');
		}
		
		return response.data;
	} catch (error) {
		throw new Error(error.message || 'Failed to fetch category');
	}
}

export async function getCategories(page = 1, pageSize = 10) {
	try {
		const response = await fetchWithAuth.get(`/api/services/categories/?page=${page}&page_size=${pageSize}`);
		
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
	} catch (error) {
		throw new Error(error.message || 'Failed to fetch categories');
	}
}