"use client";

import GlobalModal from "@/components/ui/global-modal";

export default function ServiceErrorModal({ 
    open, 
    onOpenChange,
    title = "Unsuccessful",
    description = "Please retry ! Enter your correct register number so that the data can be fetched.",
    onRetry = () => {},
    onCancel = () => {},
    trigger
}) {
    const handleRetry = () => {
        onRetry();
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    const handleCancel = () => {
        onCancel();
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title={title}
            description={description}
            imageSrc="/images/modal/unsuccessful.png"
            imageAlt="Service error icon"
            primaryButton={{
                text: "Retry",
                action: handleRetry,
            }}
            secondaryButton={{
                text: "Cancel",
                action: handleCancel,
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={true}
            allowOutsideClick={true}
        />
    );
}