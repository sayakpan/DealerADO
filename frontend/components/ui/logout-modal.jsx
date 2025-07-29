"use client";

import { Button } from "@/components/ui/button";
import GlobalModal from "@/components/ui/global-modal";
import { LogOut } from "lucide-react";

export default function LogoutModal({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout logic
      console.log("User logged out");
    }
  };

  const handleCancel = () => {
    console.log("Logout cancelled");
  };

  return (
    <GlobalModal
      trigger={
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          Open Logout Modal
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