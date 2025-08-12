import { getServerAuthState } from "@/lib/serverAuth";
import ClientLoginForm from "./ClientLoginForm";
import { redirect } from "next/navigation";

export default async function ServerLoginPage({ searchParams }) {
    const { isAuthenticated, sessionExpired } = await getServerAuthState();
    
    // If user is authenticated and not coming from 401, redirect to categories
    // This is a backup check in case middleware doesn't catch it
    if (isAuthenticated && searchParams?.status !== '401') {
        redirect('/categories');
    }
    
    return (
        <ClientLoginForm sessionExpired={sessionExpired} />
    );
}