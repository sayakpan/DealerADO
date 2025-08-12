'use client';

import { useEffect } from 'react';
import Cookies from 'universal-cookie';

export default function ClientCleanup() {
    useEffect(() => {
        // Clean up any remaining client-side storage on app load
        const cookies = new Cookies();
        
        // If there's no server-side token but client storage exists, clean it up
        const hasServerToken = document.cookie.includes('token=');
        
        if (!hasServerToken && typeof window !== 'undefined') {
            // Clear any orphaned client storage
            const keysToRemove = [
                'access_token', 'refresh_token', 'token', 'authToken', 'user',
                'userFirstName', 'userLastName', 'userEmail', 'userMobile', 'userRole'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            });
        }
    }, []);

    return null; // This component doesn't render anything
}