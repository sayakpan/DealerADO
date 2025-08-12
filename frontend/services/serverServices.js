import { serverApi } from '@/utils/serverApi';
import { redirect } from 'next/navigation';

// Categories
export async function getServerCategories() {
    // try {
        const response = await serverApi.get(`/api/services/categories/`);
        if (response.status === 401) {
            // Redirect to logout route - middleware will handle token removal and redirect to login
            return response;
        }
        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch categories');
        }

        return {
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
            results: response.data.results,
            hasMore: !!response.data.next
        };
    // } catch (error) {
    //     // Re-throw NEXT_REDIRECT errors to allow proper redirect handling
    //     if (error.message === 'NEXT_REDIRECT') {
    //         throw error;
    //     }
    //     throw new Error(error.message || 'Failed to fetch categories');
    // }
}

export async function getServerCategoryBySlug(slug) {
    const response = await serverApi.get(`/api/services/categories/${slug}/`);
    if (response.status === 401) {
        return response;
    }
    if (!response.success) {
        throw new Error(response.error || 'Failed to fetch category');
    }

    return response.data;
}

// Services
export async function getServerServiceBySlug(slug) {
    const response = await serverApi.get(`/api/services/service/${slug}/`);
    if (response.status === 401) {
        return response;
    }
    if (!response.success) {
        throw new Error(response.error || 'Failed to fetch service');
    }

    return response.data;
}

export async function getServerUsageLogs(url = null) {
    let apiUrl;
    if (url) {
        const urlObj = new URL(url);
        apiUrl = urlObj.pathname + urlObj.search;
    } else {
        apiUrl = '/api/services/usage-logs/';
    }

    const response = await serverApi.get(apiUrl);
    if (response.status === 401) {
        return response;
    }
    if (!response.success) {
        throw new Error(response.error || 'Failed to fetch usage logs');
    }

    return response.data;
}

// Wallet
export async function getServerWalletData() {
    const response = await serverApi.get('/api/wallet/');
    if (response.status === 401) {
        return response;
    }
    if (!response.success) {
        throw new Error(response.error || 'Failed to fetch wallet data');
    }

    return response.data;
}