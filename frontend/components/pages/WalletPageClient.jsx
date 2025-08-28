"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ServiceHeader from '@/components/ui/serviceHeader'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { fetchWithAuth } from "@/utils/api"
import { Filter } from 'lucide-react'

const WalletPageClient = ({ walletData: initialWalletData }) => {
    const [walletData, setWalletData] = useState(initialWalletData)
    const [loading, setLoading] = useState(false)
    const observerTarget = useRef(null)
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        transaction_type: '',
        start_date: '',
        end_date: '',
        service_name: '',
        ordering: '-timestamp'
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && walletData?.history?.next) {
                    loadMoreData()
                }
            },
            { threshold: 0.5 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current)
            }
        }
    }, [loading, walletData?.history?.next])

    const buildQueryParams = (extra = {}) => {
        const params = new URLSearchParams();

        if (filters.transaction_type) params.append('transaction_type', filters.transaction_type);
        if (filters.start_date) params.append('start_date', filters.start_date);
        if (filters.end_date) params.append('end_date', filters.end_date);
        if (filters.service_name) params.append('service_name', filters.service_name);
        if (filters.ordering) params.append('ordering', filters.ordering);

        if (extra.page) params.append('page', extra.page);

        return params.toString();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showFilters && !e.target.closest(".filter-dropdown")) {
                setShowFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showFilters]);

    const loadMoreData = async (reset = false, resetall = false) => {
        try {
            setLoading(true);
            console.log(resetall)
            let page = null;
            if (!reset && walletData?.history?.next) {
                const url = new URL(walletData.history.next);
                page = url.searchParams.get('page');
            }

            const response = await fetchWithAuth(`/api/wallet/?${resetall ? '' : buildQueryParams({ page })}`);

            if (response?.data) {
                const newData = response.data;
                setWalletData(prev => ({
                    ...newData,
                    history: {
                        ...newData.history,
                        results: reset
                            ? newData.history.results
                            : [...(prev.history?.results || []), ...(newData.history?.results || [])]
                    }
                }));
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
        } finally {
            setLoading(false);
            setShowFilters(false);
        }
    };

    const formatAmount = (amount) => {
        return parseFloat(amount).toFixed(2)
    }

    const formatTransactionType = (type) => {
        switch (type) {
            case 'recharge':
                return 'Credited Points'
            case 'debit':
                return 'Debited For Order'
            case 'reversal':
                return 'Refund For Order'
            default:
                return type
        }
    }

    const formatDateTime = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // for AM/PM format
        });
    };

    const getTransactionIcon = (type) => {
        return type == 'debit' ? (
            <ArrowUpRight className="w-4 h-4" />
        ) : (
            <ArrowDownLeft className="w-4 h-4" />
        );
    };

    const handleAddPoints = () => {
        const number = '917903152096';
        const message = `Hello Admin,  
        
I would like to recharge my wallet.  
Email ID: ${walletData?.user?.email}
Please process my request. Thank you!`;
        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Wallet" />
            {/* Wallet Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
                    {/* Wallet Balance Card */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[570px] mx-auto h-64 sm:h-72 relative bg-slate-700 rounded-[30px] overflow-hidden">

                            {/* Side Rings - Left Bottom - Responsive */}
                            <div className="w-32 h-32 sm:w-44 sm:h-44 left-[-10%] bottom-[-15%] absolute opacity-10 rounded-full border-[16px] sm:border-[22.54px] border-white" />
                            <div className="w-48 h-48 sm:w-64 sm:h-64 left-[-15%] bottom-[-25%] absolute opacity-10 rounded-full border-[16px] sm:border-[22.54px] border-white" />

                            {/* Side Rings - Right Top - Responsive */}
                            <div className="w-32 h-32 sm:w-44 sm:h-44 right-[-10%] top-[-15%] absolute opacity-10 rounded-full border-[16px] sm:border-[23.12px] border-white" />
                            <div className="w-48 h-48 sm:w-64 sm:h-64 right-[-15%] top-[-25%] absolute opacity-10 rounded-full border-[16px] sm:border-[23.12px] border-white" />

                            {/* Smoke/Blur Effect - Top - Responsive */}
                            <div className="w-24 h-24 sm:w-36 sm:h-36 left-[-8%] top-[-20%] absolute bg-white rounded-full blur-[80px] sm:blur-[114.35px]" />

                            {/* Footer Smoke Effect */}
                            <Image
                                src="/images/core/footer-smoke.png"
                                alt="Footer Smoke Effect"
                                width={570}
                                height={150}
                                className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none"
                            />

                            {/* Main Content - Responsive Layout */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 py-6">
                                {/* Car Icon and Balance */}
                                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                                    {/* Car Icon */}
                                    <Image
                                        src="/images/wallet/logo.png"
                                        alt="Car Icon"
                                        width={48}
                                        height={56}
                                        className="w-12 h-14 sm:w-14 sm:h-16 rounded-[20.69px] bg-transparent flex-shrink-0"
                                    />

                                    {/* Balance Amount */}
                                    <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                                        {formatAmount(walletData?.balance?.amount || 0)}
                                    </div>
                                </div>

                                {/* Available Points Text */}
                                <div className="text-center text-white text-base sm:text-lg font-normal mb-6 sm:mb-8">
                                    Available Dealerdo Point
                                </div>

                                {/* Add Points Button - Responsive */}
                                <button onClick={handleAddPoints} className="w-full max-w-[90%] h-12 bg-red-700 hover:bg-red-800 rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center transition-colors">
                                    <span className="text-white text-base font-semibold capitalize">
                                        Add Points
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Transaction History */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[570px] bg-white rounded-2xl p-3 md:p-6 shadow-sm">
                            <div className='flex justify-between items-start mb-2'>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
                                {/* Filter Button */}
                                <div className="flex justify-end relative filter-dropdown">
                                    <button
                                        onClick={() => setShowFilters(prev => !prev)}
                                        className="cursor-pointer flex items-center gap-2 px-2.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-md text-gray-700 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </button>

                                    {/* Dropdown Panel */}
                                    {showFilters && (
                                        <div className="absolute z-30 right-0 top-full mt-2 w-72 md:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 md:p-6 backdrop-blur-sm">
                                            <div className="space-y-1 md:space-y-3">
                                                {/* Transaction Type */}
                                                <div className="space-y-1 md:space-y-2">
                                                    <label className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide">Transaction Type</label>
                                                    <select
                                                        className="w-full bg-white border border-gray-200 rounded-sm px-2 md:px-3 py-1.5 md:py-2.5 text-gray-700 text-xs md:text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                                        value={filters.transaction_type}
                                                        onChange={(e) => setFilters(f => ({ ...f, transaction_type: e.target.value }))}
                                                    >
                                                        <option value="">All Types</option>
                                                        <option value="debit">Debit</option>
                                                        <option value="recharge">Recharge</option>
                                                        <option value="reversal">Refund</option>
                                                    </select>
                                                </div>

                                                {/* Date Range */}
                                                <div className="space-y-1 md:space-y-2">
                                                    <label className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide">Date Range</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="date"
                                                            className="uppercase flex-1 w-[48%] border border-gray-200 rounded-sm px-2 md:px-3 py-1.5 md:py-2.5 text-[10px] md:text-xs text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                                            value={filters.start_date}
                                                            onChange={(e) => setFilters(f => ({ ...f, start_date: e.target.value }))}
                                                        />
                                                        <input
                                                            type="date"
                                                            className="uppercase flex-1 w-[48%] border border-gray-200 rounded-sm px-2 md:px-3 py-1.5 md:py-2.5 text-[10px] md:text-xs text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                                            value={filters.end_date}
                                                            onChange={(e) => setFilters(f => ({ ...f, end_date: e.target.value }))}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Service Name */}
                                                <div className="space-y-1 md:space-y-2">
                                                    <label className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide">Service Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Search by service name..."
                                                        className="w-full border border-gray-200 rounded-sm px-2 md:px-3 py-1.5 md:py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                                        value={filters.service_name}
                                                        onChange={(e) => setFilters(f => ({ ...f, service_name: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Ordering */}
                                                <div className="space-y-1 md:space-y-2">
                                                    <label className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wide">Sort By</label>
                                                    <select
                                                        className="w-full border border-gray-200 rounded-sm px-2 md:px-3 py-1.5 md:py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                                                        value={filters.ordering}
                                                        onChange={(e) => setFilters(f => ({ ...f, ordering: e.target.value }))}
                                                    >
                                                        <option value="-timestamp">Newest First</option>
                                                        <option value="timestamp">Oldest First</option>
                                                        <option value="-amount_change">Amount (High → Low)</option>
                                                        <option value="amount_change">Amount (Low → High)</option>
                                                    </select>
                                                </div>

                                                {/* Apply / Reset */}
                                                <div className="flex justify-between gap-2 pt-2">
                                                    <button
                                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 rounded-md text-xs md:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                                        onClick={async () => {
                                                            loadMoreData(true); // reload with new filters
                                                        }}
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <div className="animate-spin w-4 h-4 border-[2px] border-white border-t-transparent rounded-full"></div>
                                                        ) : (
                                                            "Apply Filters"
                                                        )}
                                                    </button>
                                                    <button
                                                        className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-200 hover:shadow-sm"
                                                        onClick={() => {
                                                            setFilters({
                                                                transaction_type: '',
                                                                start_date: '',
                                                                end_date: '',
                                                                service_name: '',
                                                                ordering: '-timestamp'
                                                            });
                                                            setShowFilters(false);
                                                            loadMoreData(true, true);
                                                        }}
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {walletData?.history?.results?.length > 0 ? (
                                    walletData.history.results.map((transaction, index) => (
                                        <div
                                            key={transaction.id}
                                            className={`flex justify-between items-center py-3 ${index < walletData.history.results.length - 1 ? 'border-b border-gray-100' : ''
                                                }`}
                                        >
                                            <div className='flex gap-2 items-center'>
                                                <div className={`rounded-full p-2 ${transaction.transaction_type !== 'debit'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {getTransactionIcon(transaction.transaction_type)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800 text-sm md:text-base">
                                                        {formatTransactionType(transaction.transaction_type)}
                                                        {transaction.service_name && transaction.service_name !== 'Manual Admin Adjustment' && ':'}
                                                    </div>
                                                    <div className="text-gray-500 text-[10px] md:text-[12px]">
                                                        {transaction.service_name + ' - ' + formatDateTime(transaction.timestamp)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`w-1/3 font-bold text-base md:text-xl flex flex-col items-end ${transaction.transaction_type !== 'debit'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                                }`}>
                                                <span>
                                                    {transaction.transaction_type !== 'debit' ? '+' : '-'} {Math.abs(parseFloat(transaction.amount_change)).toFixed(0)}
                                                </span>
                                                <span className='text-gray-600 text-[8px] md:text-[10px] font-normal'>
                                                    {transaction.transaction_type !== 'debit' ? 'Received' : 'Spent'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No transaction history available
                                    </div>
                                )}
                            </div>
                            <div ref={observerTarget} className="mt-4 text-center">
                                {loading && (
                                    <div className="py-4">
                                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPageClient
