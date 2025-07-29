import { fetchWithAuth } from "@/utils/api";

export async function changePassword(passwordData) {
    const response = await fetchWithAuth(`/api/accounts/change-password/`, {
        method: 'POST',
        body: JSON.stringify({
            old_password: passwordData.currentPassword,
            new_password: passwordData.newPassword
        }),
    });
    return response;
}