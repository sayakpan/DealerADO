"use client";

import GlobalModal from "@/components/ui/global-modal";
import { logout } from "@/lib/auth";
import { toast } from "@/plugin/toast";

export default function LogoutModal({ 
    trigger, 
    onLogoutSuccess = () => {}, 
    open, 
    onOpenChange 
}) {
    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.success) {
                onLogoutSuccess();
                window.location.href = "/";
            } else {
                toast.error(response.message || "Logout failed");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during logout");
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title="Log Out"
            description="Are you sure you want to log out of your account?"
            imageSrc="/images/modal/logout.png"
            imageAlt="Logout icon"
            primaryButton={{
                text: "Yes",
                action: handleLogout,
            }}
            secondaryButton={{
                text: "No",
                action: () => {},
            }}
            open={open}
            onOpenChange={onOpenChange}
        />
    );
}