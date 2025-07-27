'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper that ensures children only render on the client
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to render after hydration
 */
export default function ClientOnly({ children }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;
    return <>{children}</>;
}