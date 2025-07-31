"use client";

import GlobalModal from "@/components/ui/global-modal";

export default function UserNotExistModal({ 
    open, 
    onOpenChange,
    onRetry = () => {},
    trigger
}) {
    const handleRetry = () => {
        onRetry();
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title="User Does Not Exist"
            description="The email or mobile number you entered does not have an user associated with it"
            imageSrc="/images/modal/user-not-exist.png"
            imageAlt="User does not exist icon"
            primaryButton={{
                text: "Retry",
                action: handleRetry,
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={true}
            allowOutsideClick={true}
        />
    );
}