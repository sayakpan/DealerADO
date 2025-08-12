import { fetchWithAuth } from "@/utils/api";

export async function changePassword(passwordData) {
    const response = await fetchWithAuth(`/api/accounts/change-password/`, {
        method: 'POST',
        body: JSON.stringify({
            old_password: passwordData.currentPassword,
            new_password: passwordData.newPassword
        }),
    });
    
    if (response.status === 401) {
        window.location.href = '/login?status=401';
        return;
    }
    
    return response;
}

export async function deactivateAccount(password) {
    const response = await fetchWithAuth(`/api/accounts/deactivate/`, {
        method: 'POST',
        body: JSON.stringify({
            password: password
        }),
    });
    
    if (response.status === 401) {
        window.location.href = '/login?status=401';
        return;
    }
    
    return response;
}