import { serverApi } from '@/utils/serverApi';

// Categories
export async function getServerCategories(page = 1, pageSize = 10) {
    try {
        const response = await serverApi.get(`/api/services/categories/?page=${page}&page_size=${pageSize}`);
        
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
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch categories');
    }
}

export async function getServerCategoryBySlug(slug) {
    try {
        const response = await serverApi.get(`/api/services/categories/${slug}/`);
        
        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch category');
        }
        
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch category');
    }
}

// Services
export async function getServerServiceBySlug(slug) {
    try {
        const response = await serverApi.get(`/api/services/service/${slug}/`);

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch service');
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch service');
    }
}

export async function getServerUsageLogs(url = null) {
    try {
        let apiUrl;
        if (url) {
            const urlObj = new URL(url);
            apiUrl = urlObj.pathname + urlObj.search;
        } else {
            apiUrl = '/api/services/usage-logs/';
        }

        const response = await serverApi.get(apiUrl);

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch usage logs');
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch usage logs');
    }
}

// Wallet
export async function getServerWalletData() {
    try {
        const response = await serverApi.get('/api/wallet/');
        
        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch wallet data');
        }
        
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch wallet data');
    }
}