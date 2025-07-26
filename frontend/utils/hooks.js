'use client';

import { useEffect, useState } from "react";


// Custom hook to close or handle actions for dropdowns, modals, or any component when clicking outside of their boundaries.
export const useClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside]);
};


// Custom hook to prevent scrolling when a modal or dropdown is open.
export const useNoScroll = (isOpen) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
}

// Custom hook to check if the city is Delhi and the classes are in the DOE format.
export const useDelhiClassCheck = (city_slug, classes) => {
    if (city_slug === 'delhi' && process.env.NEXT_PUBLIC_IS_DELHI_CLASSES_DOE_FORMAT === 'true') {
        return classes.reduce((acc, item) => {
            if (item.id === 17) return acc;
            acc.push(item.id === 16 ? { ...item, name: "KG" } : item); 
            return acc;
        }, []);
    } 

    return classes;
};


export default function useScreenSize() {
    const [width, setWidth] = useState(null);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize(); // Initial run
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}



