'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getUsageLogs } from '@/services/services';
import { formatDate } from '@/utils/dateUtils';
import { Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ServiceHeader from '@/components/ui/serviceHeader';
import { ServiceHistorySkeleton, ServiceHistoryCardSkeleton } from '@/components/skeletons/ServiceHistorySkeleton';

export default function ServiceHistoryPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const observerRef = useRef();

    const loadLogs = useCallback(async (url = null) => {
        try {
            if (url) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const response = await getUsageLogs(url);

            if (url) {
                setLogs(prev => [...prev, ...response.results]);
            } else {
                setLogs(response.results);
            }

            setNextUrl(response.next);
        } catch (err) {
            setError('Failed to load usage logs');
            console.error('Error loading logs:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    // Intersection Observer for infinite scroll
    const lastLogElementRef = useCallback(node => {
        if (loading || loadingMore || !nextUrl) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextUrl && !loading && !loadingMore) {
                loadLogs(nextUrl);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, loadingMore, nextUrl, loadLogs]);

    const filteredLogs = logs.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'success') return item.status === 'success';
        if (filter === 'failed') return item.status === 'failed';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'success':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'failed':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
        }
    };

    const downloadResponse = (log) => {
        const dataStr = JSON.stringify(log.api_response, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${log.service_name}_${log.id}_response.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading && logs.length === 0) {
        return <ServiceHistorySkeleton count={4} />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center py-12">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Service History</h2>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={() => loadLogs()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mb-6 sm:mb-8">
                <ServiceHeader title="Service History" />
                {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Service History</h1>
                <p className="text-sm sm:text-base text-gray-600">View your complete service usage history and responses</p> */}
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Filter Tabs */}
                <div className="mb-6">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                        {[
                            { key: 'all', label: 'All Services' },
                            { key: 'success', label: 'Successful' },
                            { key: 'failed', label: 'Failed' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === tab.key
                                    ? 'bg-white text-red-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {logs.length === 0 ? (
                    <div className="text-center py-12">
                        <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Service History Found</h2>
                        <p className="text-sm sm:text-base text-gray-600">You haven't used any services yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {filteredLogs.map((log, index) => {
                            const isLast = index === filteredLogs.length - 1;

                            return (
                                <div key={log.id} className="w-full">
                                    {/* Main Card */}
                                    <div
                                        ref={isLast && nextUrl ? lastLogElementRef : null}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                    >
                                        <div className="p-4 sm:p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        {getStatusIcon(log.status)}
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {log.service_name}
                                                        </h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                                                            {log.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {formatDate(log.created_at)}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                        <span>Price: ₹{log.price_at_time}</span>
                                                        {log.response_time_ms && (
                                                            <span>Response Time: {log.response_time_ms}ms</span>
                                                        )}
                                                        <span>Status Code: {log.http_status_code}</span>
                                                        {log.wallet_txn_id && (
                                                            <span>Transaction ID: {log.wallet_txn_id}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => downloadResponse(log)}
                                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                                        title="Download Response"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Request Data */}
                                            {log.form_data_sent && (
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        Request Data
                                                    </h4>
                                                    <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
                                                        <pre className="whitespace-pre-wrap break-words">
                                                            {JSON.stringify(log.form_data_sent, null, 2)}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* API Response Code Block - Always Visible */}
                                    <div className="mt-3">
                                        <div className="bg-slate-900 rounded-lg border border-gray-300 overflow-hidden">
                                            <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex items-center justify-between">
                                                <span className="text-xs font-medium text-gray-600">API Response</span>
                                            </div>
                                            <div className="p-3 overflow-auto max-h-64 sm:max-h-80">
                                                <pre className="text-xs sm:text-sm text-cyan-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
                                                    {JSON.stringify(log.api_response, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {loadingMore && (
                            <>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <ServiceHistoryCardSkeleton key={`loading-${index}`} />
                                ))}
                            </>
                        )}

                        {!nextUrl && logs.length > 0 && (
                            <div className="text-center py-8">
                                <p className="text-sm sm:text-base text-gray-500">You've reached the end of your service history</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}