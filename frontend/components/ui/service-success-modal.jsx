"use client";

import GlobalModal from "@/components/ui/global-modal";

export default function ServiceSuccessModal({
    open,
    onOpenChange,
    title = "Vehicle Basic Detail Fetched Successfully",
    description = "You can check that we have found the data of your vehicle from your register number.",
    onDownload = () => { },
    onViewDetail = () => { },
    trigger
}) {
    const handleDownload = () => {
        onDownload();
    };

    const handleViewDetail = () => {
        onViewDetail();
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    return (
        <GlobalModal
            trigger={trigger}
            title={title}
            description={description}
            imageSrc="/images/modal/fetched-successfully.png"
            imageAlt="Service success icon"
            primaryButton={{
                text: "Download",
                action: handleDownload,
            }}
            secondaryButton={{
                text: "View Detail",
                action: handleViewDetail,
            }}
            open={open}
            onOpenChange={onOpenChange}
            showCloseButton={true}
            allowOutsideClick={true}
            buttonLayout="vertical"
        />
    );
}