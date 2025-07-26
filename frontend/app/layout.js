import { Geist, Geist_Mono } from "next/font/google";
import "@/public/globals.css";
import Navbar from "@/components/core/Navbar";
import FooterContent from "@/components/core/Footer";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Suspense } from "react";

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
                        <Navbar />
                        {children}
                        <FooterContent />
                    </LoadingProvider>
                </Suspense>
            </body>
        </html>
    );
}