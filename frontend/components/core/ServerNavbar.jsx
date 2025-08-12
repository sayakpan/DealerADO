import { getServerAuthState } from "@/lib/serverAuth";
import ClientNavbarWrapper from "./ClientNavbarWrapper";

export default async function ServerNavbar() {
    const { isAuthenticated, user } = await getServerAuthState();
    
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
    ];

    return (
        <ClientNavbarWrapper 
            isAuthenticated={isAuthenticated}
            user={user}
            navLinks={navLinks}
        />
    );
}