const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import Cookies from 'universal-cookie';
import { getServerToken } from '@/utils/getCookiesOnServer';
import { 
    TOKEN_COOKIE_KEY, 
    TOKEN_EXPIRATION_COOKIE_KEY, 
    USER_FIRST_NAME_COOKIE_KEY,
    USER_LAST_NAME_COOKIE_KEY,
    USER_MOBILE_COOKIE_KEY,
    USER_EMAIL_COOKIE_KEY,
    USER_ROLE_COOKIE_KEY
} from '@/lib/auth';


// LRU Cache implementation remains the same
class LRUCache {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.delete(key);
        this.cache.set(key, value);
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    has(key) { return this.cache.has(key); }
    clear() { this.cache.clear(); }
    delete(key) { this.cache.delete(key); }
    keys() { return this.cache.keys(); }
}

const cache = new LRUCache(100);

// Existing helper functions remain the same
export async function getValidToken() {
    if (typeof window === 'undefined') {
        
        return getServerToken();
    } else {
        const cookies = new Cookies();
        const token = cookies.get('token');
        
        const expirationDate = cookies.get('tokenExpiration');

        if (!token || !expirationDate || Date.now() > +expirationDate) {
            return null;
        }
        return token;
    }
}

function handleAuthError() {
    const cookies = new Cookies();
    // Remove auth cookies immediately
    cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
    cookies.remove(TOKEN_EXPIRATION_COOKIE_KEY, { path: '/' });
    cookies.remove(USER_FIRST_NAME_COOKIE_KEY, { path: '/' });
    cookies.remove(USER_LAST_NAME_COOKIE_KEY, { path: '/' });
    cookies.remove(USER_MOBILE_COOKIE_KEY, { path: '/' });
    cookies.remove(USER_EMAIL_COOKIE_KEY, { path: '/' });
    cookies.remove(USER_ROLE_COOKIE_KEY, { path: '/' });
    
    if (typeof window !== 'undefined') {
        // Prevent multiple redirects with a flag
        if (!window.isRedirectingToLogin) {
            window.isRedirectingToLogin = true;
            
            // Trigger the redirect immediately with no delay
            window.location.href = "/login?status=401";
            
            // Dispatch event after initiating redirect
            window.dispatchEvent(new CustomEvent('authError'));
        }
    }
}

async function parseResponse(response) {
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

    return data;
}


/**
 * fetchWithAuth:
 * Fetches data from an API endpoint with authentication and optional error logging.
 * Automatically includes the authorization token and handles FormData appropriately.
 * Enhanced with HTTP method helpers (`get`, `post`, `put`, `delete`, `patch`, `head`, `options`)
 * for cleaner and more intuitive usage.
 * Handles 401 errors by triggering authentication error handling and logs errors if needed.
 * Returns a structured response with success status, HTTP status, and response data or error details.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} [options={}] - Additional fetch options (headers, body, method, etc.).
 * @param {boolean} [logError=true] - Whether to log errors to the console.
 * @returns {Promise<Object>} - A structured response object containing:
 *   - `success` (boolean): Indicates whether the request was successful.
 *   - `status` (number): The HTTP status code of the response.
 *   - `data` (Object|undefined): The parsed response data (if successful).
 *   - `error` (string|undefined): Error details (if unsuccessful).
 */

async function fetchWithAuth(endpoint, options = {}, logError = true, withToken = true) {
    const { headers, ...rest } = options;
    let token = null;
    if (withToken) {
        token = await getValidToken();
    }

    const isFormData = rest.body instanceof FormData;
    const isClient = typeof window !== "undefined";

    const defaultHeaders = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Token ${token}` }),
        ...headers,
    };

    // ✅ Fix: Avoid double base URL
    const finalUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://')
        ? endpoint
        : `${API_BASE_URL}${endpoint}`;

    const response = await fetch(finalUrl, {
        ...rest,
        headers: defaultHeaders,
        credentials: 'omit',
    });

    const data = await parseResponse(response);

    if (!response.ok) {
        if (response.status === 401) handleAuthError();

        if (logError) {
            if (response.status !== 404) {
                console.log(response);
            } else if (!isClient) {
                console.log(`404 Page not Found ${endpoint}`);
            }
        }

        return {
            success: false,
            status: response.status,
            ...data,
        };
    }

    return {
        success: true,
        status: response.status,
        ...({ data }),
    };
}


/**
 * fetchWithCache:
 * Fetches data from an API endpoint with optional caching support.
 * Utilizes `fetchWithAuth` for making requests and caches successful responses for a specified duration.
 * Automatically returns cached data if available and valid, unless `bypassCache` is true.
 * Helps optimize repeated requests to the same endpoint by reducing network calls.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} [options={}] - Additional fetch options (headers, body, method, etc.).
 * @param {number} [cacheDuration=60] - The duration (in seconds) to cache successful responses.
 * @param {boolean} [bypassCache=false] - Whether to bypass the cache and fetch fresh data.
 * @param {boolean} [logError=true] - Whether to log errors to the console.
 * @returns {Promise<Object>} - A structured response object containing:
 *   - `success` (boolean): Indicates whether the request was successful.
 *   - `status` (number): The HTTP status code of the response.
 *   - `data` (Object|undefined): The parsed response data (if successful).
 *   - `error` (string|undefined): Error details (if unsuccessful).
 */

async function fetchWithCache(
    endpoint,
    options = {},
    cacheDuration = 60,
    bypassCache = false,
    logError = true,
    withToken = false
) {
    // Get the current user token
    let token = null;
    if (withToken) {
        token = await getValidToken();
    }

    // Extract query parameters if they exist
    const url = new URL(endpoint, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const queryParams = new URLSearchParams(url.search);
    // const queryString = queryParams.toString();
    // Include token, endpoint, options, and query parameters in cache key
    // -${queryString}
    const cacheKey = `${token || 'anonymous'}-${endpoint}`;
    const now = Date.now();
    if (!bypassCache) {
        const cached = cache.get(cacheKey);
        if (cached && (now - cached.timestamp < cacheDuration * 1000)) {
            return cached.data;
        }
    }

    const result = await fetchWithAuth(endpoint, options, logError, withToken);
    if (result.success && result.status === 200) {
        cache.set(cacheKey, { data: result, timestamp: now });
    }
    return result;
}


const abortControllers = new Map();

export async function FetchCancellableWithCache(endpoint, options = {}, ...fetchWithCacheArgs) {
    const normalizedKey = endpoint.split('?')[0];

    if (abortControllers.has(normalizedKey)) {
        const previousController = abortControllers.get(normalizedKey);
        previousController.abort();
        await new Promise((resolve) => setTimeout(resolve, 0));
        abortControllers.delete(normalizedKey);
    }

    const abortController = new AbortController();
    abortControllers.set(normalizedKey, abortController);
    const { signal } = abortController;
    options = { ...options, signal };

    try {
        const result = await fetchWithCache(endpoint, options, ...fetchWithCacheArgs);
        abortControllers.delete(normalizedKey);
        return result;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log(`Request to ${endpoint} was cancelled.`);
            return null;
        }
        throw error;
    } finally {
        if (abortControllers.has(normalizedKey)) {
            abortControllers.delete(normalizedKey);
        }
    }
}



// Enhanced HTTP method helpers
const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];

methods.forEach(method => {
    /**
     * Performs an authenticated fetch request with optional caching.
     * 
     * @param {string} endpoint - The API endpoint URL to fetch from.
     * @param {*} [data=null] - Optional data to send with the request (for POST, PUT, etc.).
     * @param {Object} [options={}] - Additional fetch configuration options.
     * @param {number} [cacheDuration] - Duration in seconds to cache the response.
     * @param {boolean} [bypassCache=true] - Whether to bypass the cache and fetch fresh data.
     * @param {boolean} [logError] - Whether to log errors to the console.
     * 
     * @returns {Promise} - A promise resolving to the fetch response.
     * 
     * @example
     * // GET request with 20-minute cache
     * const response = await fetchWithAuth.get('/api/users', null, {}, 1200);
     * 
     * @example
     * // POST request with data and bypassing cache
     * const response = await fetchWithAuth.post('/api/users', userData, {}, 60, true);
     */
    fetchWithAuth[method] = (endpoint, data = null, options = {}, logError) => {
        const config = {
            ...options,
            method: method.toUpperCase(),
            ...(data && {
                body: data instanceof FormData ? data : JSON.stringify(data)
            }),
        };

        return fetchWithAuth(endpoint, config, logError);
    };
});

// Helper function for FormData uploads
fetchWithAuth.upload = (endpoint, formData, options = {}, logError = true) => {
    if (!(formData instanceof FormData)) {
        throw new Error('Upload method requires FormData as second parameter');
    }

    const config = {
        ...options,
        method: 'POST',
        body: formData,
    };

    // Bypass cache for uploads
    return fetchWithAuth(endpoint, config, logError);
};

fetchWithAuth.download = async (endpoint, options = {}, logError = true) => {
    const { filename: suggestedFilename, ...restOptions } = options;
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...restOptions,
            headers: {
                ...restOptions.headers,
                Authorization: `Token ${await getValidToken()}`,
            },
            credentials: 'omit',
        });

        if (!response.ok) {
            if (response.status === 401) {
                handleAuthError();
            }

            if (logError) {
                console.error(`Download Error (${response.status}):`, {
                    endpoint,
                    status: response.status,
                });
            }

            // Try to parse error response
            const errorData = await parseResponse(response);
            return {
                success: false,
                status: response.status,
                error: errorData?.message || 'Download failed',
                ...errorData
            };
        }

        // Get filename from Content-Disposition header or use suggested filename
        const contentDisposition = response.headers.get('content-disposition');
        let filename = suggestedFilename;
        
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '');
            }
        }

        // If no filename is found, generate one from the endpoint
        if (!filename) {
            const urlParts = endpoint.split('/');
            filename = urlParts[urlParts.length - 1] || 'download';
        }

        // Create blob from response
        const blob = await response.blob();
        
        // Create download link and trigger download
        if (typeof window !== 'undefined') {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        return {
            success: true,
            status: response.status,
            filename,
            data: blob
        };
    } catch (error) {
        if (logError) {
            console.error('Download Error:', {
                endpoint,
                error: error.message,
            });
        }

        return {
            success: false,
            status: 0,
            error: error.message || 'Network error occurred during download'
        };
    }
};  

function clearCache(endpoint) {
    if (endpoint) {
        Array.from(cache.keys())
            .filter(key => key.startsWith(endpoint))
            .forEach(key => cache.delete(key));
    } else {
        cache.clear();
    }
}

function debounce(func, delay = 500) {
    let timeoutId = null;
    let activeController = null;

    return (...args) => {
        // Cancel previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Abort previous request
        if (activeController) {
            activeController.abort();
        }

        // Create new abort controller
        const controller = new AbortController();
        activeController = controller;

        // Wrap arguments to include signal
        const wrappedArgs = args.map(arg =>
            arg && typeof arg === 'object' ? { ...arg, signal: controller.signal } : arg
        );

        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await func(...wrappedArgs);
                    resolve(result);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        reject(error);
                    }
                } finally {
                    timeoutId = null;
                    activeController = null;
                }
            }, delay);

            // Return a cancel method
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (activeController) {
                    activeController.abort();
                }
            };
        });
    };
}

/**
 * Debounced fetch methods with integrated caching
 * @namespace debouncedFetchMethods
 */
const debouncedFetchMethods = {
    /**
     * Debounced GET request with caching
     * @function get
     * @memberof debouncedFetchMethods
     * 
     * @param {string} endpoint - API endpoint URL
     * @param {Object} [options={}] - Additional fetch configuration
     * @param {number} [cacheDuration=60] - Cache lifetime in seconds
     * @param {boolean} [bypassCache=false] - Force fresh data fetch
     * @param {boolean} [logError=true] - Enable error logging
     * 
     * @returns {Promise} Cancellable fetch promise with cache support
     * 
     * @example
     * // Basic usage
     * const cancelSearch = debouncedFetchMethods.get('/api/search', { query: 'example' });
     * 
     * @example
     * // Advanced configuration
     * debouncedFetchMethods.get('/api/data', 
     *   { headers: { 'Custom-Header': 'value' } },
     *   300,  // 5-minute cache
     *   false // bypass cache
     * );
     */
    get: debounce((endpoint, options = {}, cacheDuration = 60, bypassCache = false, logError = true) => {
        return fetchWithCache(endpoint, options, cacheDuration, bypassCache, logError);
    }),

    /**
     * Debounced POST request with caching
     * @function post
     * @memberof debouncedFetchMethods
     * 
     * @param {string} endpoint - API endpoint URL
     * @param {Object|FormData} data - Request payload
     * @param {Object} [options={}] - Additional fetch configuration
     * @param {number} [cacheDuration=60] - Cache lifetime in seconds
     * @param {boolean} [bypassCache=false] - Force fresh data fetch
     * @param {boolean} [logError=true] - Enable error logging
     * 
     * @returns {Promise} Cancellable fetch promise with cache support
     * 
     * @example
     * // Post with JSON data
     * debouncedFetchMethods.post('/api/users', { name: 'John' });
     * 
     * @example
     * // Post with FormData
     * const formData = new FormData();
     * formData.append('file', fileInput.files[0]);
     * debouncedFetchMethods.post('/api/upload', formData);
     */
    post: debounce((endpoint, data, options = {}, cacheDuration = 60, bypassCache = false, logError = true) => {
        const config = {
            ...options,
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data)
        };
        return fetchWithCache(endpoint, config, cacheDuration, bypassCache, logError);
    }),

    /**
     * Debounced PUT request with caching
     * @function put
     * @memberof debouncedFetchMethods
     * 
     * @param {string} endpoint - API endpoint URL
     * @param {Object} data - Request payload
     * @param {Object} [options={}] - Additional fetch configuration
     * @param {number} [cacheDuration=60] - Cache lifetime in seconds
     * @param {boolean} [bypassCache=false] - Force fresh data fetch
     * @param {boolean} [logError=true] - Enable error logging
     * 
     * @returns {Promise} Cancellable fetch promise with cache support
     * 
     * @example
     * debouncedFetchMethods.put('/api/users/1', { name: 'Updated Name' });
     */
    put: debounce((endpoint, data, options = {}, cacheDuration = 60, bypassCache = false, logError = true) => {
        const config = {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        };
        return fetchWithCache(endpoint, config, cacheDuration, bypassCache, logError);
    }),

    /**
     * Debounced DELETE request with caching
     * @function delete
     * @memberof debouncedFetchMethods
     * 
     * @param {string} endpoint - API endpoint URL
     * @param {Object} [data] - Optional request payload
     * @param {Object} [options={}] - Additional fetch configuration
     * @param {number} [cacheDuration=60] - Cache lifetime in seconds
     * @param {boolean} [bypassCache=false] - Force fresh data fetch
     * @param {boolean} [logError=true] - Enable error logging
     * 
     * @returns {Promise} Cancellable fetch promise with cache support
     * 
     * @example
     * debouncedFetchMethods.delete('/api/users/1');
     */
    delete: debounce((endpoint, data, options = {}, cacheDuration = 60, bypassCache = false, logError = true) => {
        const config = {
            ...options,
            method: 'DELETE',
            body: data ? JSON.stringify(data) : undefined
        };
        return fetchWithCache(endpoint, config, cacheDuration, bypassCache, logError);
    })
};


/**
 * Clears all caches in the application
 * This function handles:
 * 1. The LRU cache used by fetchWithCache
 * 2. Aborting all pending fetch requests
 * 3. Clearing browser cache for specific routes (optional)
 * 4. Removing auth-related cookies
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} [options.clearAuth=false] - Whether to clear authentication tokens
 * @param {boolean} [options.abortRequests=true] - Whether to abort pending requests
 * @param {string[]} [options.specificEndpoints=[]] - Clear cache only for these endpoints (empty = all)
 * @param {boolean} [options.notifyListeners=true] - Dispatch event to notify listeners about cache clearing
 * @returns {Promise<void>} A promise that resolves when all cache clearing operations are complete
 */
export async function clearAllCache({
    clearAuth = false,
    abortRequests = true,
    specificEndpoints = [],
    notifyListeners = true
} = {}) {
    // 1. Clear the LRU cache used for API responses
    if (specificEndpoints.length > 0) {
        // Clear cache for specific endpoints
        specificEndpoints.forEach(endpoint => {
            clearCache(endpoint);
        });
    } else {
        // Clear all cache
        clearCache();
    }

    // 2. Abort all pending fetch requests if needed
    if (abortRequests) {
        Array.from(abortControllers.keys()).forEach(key => {
            const controller = abortControllers.get(key);
            controller.abort();
            abortControllers.delete(key);
        });
    }

    // 3. Clear auth tokens if requested
    if (clearAuth) {
        const cookies = new Cookies();
        ['token', 'tokenExpiration'].forEach(key => cookies.remove(key));
    }

    // 4. Notify any listeners that cache has been cleared
    if (notifyListeners && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cacheCleared', {
            detail: {
                timestamp: Date.now(),
                clearedEndpoints: specificEndpoints.length > 0 ? specificEndpoints : 'all',
                authCleared: clearAuth
            }
        }));
    }

    // Wait a tick to ensure all operations complete
    await new Promise(resolve => setTimeout(resolve, 0));

    // Log the cache clearing operation for debugging
    const isClient = typeof window !== "undefined";
}

export { fetchWithAuth, fetchWithCache, clearCache, debouncedFetchMethods };