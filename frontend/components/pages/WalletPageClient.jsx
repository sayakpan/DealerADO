"use client"

import React from 'react'
import Image from 'next/image'
import ServiceHeader from '@/components/ui/serviceHeader'

const WalletPageClient = ({ walletData }) => {
    const formatAmount = (amount) => {
        return parseFloat(amount).toFixed(2)
    }

    const formatTransactionType = (type) => {
        switch (type) {
            case 'recharge':
                return 'Points Added'
            case 'debit':
                return 'Paid For Order'
            case 'refund':
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
                                <button className="w-full max-w-[90%] h-12 bg-red-700 hover:bg-red-800 rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.20)] flex justify-center items-center transition-colors">
                                    <span className="text-white text-base font-semibold capitalize">
                                        Add Points
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-[570px] bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">History:</h2>

                            <div className="space-y-4">
                                {walletData?.history?.results?.length > 0 ? (
                                    walletData.history.results.map((transaction, index) => (
                                        <div 
                                            key={transaction.id} 
                                            className={`flex justify-between items-center py-3 ${
                                                index < walletData.history.results.length - 1 ? 'border-b border-gray-100' : ''
                                            }`}
                                        >
                                            <div>
                                                <div className="font-semibold text-gray-800">
                                                    {formatTransactionType(transaction.transaction_type)}
                                                    {transaction.service_name && transaction.service_name !== 'Manual Admin Adjustment' && ':'}
                                                </div>
                                                <div className="text-gray-500 text-sm">
                                                    {transaction.service_name +' '+ formatDateTime(transaction.timestamp)}
                                                </div>
                                            </div>
                                            <div className={`font-semibold ${
                                                transaction.transaction_type !== 'debit' 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                {transaction.transaction_type !== 'debit' ? '(+)' : '(-)'} {Math.abs(parseFloat(transaction.amount_change)).toFixed(0)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No transaction history available
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