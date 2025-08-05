/**
 * Format a date string or Date object into a readable format
 * @param {string|Date} dateInput - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, options = {}) {
    if (!dateInput) return 'Unknown Date';
    
    try {
        const date = new Date(dateInput);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...options
        };
        
        return date.toLocaleDateString('en-US', defaultOptions);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}

/**
 * Format a date to show relative time (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} dateInput - The date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(dateInput) {
    if (!dateInput) return 'Unknown time';
    
    try {
        const date = new Date(dateInput);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return formatDate(dateInput, { year: 'numeric', month: 'short', day: 'numeric' });
        }
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return 'Unknown time';
    }
}