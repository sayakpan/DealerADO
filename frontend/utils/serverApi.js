import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Server-side API utility for Next.js App Router
 * Handles authentication and API calls on the server
 */

async function getServerToken() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const tokenExpiration = cookieStore.get('tokenExpiration')?.value;

    if (!token || !tokenExpiration || Date.now() > +tokenExpiration) {
        return null;
    }
    return token;
}

async function serverFetch(endpoint, options = {}) {
    const token = await getServerToken();
    
    const { headers, ...rest } = options;
    const isFormData = rest.body instanceof FormData;

    const defaultHeaders = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Token ${token}` }),
        ...headers,
    };

    const finalUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://')
        ? endpoint
        : `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(finalUrl, {
            ...rest,
            headers: defaultHeaders,
            cache: 'no-store', // Disable caching for server-side requests
        });

        let data;
        const contentType = response.headers.get('content-type');

        try {
            if (contentType?.includes('application/json')) {
                data = await response.json();
            } else if (contentType?.includes('text/')) {
                data = await response.text();
            } else {
                data = await response.blob();
            }
        } catch (error) {
            data = null;
        }

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                error: data?.message || data?.detail || 'Request failed',
                ...data,
            };
        }

        return {
            success: true,
            status: response.status,
            data,
        };
    } catch (error) {
        return {
            success: false,
            status: 0,
            error: error.message || 'Network error occurred',
        };
    }
}

// HTTP method helpers for server-side
const serverApi = {
    get: (endpoint, options = {}) => {
        return serverFetch(endpoint, { ...options, method: 'GET' });
    },
    
    post: (endpoint, data = null, options = {}) => {
        const config = {
            ...options,
            method: 'POST',
            ...(data && {
                body: data instanceof FormData ? data : JSON.stringify(data)
            }),
        };
        return serverFetch(endpoint, config);
    },
    
    put: (endpoint, data = null, options = {}) => {
        const config = {
            ...options,
            method: 'PUT',
            ...(data && {
                body: data instanceof FormData ? data : JSON.stringify(data)
            }),
        };
        return serverFetch(endpoint, config);
    },
    
    delete: (endpoint, data = null, options = {}) => {
        const config = {
            ...options,
            method: 'DELETE',
            ...(data && {
                body: JSON.stringify(data)
            }),
        };
        return serverFetch(endpoint, config);
    }
};

export { serverApi, getServerToken };