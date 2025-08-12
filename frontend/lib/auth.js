import { fetchWithAuth } from '@/utils/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const TOKEN_COOKIE_KEY = 'token';
export const TOKEN_EXPIRATION_COOKIE_KEY = 'tokenExpiration';
export const USER_FIRST_NAME_COOKIE_KEY = 'userFirstName';
export const USER_LAST_NAME_COOKIE_KEY = 'userLastName';
export const USER_MOBILE_COOKIE_KEY = 'userMobile';
export const USER_EMAIL_COOKIE_KEY = 'userEmail';
export const USER_ROLE_COOKIE_KEY = 'userRole';

const COOKIE_OPTIONS = {
    maxAge: 1209600,
    path: '/',
    sameSite: 'lax',
    secure: false,
};

export async function login({ user_email, password }) {
    try {
        if (!user_email || !password) {
            throw new Error('Email and password are required');
        }
        const payload = { email: user_email, password: password };
        const res = await fetchWithAuth.post(`/api/accounts/login/`, payload);

        if (!res.success) {
            return res;
        }

        const { first_name, last_name, mobile_number, email, role } = res.data.user;

        cookies.set(TOKEN_COOKIE_KEY, res.data.token, COOKIE_OPTIONS);
        cookies.set(TOKEN_EXPIRATION_COOKIE_KEY, new Date().getTime() + 1209600 * 1000, COOKIE_OPTIONS);
        cookies.set(USER_FIRST_NAME_COOKIE_KEY, first_name, COOKIE_OPTIONS);
        cookies.set(USER_LAST_NAME_COOKIE_KEY, last_name, COOKIE_OPTIONS);
        cookies.set(USER_MOBILE_COOKIE_KEY, mobile_number, COOKIE_OPTIONS);
        cookies.set(USER_EMAIL_COOKIE_KEY, email, COOKIE_OPTIONS);
        cookies.set(USER_ROLE_COOKIE_KEY, role, COOKIE_OPTIONS);
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
            return res;
        }

        return res;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function forgotPassword({ email }) {
    try {
        if (!email) {
            throw new Error('Email is required');
        }
        const payload = { email };
        const res = await fetchWithAuth.post(`/api/accounts/reset-password/`, payload, {}, true, false);

        if (!res.success) {
            return res;
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
            return res;
        }

        cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
        cookies.remove(TOKEN_EXPIRATION_COOKIE_KEY, { path: '/' });
        cookies.remove(USER_FIRST_NAME_COOKIE_KEY, { path: '/' });
        cookies.remove(USER_LAST_NAME_COOKIE_KEY, { path: '/' });
        cookies.remove(USER_MOBILE_COOKIE_KEY, { path: '/' });
        cookies.remove(USER_EMAIL_COOKIE_KEY, { path: '/' });
        cookies.remove(USER_ROLE_COOKIE_KEY, { path: '/' });

        return res;
    } catch (e) {
        console.warn('Logout API call failed:', e.message);
    }

    cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });
}

export function getToken() {
    //check the path query is /login?s
    return cookies.get(TOKEN_COOKIE_KEY);
}

export function getUserDetails() {
    return {
        firstName: cookies.get(USER_FIRST_NAME_COOKIE_KEY),
        lastName: cookies.get(USER_LAST_NAME_COOKIE_KEY),
        mobile: cookies.get(USER_MOBILE_COOKIE_KEY),
        email: cookies.get(USER_EMAIL_COOKIE_KEY),
        role: cookies.get(USER_ROLE_COOKIE_KEY),
    };
}

export function isAuthenticated() {
    return !!getToken();
}