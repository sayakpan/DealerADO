"use client"

import { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

const Popover = ({
    trigger,
    content,
    title,
    position = "bottom",
    triggerAction = "click",
    className = "",
    popoverClasses = "",
    contentClass = "",
    titleClass = "bg-gray-100",
    arrowColor = "white",
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [popoverPosition, setPopoverPosition] = useState({ left: -9999, top: -9999 })
    const triggerRef = useRef(null)
    const popoverContentRef = useRef(null)
    const [portalRoot, setPortalRoot] = useState(null)

    // Set up portal root on mount
    useEffect(() => {
        setPortalRoot(document.body)
    }, [])

    // Handle click outside to close the popover
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target) &&
                popoverContentRef.current &&
                !popoverContentRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        if (triggerAction === "click" && isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [triggerAction, isOpen])

    // Update position whenever isOpen changes
    useEffect(() => {
        if (!isOpen || !triggerRef.current) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const popoverRect = popoverContentRef.current?.getBoundingClientRect()
            const popoverWidth = popoverRect?.width || 200  // Default minimum width
            const popoverHeight = popoverRect?.height || 50  // Default height estimate

            let left = 0
            let top = 0

            // Calculate position based on the selected position prop
            switch (position) {
                case "top":
                    left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2)
                    top = triggerRect.top - popoverHeight - 8
                    break
                case "topleft":
                    left = triggerRect.left
                    top = triggerRect.top - popoverHeight - 8
                    break
                case "topright":
                    left = triggerRect.right - popoverWidth
                    top = triggerRect.top - popoverHeight - 8
                    break
                case "right":
                    left = triggerRect.right + 8
                    top = triggerRect.top + (triggerRect.height / 2) - (popoverHeight / 2)
                    break
                case "righttop":
                    left = triggerRect.right + 8
                    top = triggerRect.top
                    break
                case "rightbottom":
                    left = triggerRect.right + 8
                    top = triggerRect.bottom - popoverHeight
                    break
                case "bottom":
                    left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2)
                    top = triggerRect.bottom + 8
                    break
                case "bottomleft":
                    left = triggerRect.left
                    top = triggerRect.bottom + 8
                    break
                case "bottomright":
                    left = triggerRect.right - popoverWidth
                    top = triggerRect.bottom + 8
                    break
                case "left":
                    left = triggerRect.left - popoverWidth - 8
                    top = triggerRect.top + (triggerRect.height / 2) - (popoverHeight / 2)
                    break
                case "lefttop":
                    left = triggerRect.left - popoverWidth - 8
                    top = triggerRect.top
                    break
                case "leftbottom":
                    left = triggerRect.left - popoverWidth - 8
                    top = triggerRect.bottom - popoverHeight
                    break
                default:
                    left = triggerRect.left + (triggerRect.width / 2) - (popoverWidth / 2)
                    top = triggerRect.bottom + 8
                    break
            }

            // Ensure the popover stays within the viewport
            left = Math.max(10, Math.min(left, window.innerWidth - popoverWidth - 10))
            top = Math.max(10, Math.min(top, window.innerHeight - popoverHeight - 10))

            setPopoverPosition({ left, top })
        }

        const handleAutoCloseOnScroll = () => {
            if (!triggerRef.current) return;

            const rect = triggerRef.current.getBoundingClientRect();
            const completelyOutOfView = rect.bottom < 0 || rect.top > window.innerHeight - 300 || rect.right < 0 || rect.left > window.innerWidth;
            
            if (completelyOutOfView) {
                setIsOpen(false);
            }
        }

        // Initial position calculation
        updatePosition()

        // Update position on resize or scroll
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition)
        window.addEventListener('scroll', handleAutoCloseOnScroll)

        return () => {
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('scroll', handleAutoCloseOnScroll)
            setPopoverPosition({ left: -9999, top: -9999 })
        }
    }, [isOpen, position])

    useEffect(() => {
        const handleWindowBlur = () => {
            setIsOpen(false);
        }

        window.addEventListener('blur', handleWindowBlur);
        return () => window.removeEventListener('blur', handleWindowBlur);
    }, []);

    const togglePopover = () => {
        if (triggerAction === "click") {
            setIsOpen(!isOpen)
        }
    }

    const closePopover = () => {
        setIsOpen(false)
    }

    const handleMouseEnter = () => {
        if (triggerAction === "hover") {
            setIsOpen(true)
        }
    }

    const handleMouseLeave = () => {
        if (triggerAction === "hover") {
            setIsOpen(false)
        }
    }

    // Get the appropriate border classes for the arrow based on position
    const getArrowBorderClasses = () => {
        // The arrow needs borders on the sides that are visible outside the popover
        switch (position) {
            case "top":
            case "topleft":
            case "topright":
                return "border-b border-r" // Arrow pointing down needs borders on bottom and right
            case "right":
            case "righttop":
            case "rightbottom":
                return "border-b border-l" // Arrow pointing left needs borders on bottom and left
            case "bottom":
            case "bottomleft":
                return "border-t border-l" // Arrow pointing up needs borders on top and left
            case "bottomright":
                return "border-t border-r" // Arrow pointing up needs borders on top and right
            case "left":
            case "lefttop":
                return "border-t border-l" // Arrow pointing right needs borders on top and left
            case "leftbottom":
                return "border-t border-r" // Arrow pointing right needs borders on top and right
            default:
                return "border-t border-l" // Default (bottom position)
        }
    }

    // Determine if we need a border color for the arrow
    // For title sections, we might need a different color
    const getArrowBgColor = () => {
        if (position.startsWith("bottom") && title) {
            // If the arrow is at the top and there's a title, use the title background
            return titleClass.includes("bg-") ? titleClass.split("bg-")[1].split(" ")[0] : "gray-100"
        }
        return arrowColor
    }

    // Get arrow position based on the popover position
    const getArrowPosition = () => {
        // Calculate position of arrow relative to popover
        switch (position) {
            case "top":
                return { bottom: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)" }
            case "topleft":
                return { bottom: "-5px", left: "1rem", transform: "rotate(45deg)" }
            case "topright":
                return { bottom: "-5px", right: "1rem", transform: "rotate(45deg)" }
            case "right":
                return { left: "-5px", top: "50%", transform: "translateY(-50%) rotate(45deg)" }
            case "righttop":
                return { left: "-5px", top: "1rem", transform: "rotate(45deg)" }
            case "rightbottom":
                return { left: "-5px", bottom: "1rem", transform: "rotate(45deg)" }
            case "bottom":
                return { top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)" }
            case "bottomleft":
                return { top: "-5px", left: "1rem", transform: "rotate(45deg)" }
            case "bottomright":
                return { top: "-5px", right: "1rem", transform: "rotate(-45deg)" }
            case "left":
                return { right: "-5px", top: "50%", transform: "translateY(-50%) rotate(135deg)" }
            case "lefttop":
                return { right: "-5px", top: "1rem", transform: "rotate(135deg)" }
            case "leftbottom":
                return { right: "-5px", bottom: "1rem", transform: "rotate(135deg)" }
            default:
                return { top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)" }
        }
    }

    // Render the trigger
    const renderTrigger = () => (
        <div
            ref={triggerRef}
            className={`inline-block ${className}`}
            onClick={togglePopover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="cursor-pointer">
                {trigger}
            </div>
        </div>
    )

    // Render the popover content via portal
    const renderPopoverContent = () => {
        if (!isOpen || !portalRoot) return null

        // Pass closePopover to content if it's a function
        const contentWithClose = typeof content === 'function'
            ? content({ closePopover })
            : content;

        return ReactDOM.createPortal(
            <div
                ref={popoverContentRef}
                className="fixed z-50"
                style={{
                    left: `${popoverPosition.left}px`,
                    top: `${popoverPosition.top}px`,
                }}
                onMouseEnter={triggerAction === "hover" ? handleMouseEnter : undefined}
                onMouseLeave={triggerAction === "hover" ? handleMouseLeave : undefined}
            >
                <div className={`bg-white border border-gray-200 rounded-lg shadow-lg w-auto min-w-[200px] max-w-[400px] overflow-hidden ${popoverClasses}`}>
                    {title && <div className={`px-4 py-2 text-sm font-semibold ${titleClass}`}>{title}</div>}
                    <div className={`p-2 ${contentClass}`}>{contentWithClose}</div>

                    {/* Arrow element */}
                    <div
                        className={`absolute w-2 h-2 bg-${getArrowBgColor()} ${getArrowBorderClasses()} border-gray-200`}
                        style={getArrowPosition()}
                    />
                </div>
            </div>,
            portalRoot
        )
    }

    return (
        <>
            {renderTrigger()}
            {renderPopoverContent()}
        </>
    )
}

export default Popover