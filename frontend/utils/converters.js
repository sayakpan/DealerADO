/**
 * Converts an ISO 8601 timestamp into a readable date format "DD MMM YYYY".
 *
 * @param {string} timestamp - The ISO 8601 timestamp (e.g., "2024-01-11T13:21:17.301137+05:30").
 * @returns {string} - The formatted date string (e.g., "11 Jan 2024").
 *
 */

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

/**
 * Converts an ISO 8601 timestamp into a readable date and time format "DD MMM YYYY, h:mm AM/PM".
 *
 * @param {string} timestamp - The ISO 8601 timestamp (e.g., "2024-01-11T13:21:17.301137+05:30").
 * @returns {string} - The formatted date and time string (e.g., "12 Jan 2025, 7:04 PM").
 *
 */

export function formatTimestampWithTime(timestamp) {
    const date = new Date(timestamp);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${month} ${year}, ${hours}:${formattedMinutes} ${ampm}`;
}

/**
 * Converts a sentence to Proper Case (Title Case).
 *
 * @param {string} sentence - The sentence to be converted.
 * @returns {string} - The Proper Case formatted string.
 */
export function toProperCase(sentence) {
    if (!sentence) return '';

    return sentence
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Converts a number into a formatted string based on the specified metric system (Indian or International)
 * and rounds it to the specified number of decimal points.
 *
 * For the Indian metric system:
 * - K: Thousand
 * - L: Lakh
 * - Cr: Crore
 *
 * For the International metric system:
 * - K: Thousand
 * - M: Million
 * - B: Billion
 *
 * @param {number} number - The number to be formatted (e.g., 135000).
 * @param {string} metricSystem - The metric system to use ("indian" or "international").
 * @param {number} [decimal=2] - The number of decimal points to round to (default is 2).
 * @returns {string} - The formatted number string (e.g., "1.35 L" for Indian or "135 K" for International).
 */

export function convertNumberFormat(number, metricSystem = 'indian', decimal = 2) {
    if (typeof number !== "number" || number < 0) {
        throw new Error("Invalid number provided");
    }
    if (!["indian", "international"].includes(metricSystem)) {
        throw new Error("Invalid metric system. Use 'indian' or 'international'.");
    }

    // Helper function to round to the specified decimal places
    const roundToDecimal = (num) => Number(num.toFixed(decimal));

    if (metricSystem === "indian") {
        if (number >= 10000000) {
            return `${roundToDecimal(number / 10000000)}Cr`; // Crore
        } else if (number >= 100000) {
            return `${roundToDecimal(number / 100000)}L`; // Lakh
        } else if (number >= 1000) {
            return `${roundToDecimal(number / 1000)}K`; // Thousand
        } else {
            return number.toString(); // No formatting for numbers < 1000
        }
    } else if (metricSystem === "international") {
        if (number >= 1000000000) {
            return `${roundToDecimal(number / 1000000000)} B`; // Billion
        } else if (number >= 1000000) {
            return `${roundToDecimal(number / 1000000)} M`; // Million
        } else if (number >= 1000) {
            return `${roundToDecimal(number / 1000)} K`; // Thousand
        } else {
            return number.toString(); // No formatting for numbers < 1000
        }
    }
}

/**
 * Extracts the unique video ID from a YouTube URL.
 *
 * @param {string} url - The YouTube video URL.
 * @returns {string} - The unique video ID extracted from the URL.
 *                     Returns the last segment if "v=" is not present in the URL.
 */

export function getUniqueIdYoutube(url) {
    if (url.includes("v=")) {
        const id = url.split('v=')[1];
        if (id.includes("&")) {
            return id.split('&')[0];
        } else {
            return id
        }
    } else {
        const unique_id = url.split("/")
        return unique_id[unique_id.length - 1]
    }
}


/**
 * Calculates the time difference from a given timestamp to the current time
 * and returns it in a human-readable format.
 *
 * @param {string} timestamp - The ISO timestamp string (e.g., "2022-01-11T13:21:17.301137+05:30").
 * @returns {string} - The time difference in a human-readable format (e.g., "3 years ago", "17 days ago").
 */
export function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return "Just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30.44); // Approximate month length
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365.25); // Accounting for leap years
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}


/**
 * Calculates the time difference from a given timestamp to the current time
 * and returns it in a human-readable format.
 *
 * @param {string} timestamp - The ISO timestamp string (e.g., "2022-01-11T13:21:17.301137+05:30").
 * @returns {string} - The time difference in a human-readable format (e.g., "3 years", "17 days").
 */
export function timeDifference(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return "1 minutes";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    }

    const diffInMonths = Math.floor(diffInDays / 30.44); // Approximate month length
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""}`;
    }

    const diffInYears = Math.floor(diffInDays / 365.25); // Accounting for leap years
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""}`;
}

/**
 * Formats a date to show days remaining/ago if within a week, otherwise shows the formatted date
 * @param {string|Date} inputDate - The date to format (can be Date object or string parsable by Date constructor)
 * @returns {string} Formatted date string
 */

export function timeLeftOrAgo(inputDate) {
    // Convert input to Date object
    const date = new Date(inputDate);

    // Get current date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create a date copy without time for comparison
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Calculate difference in days
    const diffTime = dateWithoutTime - today;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Check if within one week (7 days) range
    if (diffDays >= -7 && diffDays <= 7) {
        if (diffDays > 1) {
            return `${diffDays} days left`;
        } else if (diffDays === 1) {
            return "Tomorrow";
        } else if (diffDays < 0) {
            if (diffDays === -1) {
                return "Yesterday";
            }
            return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
        } else {
            return "Today";
        }
    } else {
        // Format the date as DD MMM, YYYY
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

/**
 * Formats a date into the specified format.
 *
 * @param {string} timestamp - The ISO 8601 timestamp (e.g., "2024-01-11T13:21:17.301137+05:30").
 * @param {string} format - The desired date format (e.g., "yyyy-mm-dd", "dd-mm-yyyy").
 * @returns {string} - The formatted date string.
 */
export function formatDate(timestamp, format) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const shortMonthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dayWithSuffix = (d) => {
        if (d > 3 && d < 21) return `${d}th`; // special case for 11th-13th
        switch (d % 10) {
            case 1: return `${d}st`;
            case 2: return `${d}nd`;
            case 3: return `${d}rd`;
            default: return `${d}th`;
        }
    };

    switch (format.toLowerCase()) {
        case 'yyyy-mm-dd':
            return `${year}-${month}-${day}`;
        case 'dd-mm-yyyy':
            return `${day}-${month}-${year}`;
        case 'mm-dd-yyyy':
            return `${month}-${day}-${year}`;
        case 'yyyy/mm/dd':
            return `${year}/${month}/${day}`;
        case 'dd/mm/yyyy':
            return `${day}/${month}/${year}`;
        case 'mm/dd/yyyy':
            return `${month}/${day}/${year}`;
        case 'mmmm do yyyy':
            return `${monthNames[date.getMonth()]} ${dayWithSuffix(date.getDate())} ${year}`;
        case 'do mmm yyyy':
            return `${dayWithSuffix(date.getDate())} ${shortMonthNames[date.getMonth()]} ${year}`;
        default:
            throw new Error("Invalid format specified");
    }
}

export function preciseRound(num, decimals = 1) {
    // Multiply by 10^decimals, round, then divide by 10^decimals
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}

export function formatMoney(value) {
    if (!value || isNaN(value)) return 'Unknown';
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Number(value));
}