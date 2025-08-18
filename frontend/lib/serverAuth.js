import { cookies, headers } from 'next/headers';

// Server-side authentication utilities
export async function getServerAuthState() {
    const headersList = await headers();
    const cookieStore = await cookies();
    
    const isAuthenticated = headersList.get('x-user-authenticated') === 'true';
    const sessionExpired = headersList.get('x-session-expired') === 'true';
    
    if (!isAuthenticated) {
        return {
            isAuthenticated: false,
            user: null,
            sessionExpired
        };
    }
    
    const user = {
        firstName: headersList.get('x-user-first-name') || '',
        lastName: headersList.get('x-user-last-name') || '',
        email: headersList.get('x-user-email') || '',
        mobile: headersList.get('x-user-mobile') || '',
        role: headersList.get('x-user-role') || ''
    };
    
    return {
        isAuthenticated: true,
        user,
        sessionExpired
    };
}

export async function getServerToken() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
}

export async function clearSessionExpiredFlag() {
    const cookieStore = await cookies();
    // This will be handled by the client component to clear the flag
    return cookieStore.get('sessionExpired')?.value === 'true';
}
