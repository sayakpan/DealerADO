"use client";

import GlobalModal from "@/components/ui/global-modal";
import { logout } from "@/lib/auth";
import { toast } from "@/plugin/toast";

export default function DeactivateAccountModal({ 
    open, 
    onOpenChange,
    onDeactivate = async () => {},
    trigger
}) {
    const handleDeactivate = async () => {
        try {
            // Call the deactivate function passed as prop
            const result = await onDeactivate();
            
            // If deactivation was successful, logout and redirect
            if (result?.success !== false) {
                // Logout the user
                const logoutResponse = await logout();
                if (logoutResponse.success) {
                    // Redirect to login page
                    window.location.href = "/login";
                } else {
                    // Still redirect even if logout API fails
                    window.location.href = "/login";
                }
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while deactivating account");
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title="Deactivate My Account"
            description="Are you sure you want to Deactivate your account"
            imageSrc="/images/modal/deactivate-profile.png"
            imageAlt="Deactivate account icon"
            primaryButton={{
                text: "Deactivate Account",
                action: handleDeactivate,
            }}
            secondaryButton={{
                text: "Cancel",
                action: () => {},
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={true}
            allowOutsideClick={true}
        />
    );
}