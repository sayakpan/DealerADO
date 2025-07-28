"use client"

import { CircleCheckBig, CircleX, Info, Send, X } from "lucide-react"

export default function Toast({ id, title, message, type, customIcon, removeToast }) {
    const toastStyles = {
        success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/25 dark:from-emerald-600 dark:to-emerald-700 dark:shadow-emerald-600/30",
        error: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/25 dark:from-red-600 dark:to-red-700 dark:shadow-red-600/30",
        info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25 dark:from-blue-600 dark:to-blue-700 dark:shadow-blue-600/30",
        wait: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-indigo-500/25 dark:from-indigo-600 dark:to-indigo-700 dark:shadow-indigo-600/30",
        plain: "bg-white text-gray-800 border border-gray-200 shadow-gray-500/10 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:shadow-gray-900/20",
    }

    const iconContainerStyles = {
        success: "bg-white/10 text-white dark:bg-white/25",
        error: "bg-white/10 text-white dark:bg-white/25",
        info: "bg-white/10 text-white dark:bg-white/25",
        wait: "bg-white/10 text-white dark:bg-white/25",
        plain: "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300",
    }

    const icons = {
        success: <CircleCheckBig className="w-5 h-5" />,
        error: <CircleX className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
        wait: (
            <div className="relative">
                <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        ),
        plain: <Send className="w-5 h-5" />,
    }

    const closeButtonStyles = {
        success: "hover:bg-white/20 text-white/80 hover:text-white dark:hover:bg-white/30",
        error: "hover:bg-white/20 text-white/80 hover:text-white dark:hover:bg-white/30",
        info: "hover:bg-white/20 text-white/80 hover:text-white dark:hover:bg-white/30",
        wait: "hover:bg-white/20 text-white/80 hover:text-white dark:hover:bg-white/30",
        plain: "hover:bg-gray-100 text-gray-400 hover:text-gray-600 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-200",
    }

    return (
        <div
            key={id}
            className={`
                ${toastStyles[type]} 
                flex items-start gap-3 p-3 rounded-lg shadow-lg backdrop-blur-sm
                transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl
                min-w-[320px] max-w-[420px] relative overflow-hidden
                animate-in slide-in-from-right-full fade-in
            `}
            role="alert"
            aria-live="polite"
        >
            {/* Icon Container */}
            <div
                className={`
                ${iconContainerStyles[type]} 
                flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 mt-0.5
            `}
            >
                {customIcon ? customIcon : icons[type]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm leading-tight mb-0.5">{title}</div>
                <div className="text-sm opacity-95 leading-relaxed font-medium">{message}</div>
            </div>

            {/* Close Button */}
            {type !== "wait" && (
                <button
                    onClick={removeToast}
                    className={`
                        ${closeButtonStyles[type]}
                        flex items-center justify-center w-6 h-6 rounded-md
                        transition-all duration-200 ease-out flex-shrink-0
                        focus:outline-none focus:ring-2 focus:ring-white/50
                        active:scale-95
                    `}
                    aria-label="Close notification"
                >
                    <X size={14} />
                </button>
            )}

            {/* Subtle border accent */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 dark:ring-white/20  pointer-events-none"></div>

            {/* Progress bar for wait type */}
            {type === "wait" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 dark:bg-white/30 overflow-hidden">
                    <div className="h-full bg-white/40 animate-pulse"></div>
                </div>
            )}
        </div>
    )
}
