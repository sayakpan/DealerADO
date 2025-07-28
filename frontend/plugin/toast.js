import { getToast } from '@/contexts/ToastContext';

/**
 * Global Toast Handler
 * 
 * Usage:
 * 
 * toast.success('Your message', { title: 'Title', duration: 5000, position: 'bottom-center' });
 * 
 * Options:
 * - title (string): Optional title above the message
 * - duration (number): How long to show (ms), default 3000
 * - customIcon (string): Emoji, URL or class name
 * - position (string): 'top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right'
 * 
 * Note: 'wait' type toast must be manually removed using toast.goAway(id) or by adding a new toast
 */

export const toast = {
    /**
     * Show a success toast
     * @param {string} message - The toast message
     * @param {object} [options] - Toast options
     */
    success: (message, options) => getToast().success(message, options),

    /**
     * Show an error toast
     * @param {string} message - The toast message
     * @param {object} [options] - Toast options
     */
    error: (message, options) => getToast().error(message, options),

    /**
     * Show an info toast
     * @param {string} message - The toast message
     * @param {object} [options] - Toast options
     */
    info: (message, options) => getToast().info(message, options),

    /**
     * Show a wait (loading) toast
     * @param {string} message - The toast message
     * @param {object} [options] - Toast options
     * @returns {string} toastId - Use this ID with toast.goAway(id) to manually close
     */
    wait: (message, options) => getToast().wait(message, options),

    /**
     * Show a plain (neutral) toast
     * @param {string} message - The toast message
     * @param {object} [options] - Toast options
     */
    plain: (message, options) => getToast().plain(message, options),

    /**
     * Manually remove a toast by ID
     * @param {string} id - Toast ID to remove
     */
    goAway: (id) => getToast().goAway(id),
};