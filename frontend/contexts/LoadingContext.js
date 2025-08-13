'use client';
import React, { createContext, useContext, useState } from 'react';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const LoadingContext = createContext({
    isLoading: false,
    setIsLoading: () => { },
});

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Clear loading state when route changes
        setIsLoading(false);
    }, [pathname, searchParams]);

    // Additional safety: clear loading after a timeout
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 5000); // Clear loading after 5 seconds max

            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && <LoadingSpinner />}
        </LoadingContext.Provider>
    );
}

// Add this export for the useLoading hook
export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}