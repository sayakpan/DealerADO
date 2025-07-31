"use client";

import GlobalModal from "@/components/ui/global-modal";
import { logout } from "@/lib/auth";
import { toast } from "@/plugin/toast";

export default function PasswordChangeSuccessModal({ 
    open, 
    onOpenChange,
    onSuccess = () => {}
}) {
    const handleOkay = async () => {
        try {
            // Logout the user
            const response = await logout();
            if (response.success) {
                onSuccess();
                // Redirect to login page
                window.location.href = "/login";
            } else {
                toast.error(response.message || "Logout failed");
                // Still redirect to login even if logout API fails
                window.location.href = "/login";
            }
        } catch (error) {
            toast.error(error.message || "An error occurred");
            // Still redirect to login even if there's an error
            window.location.href = "/login";
        }
    };

    return (
        <GlobalModal
            title="Password Change Successfully"
            description="Your password has been successfully changed"
            imageSrc="/images/modal/password-changed.png"
            imageAlt="Password changed successfully icon"
            primaryButton={{
                text: "Okay",
                action: handleOkay,
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={false}
            allowOutsideClick={false}
        />
    );
}