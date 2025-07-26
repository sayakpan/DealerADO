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
        console.log(res)
        if (!res.success) {
            throw new Error(res.message || 'Login failed');
        }

        cookies.set(TOKEN_COOKIE_KEY, res.data.token, COOKIE_OPTIONS);
        cookies.set(TOKEN_EXPIRATION_COOKIE_KEY, new Date().getTime() + 1209600 * 1000, COOKIE_OPTIONS);
        console.log(res.data.token)
        console.log(cookies)
        return res;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function logout() {
    const token = getToken();

    try {
        await fetchWithAuth(`/api/accounts/logout/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
        });
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