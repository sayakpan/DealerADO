"use client"

import { useState, useRef, useCallback } from "react"
import { getUsageLogs, getRenderedLog, generatePdf } from "@/services/services"
import { formatDate } from "@/utils/dateUtils"
import { Download, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import ServiceHeader from "@/components/ui/serviceHeader"
import { ServiceHistoryCardSkeleton } from "@/components/skeletons/ServiceHistorySkeleton"
import { ModalSkeleton } from "@/components/skeletons/ModalSkeleton"
import RenderedLogClient from "../ui/RenderedLogClient"
import { toast } from "@/plugin/toast"

export default function ServiceHistoryPageClient({ initialLogs, initialNextUrl }) {
    const [logs, setLogs] = useState(initialLogs || [])
    const [loadingMore, setLoadingMore] = useState(false)
    const [nextUrl, setNextUrl] = useState(initialNextUrl)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("all")
    const observerRef = useRef()
    const [expandedLogId, setExpandedLogId] = useState(null)
    const [renderedLog, setRenderedLog] = useState(null)
    const [loadingDetails, setLoadingDetails] = useState(false)

    const handleViewDetails = async (logId) => {
        if (expandedLogId === logId) {
            setExpandedLogId(null)
            setRenderedLog(null)
            return
        }

        setExpandedLogId(logId)
        setLoadingDetails(true)
        setRenderedLog(null)
        try {
            const data = await getRenderedLog(logId)
            setRenderedLog(data)
        } catch (error) {
            console.error("Failed to fetch rendered log:", error)
        } finally {
            setLoadingDetails(false)
        }
    }

    const loadMoreLogs = useCallback(async (url) => {
        try {
            setLoadingMore(true)
            const response = await getUsageLogs(url)
            setLogs((prev) => [...prev, ...response.results])
            setNextUrl(response.next)
        } catch (err) {
            setError("Failed to load more usage logs")
            console.error("Error loading more logs:", err)
        } finally {
            setLoadingMore(false)
        }
    }, [])

    // Intersection Observer for infinite scroll
    const lastLogElementRef = useCallback(
        (node) => {
            if (loadingMore || !nextUrl) return
            if (observerRef.current) observerRef.current.disconnect()

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && nextUrl && !loadingMore) {
                    loadMoreLogs(nextUrl)
                }
            })

            if (node) observerRef.current.observe(node)
        },
        [loadingMore, nextUrl, loadMoreLogs],
    )

    const filteredLogs = logs.filter((item) => {
        if (filter === "all") return true
        if (filter === "success") return item.status === "success"
        if (filter === "failed") return item.status === "failed"
        return true
    })

    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "text-green-600 bg-green-50 border-green-200"
            case "failed":
                return "text-red-600 bg-red-50 border-red-200"
            default:
                return "text-yellow-600 bg-yellow-50 border-yellow-200"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "success":
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case "failed":
                return <XCircle className="w-4 h-4 text-red-500" />
            default:
                return <AlertCircle className="w-4 h-4 text-yellow-500" />
        }
    }

    const downloadResponse = async (log) => {
        try {
            // Step 1: Generate the PDF and get the URL
            const pdfData = await generatePdf(log.id, log.service_name)
            if (pdfData?.success) {
                toast.success("PDF downloaded successfully!", { title: "Download Complete" })
            }
        } catch (error) {
            console.error("Error in PDF process:", error)
            toast.error("Failed to download PDF", { title: "Download Failed" })
        }
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center py-12">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Service History</h2>
                        <p className="text-gray-600">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mb-4 sm:mb-6 lg:mb-8">
                <ServiceHeader title="Service History" />
            </div>
            <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                {/* Filter Tabs - Enhanced Mobile Design */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <div className="flex overflow-x-auto sm:overflow-visible space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
                            {[
                                { key: "all", label: "All Services" },
                                { key: "success", label: "Successful" },
                                { key: "failed", label: "Failed" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${filter === tab.key ? "bg-white text-red-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {logs.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Service History Found</h2>
                        <p className="text-sm sm:text-base text-gray-600 px-4">You haven't used any services yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        {filteredLogs.map((log, index) => {
                            const isLast = index === filteredLogs.length - 1

                            return (
                                <div key={log.id} className="w-full">
                                    {/* Main Card - Enhanced Mobile Layout */}
                                    <div
                                        ref={isLast && nextUrl ? lastLogElementRef : null}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                    >
                                        <div className="p-3 sm:p-4 lg:p-6">
                                            <div className="space-y-3 sm:space-y-4">
                                                {/* Header Section */}
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                                            {getStatusIcon(log.status)}
                                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                                                {log.service_name}
                                                            </h3>
                                                            <span
                                                                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)} flex-shrink-0`}
                                                            >
                                                                {log.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{formatDate(log.created_at)}</p>
                                                    </div>

                                                    {/* Action Buttons - Mobile Optimized */}
                                                    {log.status !== "failed" && (
                                                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                                            <button
                                                                onClick={() => handleViewDetails(log.id)}
                                                                className="flex items-center cursor-pointer gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span className="hidden xs:inline">View</span>
                                                            </button>
                                                            <button
                                                                onClick={() => downloadResponse(log)}
                                                                className="flex items-center cursor-pointer gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
                                                                title="Download Response"
                                                            >
                                                                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span className="hidden xs:inline">Download</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Details Section - Responsive Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-md p-2 sm:p-3">
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium">Price:</span>
                                                        <span>₹{log.price_at_time}</span>
                                                    </div>
                                                    {log.response_time_ms && (
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-medium">Response:</span>
                                                            <span>{log.response_time_ms}ms</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium">Status:</span>
                                                        <span>{log.http_status_code}</span>
                                                    </div>
                                                    {log.wallet_txn_id && (
                                                        <div className="flex items-center gap-1 col-span-1 sm:col-span-2 lg:col-span-1">
                                                            <span className="font-medium">Txn ID:</span>
                                                            <span className="truncate" title={log.wallet_txn_id}>
                                                                {log.wallet_txn_id}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Request Data - Commented out but improved for mobile if needed */}
                                            {/* {log.form_data_sent && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        Request Data
                                                    </h4>
                                                    <div className="bg-gray-50 rounded-md p-3 text-xs sm:text-sm text-gray-700 overflow-hidden">
                                                        <pre className="whitespace-pre-wrap break-all overflow-x-auto">
                                                            {JSON.stringify(log.form_data_sent, null, 2)}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>

                                    {/* Rendered Log Details - Mobile Optimized */}
                                    {expandedLogId === log.id && (
                                        <div className="mt-2 sm:mt-3">
                                            {loadingDetails ? (
                                                <ModalSkeleton />
                                            ) : renderedLog ? (
                                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                    <RenderedLogClient log={renderedLog} />
                                                </div>
                                            ) : (
                                                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center text-gray-500">
                                                    <p>Could not load details.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Loading Skeletons */}
                        {loadingMore && (
                            <>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <ServiceHistoryCardSkeleton key={`loading-${index}`} />
                                ))}
                            </>
                        )}

                        {/* End Message */}
                        {!nextUrl && logs.length > 0 && (
                            <div className="text-center py-6 sm:py-8">
                                <p className="text-sm sm:text-base text-gray-500 px-4">
                                    You've reached the end of your service history
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
