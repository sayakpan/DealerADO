import Hero from "@/components/homepage/Hero"
import Features from "@/components/homepage/Features"
import Testimonials from "@/components/homepage/Testimonials"
import AboutUs from "@/components/homepage/AboutUs"

export const metadata = {
    title: "Home | DealerADO",
    description: "DealerADO offers trusted car services for a smooth journey. Explore our features, testimonials, and learn more about us.",
};

export default function Homepage() {
    return (
        <main>
            <Hero />
            <Features />
            <Testimonials />
            <AboutUs />
        </main>
    )
}
