/*
 * Toast Context Provider
 * 
 * Provides a toast notification system for your app using React Context.
 * 
 * ## Features:
 * - **Toast Types**: Supports `success`, `error`, `info`, `wait`, and `plain`.
 * - **Custom Options**: Set duration, title, custom icons, and position (`top-right`, `bottom-center`, etc.).
 * - **Positioning**: Uses Tailwind CSS for toast placement (`positionClasses`).
 * - **Auto Dismiss**: Removes toasts after the specified duration.
 * 
 * ## Usage:
 *   const toast = useToast();
 *   toast.success('This is a success message!');
 *   ```
 * - Use `getToast()` for global access outside components.
 */

'use client';

import { createContext, useContext, useState } from 'react';
import Toast from '@/components/utils/Toast';

const ToastContext = createContext();
let toastRef = null;

export const ToasterProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', options = {}) => {
        const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        const duration = type == 'wait' ? 100000 : options.duration || 3000;
        const title = options.title || false;
        const customIcon = options.customIcon || false;
        const position = options.position || 'top-right';

        setToasts((prev) => {
            const filteredToasts = prev.filter((toast) => toast.type !== 'wait');
            return [...filteredToasts, { id, title, message, type, customIcon, position }];
        });

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);

        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const toast = {
        success: (message, options) => addToast(message, 'success', options),
        error: (message, options) => addToast(message, 'error', options),
        info: (message, options) => addToast(message, 'info', options),
        wait: (message, options) => addToast(message, 'wait', options),
        plain: (message, options) => addToast(message, 'plain', options),
        goAway: (id) => removeToast(id),
    };

    const positionClasses = {
        'top-left': 'top-10 left-5',
        'top-center': 'top-10 left-1/2 transform -translate-x-1/2',
        'top-right': 'top-10 right-5',
        'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'bottom-left': 'bottom-10 left-5',
        'bottom-center': 'bottom-10 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-10 right-5',
    };

    toastRef = toast;
    return (
        <ToastContext.Provider value={toast}>
            {children}
            {Object.keys(positionClasses).map((position) => (
                <div
                    id={`toast-conext-provider-${position}`}
                    key={position}
                    className={`fixed ${positionClasses[position]} space-y-2 z-[1001]`}
                >
                    {toasts
                        .filter((toast) => toast.position === position)
                        .map(({ id, title, message, type, customIcon }) => (
                            <Toast
                                key={id}
                                title={title}
                                message={message}
                                type={type}
                                customIcon={customIcon}
                                removeToast={() => removeToast(id)}
                            />
                        ))}
                </div>
            ))}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
export const getToast = () => toastRef; 