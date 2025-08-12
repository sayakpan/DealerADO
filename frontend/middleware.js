import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const status = searchParams.get('status');
    
    // Define protected routes that require authentication
    const protectedRoutes = [
        '/service-history',
        '/wallet',
        '/settings',
        '/settings/change-password',
        '/categories',
        '/services'
    ];
    
    // Define public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/about-us',
        '/contact-us',
        '/privacy-policy',
        '/terms-and-conditions'
    ];
    
    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => {
        if (route === '/categories' || route === '/services') {
            return pathname.startsWith(route);
        }
        return pathname === route;
    });
    
    // Handle 401 status - clear all cookies and redirect to login with session expired message
    // Only redirect if not already on login page to prevent infinite loop
    if (status === '401' && pathname !== '/login') {
        const response = NextResponse.redirect(new URL('/login?status=401', request.url));
        
        // Clear all authentication cookies server-side
        response.cookies.delete('token');
        response.cookies.delete('tokenExpiration');
        response.cookies.delete('userFirstName');
        response.cookies.delete('userLastName');
        response.cookies.delete('userMobile');
        response.cookies.delete('userEmail');
        response.cookies.delete('userRole');
        
        // Set a flag to show session expired message
        response.cookies.set('sessionExpired', 'true', { 
            maxAge: 10, // 10 seconds, just enough for the page to load and show the message
            path: '/' 
        });
        
        return response;
    }
    
    // If already on login page with 401 status, just clear cookies and continue
    if (status === '401' && pathname === '/login') {
        const response = NextResponse.next();
        
        // Clear all authentication cookies server-side
        response.cookies.delete('token');
        response.cookies.delete('tokenExpiration');
        response.cookies.delete('userFirstName');
        response.cookies.delete('userLastName');
        response.cookies.delete('userMobile');
        response.cookies.delete('userEmail');
        response.cookies.delete('userRole');
        
        // Set a flag to show session expired message
        response.cookies.set('sessionExpired', 'true', { 
            maxAge: 10, // 10 seconds, just enough for the page to load and show the message
            path: '/' 
        });
        
        // Pass session expired flag
        response.headers.set('x-session-expired', 'true');
        response.headers.set('x-user-authenticated', 'false');
        
        return response;
    }
    
    // If user is on login page and authenticated (without 401 status), redirect to categories
    if (pathname === '/login' && token && status !== '401') {
        return NextResponse.redirect(new URL('/categories', request.url));
    }
    
    // If user is on signup page and authenticated, redirect to categories
    if (pathname === '/signup' && token) {
        return NextResponse.redirect(new URL('/categories', request.url));
    }
    
    // If user is on homepage and authenticated, redirect to categories
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/categories', request.url));
    }
    
    // If user is on protected route but not authenticated, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Add auth state to response headers for server components
    const response = NextResponse.next();
    
    // Pass authentication state to the page via headers
    if (token) {
        response.headers.set('x-user-authenticated', 'true');
        response.headers.set('x-user-first-name', request.cookies.get('userFirstName')?.value || '');
        response.headers.set('x-user-last-name', request.cookies.get('userLastName')?.value || '');
        response.headers.set('x-user-email', request.cookies.get('userEmail')?.value || '');
        response.headers.set('x-user-mobile', request.cookies.get('userMobile')?.value || '');
        response.headers.set('x-user-role', request.cookies.get('userRole')?.value || '');
    } else {
        response.headers.set('x-user-authenticated', 'false');
    }
    
    // Pass session expired flag
    if (request.cookies.get('sessionExpired')?.value === 'true') {
        response.headers.set('x-session-expired', 'true');
    }
    
    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};