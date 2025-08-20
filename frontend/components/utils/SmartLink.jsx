'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

export default function SmartLink({
    href,
    children,
    className = '',
    onClick,
    beforeClick,
    prefetch = false,
    scrollEnabled = true,
    ...props
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setIsLoading } = useLoading();

    const normalizePath = (path) => path.replace(/\/+$/, '').trim();

    const isSameRoute = (targetHref) => {
        const query = searchParams.toString();
        const currentPath = `${pathname}${query ? `?${query}` : ''}`;

        const isSamePage = normalizePath(targetHref) === normalizePath(currentPath);

        if (isSamePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return isSamePage;
    };

    const handleClick = async (e) => {
        // Run beforeClick first if provided
        if (beforeClick) {
            try {
                const shouldContinue = await beforeClick(e, href);
                // If beforeClick returns false, prevent navigation
                if (shouldContinue === false) {
                    e.preventDefault();
                    return;
                }
            } catch (error) {
                console.error('Error in beforeClick handler:', error);
                e.preventDefault();
                return;
            }
        }

        // Prevent navigation if on a categories page and clicking the homepage link (header logo)
        const isCategoriesPage = pathname.startsWith('/categories');
        const isHomepageLink = href === '/';

        if (isCategoriesPage && isHomepageLink) {
            e.preventDefault();
            if (onClick) onClick(e);
            return;
        }

        if (
            // Prevent loading behavior for certain conditions
            e.defaultPrevented ||
            e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||   // Modifier keys
            e.button !== 0 ||                                     // Not left click
            props.target === '_blank'                             // Explicit new tab
        ) {
            if (onClick) onClick(e);
            return;
        }

        if (pathname === href) {
            if (onClick) onClick(e);
            return;
        }

        e.preventDefault();

        let targetHref = '';

        if (typeof href === 'string') {
            targetHref = href;
        } else if (typeof href === 'object') {
            const queryString = new URLSearchParams(href.query || {}).toString();
            targetHref = `${href.pathname}${queryString ? `?${queryString}` : ''}`;
        }

        if (isSameRoute(targetHref)) {
            if (onClick) onClick(e);
            return;
        }

        try {
            setIsLoading(true);
            await router.push(targetHref);
            if (scrollEnabled) window.scrollTo({ top: 0, behavior: 'instant' });
        } catch (error) {
            console.error('Navigation error:', error);
            setIsLoading(false); // Clear loading on error
        } finally {
            if (onClick) onClick(e);
        }
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleClick}
            prefetch={prefetch}
            {...props}
        >
            {children}
        </Link>
    );
}
