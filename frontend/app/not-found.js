'use client';
import ServiceHeader from '@/components/ui/serviceHeader';
import { Home } from 'lucide-react';

export default function NotFound() {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-white">
            <ServiceHeader title="Page Not Found" />
            <div className="text-center max-w-lg mx-auto">
                {/* 404 Number */}
                {/* <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold text-gray-200 select-none mb-4">
                        404
                    </h1>
                </div> */}

                {/* Error message */}
                <div className="mb-8">
                    <h1 className="mt-5 text-8xl md:text-9xl font-bold text-gray-200 select-none mb-4">
                        404
                    </h1>
                    <p className="text-gray-600 text-lg mb-4">
                        The page you're looking for doesn't exist.
                    </p>
                    <p className="text-gray-500">
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Action button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleGoHome}
                        className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#9e1f21' }}
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}