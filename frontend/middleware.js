import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    
    // Define protected routes that require authentication
    const protectedRoutes = [
        '/service-history',
        '/wallet',
        '/settings',
        '/settings/change-password',
        '/categories',
        '/services'
    ];
    
    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => {
        if (route === '/categories' || route === '/services') {
            // Handle dynamic routes like /categories/[slug] and /services/[slug]
            return pathname.startsWith(route);
        }
        return pathname === route;
    });
    
    // If user is on homepage and authenticated, redirect to categories
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/categories', request.url));
        }
    }
    
    // If user is on protected route but not authenticated, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    return NextResponse.next();
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