import { fetchWithAuth } from "@/utils/api";

export async function getServiceBySlug(slug) {
	const response = await fetchWithAuth.get(`/api/services/service/${slug}/`);

	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}

	if (!response.success) {
		throw new Error(response.message || 'Failed to fetch service');
	}

	return response.data;
}

export async function submitServiceData(slug, formData) {
	const response = await fetchWithAuth.post(`/api/services/service/${slug}/submit/`, formData);

	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}

	if (!response.success) {
		// Create error object with status for proper error handling
		const error = new Error(response.message || 'Failed to submit service data');
		error.status = response.status;
		error.statusCode = response.status;
		error.response = { status: response.status };
		throw error;
	}

	return response.data;
}

export async function getServiceHistory(page = 1, pageSize = 10) {
	const response = await fetchWithAuth.get(`/api/services/usage-logs/?page=${page}&page_size=${pageSize}`);

	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}

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
}

export async function getUsageLogs(url = null) {
	let apiUrl;
	if (url) {
		// Extract the path and query from the full URL
		const urlObj = new URL(url);
		apiUrl = urlObj.pathname + urlObj.search;
	} else {
		apiUrl = '/api/services/usage-logs/';
	}

	const response = await fetchWithAuth.get(apiUrl);

	if (response.status === 401) {
		window.location.href = '/login?status=401';
		return;
	}

	if (!response.success) {
		throw new Error(response.message || 'Failed to fetch usage logs');
	}

	return response.data;
}