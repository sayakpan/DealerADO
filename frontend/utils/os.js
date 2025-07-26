export const vibrate = (pattern = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern); 
    }
};