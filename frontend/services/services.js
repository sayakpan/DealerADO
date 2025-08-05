import { fetchWithAuth } from "@/utils/api";

export async function getServiceBySlug(slug) {
	try {
		const response = await fetchWithAuth.get(`/api/services/service/${slug}/`);

		if (!response.success) {
			throw new Error(response.message || 'Failed to fetch service');
		}

		return response.data;
	} catch (error) {
		throw new Error(error.message || 'Failed to fetch service');
	}
}

export async function submitServiceData(slug, formData) {
	try {
		const response = await fetchWithAuth.post(`/api/services/service/${slug}/submit/`, formData);

		if (!response.success) {
			// Create error object with status for proper error handling
			const error = new Error(response.message || 'Failed to submit service data');
			error.status = response.status;
			error.statusCode = response.status;
			error.response = { status: response.status };
			throw error;
		}

		return response.data;
	} catch (error) {
		// Preserve error status information for proper error handling
		if (error.status || error.statusCode || error.response?.status) {
			throw error;
		}

		// For network errors or other issues, create a generic error
		const newError = new Error(error.message || 'Failed to submit service data');
		newError.status = 0;
		throw newError;
	}
}

export async function getServiceHistory(page = 1, pageSize = 10) {
	try {
		const response = await fetchWithAuth.get(`/api/services/usage-logs/?page=${page}&page_size=${pageSize}`);

		if (!response.success) {
			throw new Error(response.message || 'Failed to fetch service history');
		}

		return {
			count: response.data.count,
			next: response.data.next,
			previous: response.data.previous,
			results: response.data.results,
			hasMore: !!response.data.next
		};
	} catch (error) {
		throw new Error(error.message || 'Failed to fetch service history');
	}
}

export async function getUsageLogs(url = null) {
	try {
		let apiUrl;
		if (url) {
			// Extract the path and query from the full URL
			const urlObj = new URL(url);
			apiUrl = urlObj.pathname + urlObj.search;
		} else {
			apiUrl = '/api/services/usage-logs/';
		}

		const response = await fetchWithAuth.get(apiUrl);

		if (!response.success) {
			throw new Error(response.message || 'Failed to fetch usage logs');
		}

		return response.data;
	} catch (error) {
		throw new Error(error.message || 'Failed to fetch usage logs');
	}
}