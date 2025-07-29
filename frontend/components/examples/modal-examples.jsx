"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GlobalModal from "@/components/ui/global-modal";
import { LogOut, Trash2, AlertTriangle, CheckCircle, Mail } from "lucide-react";

export function LogoutModalExample() {
    const handleLogout = () => {
        console.log("User logged out");
        // Add your logout logic here
    };

    const handleCancel = () => {
        console.log("Logout cancelled");
    };

    return (
        <GlobalModal
            trigger={
                <Button variant="outline" className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            }
            title="Log Out"
            description="Are you sure you want to Log Out your account?"
            icon={LogOut}
            iconColor="text-red-600"
            primaryButton={{
                text: "Yes",
                action: handleLogout,
            }}
            secondaryButton={{
                text: "No",
                action: handleCancel,
            }}
        />
    );
}

export function DeleteModalExample() {
    const handleDelete = () => {
        console.log("Item deleted");
    };

    return (
        <GlobalModal
            trigger={
                <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Item
                </Button>
            }
            title="Delete Item"
            description="This action cannot be undone. Are you sure you want to delete this item?"
            icon={Trash2}
            iconColor="text-red-600"
            primaryButton={{
                text: "Delete",
                action: handleDelete,
            }}
            secondaryButton={{
                text: "Cancel",
                action: () => console.log("Delete cancelled"),
            }}
        />
    );
}

export function WarningModalExample() {
    const handleProceed = () => {
        console.log("Proceeding with action");
    };

    return (
        <GlobalModal
            trigger={
                <Button variant="outline" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Show Warning
                </Button>
            }
            title="Warning"
            description="This action may have unintended consequences. Please review before proceeding."
            icon={AlertTriangle}
            iconColor="text-yellow-600"
            primaryButton={{
                text: "Proceed",
                action: handleProceed,
            }}
            secondaryButton={{
                text: "Cancel",
                action: () => console.log("Action cancelled"),
            }}
        />
    );
}

export function SuccessModalExample() {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        console.log("Success acknowledged");
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Show Success
            </Button>

            <GlobalModal
                open={open}
                onOpenChange={setOpen}
                title="Success!"
                description="Your action has been completed successfully."
                icon={CheckCircle}
                iconColor="text-green-600"
                primaryButton={{
                    text: "OK",
                    action: handleSuccess,
                }}
            />
        </>
    );
}

export function EmailModalExample() {
    const handleSend = () => {
        console.log("Email sent");
    };

    return (
        <GlobalModal
            trigger={
                <Button className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                </Button>
            }
            title="Send Email"
            description="Are you ready to send this email to all recipients?"
            icon={Mail}
            iconColor="text-blue-600"
            primaryButton={{
                text: "Send",
                action: handleSend,
            }}
            secondaryButton={{
                text: "Cancel",
                action: () => console.log("Email cancelled"),
            }}
        />
    );
}

// Example of all modals together for testing
export default function ModalExamples() {
    return (
        <div className="flex flex-col gap-4 p-8">
            <h2 className="text-2xl font-bold mb-4">Global Modal Examples</h2>

            <div className="flex flex-wrap gap-4">
                <LogoutModalExample />
                <DeleteModalExample />
                <WarningModalExample />
                <SuccessModalExample />
                <EmailModalExample />
            </div>
        </div>
    );
}