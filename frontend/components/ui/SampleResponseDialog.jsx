"use client"

import React from "react"
import { useEffect } from "react"
import { X, Info, Maximize2, Minimize2 } from "lucide-react"
import RenderedLogClient from "@/components/ui/RenderedLogClient"

const SampleResponseDialog = ({
    isOpen,
    onClose,
    sampleResponseData,
    title = "Sample Service Response",
}) => {
    const [isMaximized, setIsMaximized] = React.useState(false)

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // Prevent body scroll when dialog is open
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized)
    }

    if (!isOpen) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 transform transition-all duration-300 ease-out ${
                    isMaximized 
                        ? 'w-[95vw] h-[95vh] m-4' 
                        : 'w-full max-w-4xl max-h-[85vh] m-4'
                } ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with gradient background */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                        <span className="truncate">{title}</span>
                    </h2>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMaximize}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
                            aria-label={isMaximized ? "Restore" : "Maximize"}
                            title={isMaximized ? "Restore" : "Maximize"}
                        >
                            {isMaximized ? (
                                <Minimize2 className="w-4 h-4 text-gray-600" />
                            ) : (
                                <Maximize2 className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-red-50 hover:text-[#B52628] rounded-lg transition-all duration-200 hover:scale-105"
                            aria-label="Close dialog"
                            title="Close (Esc)"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content with improved scrolling */}
                <div className="flex-1 overflow-y-auto">
                    <div className="h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                        <div className="">
                            {sampleResponseData ? (
                                <div className="space-y-4">
                                    {/* Main content */}
                                    <div className="bg-gray-50 rounded-lg p-4 border">
                                        <RenderedLogClient log={sampleResponseData} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Info className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-lg font-medium mb-2">No Sample Data Available</p>
                                    <p className="text-sm text-center max-w-md">
                                        Sample response data has not been provided for this service endpoint.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SampleResponseDialog
