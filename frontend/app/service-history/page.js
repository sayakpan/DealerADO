"use client"

import React, { useState, useEffect } from 'react'
import ServiceHeader from '@/components/ui/serviceHeader'
import { getServiceHistory } from '@/services/services'
import { formatDate } from '@/utils/dateUtils'

const ServiceHistoryPage = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('all') // all, success, failed

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true)
                const historyData = await getServiceHistory()
                setHistory(historyData)
            } catch (err) {
                setError(err.message)
                console.error("Error fetching service history:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    const filteredHistory = history.filter(item => {
        if (filter === 'all') return true
        if (filter === 'success') return item.status === 'success'
        if (filter === 'failed') return item.status === 'failed'
        return true
    })

    const getStatusColor = (status) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )
            case 'failed':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )
            case 'pending':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                )
            default:
                return null
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Service History" />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-gray-600">Loading service history...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <ServiceHeader title="Service History" />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-[#B52628]">Error loading service history: {error}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ServiceHeader title="Service History" />

            {/* Service History Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
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
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    filter === tab.key
                                        ? 'bg-white text-[#B52628] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* History List */}
                {filteredHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-2">No service history found</div>
                        <div className="text-gray-400 text-sm">
                            {filter !== 'all' 
                                ? `No ${filter} services found. Try changing the filter.`
                                : 'You haven\'t used any services yet.'
                            }
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredHistory.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.service_name || 'Unknown Service'}
                                            </h3>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                {getStatusIcon(item.status)}
                                                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Unknown'}
                                            </span>
                                        </div>
                                        
                                        <div className="text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-4">
                                                <span>
                                                    <strong>Date:</strong> {formatDate(item.created_at) || 'Unknown'}
                                                </span>
                                                {item.request_data && (
                                                    <span>
                                                        <strong>Input:</strong> {JSON.stringify(item.request_data).substring(0, 50)}...
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {item.error_message && (
                                            <div className="text-sm text-red-600 mb-2">
                                                <strong>Error:</strong> {item.error_message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        {item.status === 'success' && item.result_data && (
                                            <button
                                                onClick={() => {
                                                    // TODO: Implement download functionality
                                                    console.log('Download result for:', item.id)
                                                }}
                                                className="px-3 py-1.5 bg-[#B52628] hover:bg-[#9e1f21] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download
                                            </button>
                                        )}
                                        
                                        <button
                                            onClick={() => {
                                                // TODO: Implement view details functionality
                                                console.log('View details for:', item.id)
                                            }}
                                            className="px-3 py-1.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium rounded-md transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ServiceHistoryPage