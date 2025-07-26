import { fetchWithAuth } from '@/utils/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const TOKEN_COOKIE_KEY = 'token';
const TOKEN_EXPIRATION_COOKIE_KEY = 'tokenExpiration';
const COOKIE_OPTIONS = {
    maxAge: 1209600,
    path: '/',
    sameSite: 'lax',
    secure: false,
};

export async function login({ email, password }) {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const payload = { email, password };
        const res = await fetchWithAuth.post(`/api/accounts/login/`, payload);

        if (!res.success) {
            throw new Error(res.message || 'Login failed');
        }

        cookies.set(TOKEN_COOKIE_KEY, res.data.token, COOKIE_OPTIONS);
        cookies.set(TOKEN_EXPIRATION_COOKIE_KEY, new Date().getTime() + 1209600 * 1000, COOKIE_OPTIONS);
        return res;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function register({ email, password, first_name, last_name }) {
    try {
        if (!email || !password || !first_name || !last_name) {
            throw new Error('All fields are required');
        }
        const payload = { email, password, first_name, last_name };
        const res = await fetchWithAuth.post(`/api/accounts/register/`, payload);

        if (!res.success) {
            throw new Error(res.message || 'Registration failed');
        }

        return res;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function logout() {
    const token = getToken();

    try {
        const res = await fetchWithAuth.post(`/api/accounts/logout/`);
        if (!res.success) {
            throw new Error(res.message || 'Logout failed');
        }

        cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
        cookies.remove(TOKEN_EXPIRATION_COOKIE_KEY, { path: '/' });
        return res;
    } catch (e) {
        console.warn('Logout API call failed:', e.message);
    }

    cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
}

export function getToken() {
    return cookies.get(TOKEN_COOKIE_KEY);
}

export function isAuthenticated() {
    return !!getToken();
}