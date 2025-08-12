import { Geist, Geist_Mono } from "next/font/google";
import "@/public/globals.css";
import ServerNavbar from "@/components/core/ServerNavbar";
import FooterContent from "@/components/core/footer";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Suspense } from "react";
import { ToasterProvider } from "@/contexts/ToastContext";
import ClientCleanup from "@/components/utils/ClientCleanup";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "DealerADO",
    description: "Trusted Car Services for a Smooth Journey Ahead",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Suspense fallback={null}>
                    <LoadingProvider>
                        <ToasterProvider>
                            <ClientCleanup />
                            <ServerNavbar />
                            {children}
                            <FooterContent />
                        </ToasterProvider>
                    </LoadingProvider>
                </Suspense>
            </body>
        </html>
    );
}