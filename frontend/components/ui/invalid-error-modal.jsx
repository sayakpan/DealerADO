"use client";

import GlobalModal from "@/components/ui/global-modal";

export default function InvalidErrorModal({ 
    open, 
    onOpenChange,
    title = "Invalid Error",
    description = "For some reason this error has arisen",
    onOkay = () => {},
    trigger
}) {
    const handleOkay = () => {
        onOkay();
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title={title}
            description={description}
            imageSrc="/images/modal/invalid.png"
            imageAlt="Invalid error icon"
            primaryButton={{
                text: "Okay",
                action: handleOkay,
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={true}
            allowOutsideClick={true}
        />
    );
}