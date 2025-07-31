"use client";

import GlobalModal from "@/components/ui/global-modal";

export default function ResetLinkSentModal({
    open,
    onOpenChange,
    onOkay = () => { },
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
            title="Resent Link Sent Successfully"
            description="You can change your password from the link sent to you"
            imageSrc="/images/modal/resend-link.png"
            imageAlt="Reset link sent successfully icon"
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