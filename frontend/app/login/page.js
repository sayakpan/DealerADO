import ServerLoginPage from "./ServerLoginPage";

export const metadata = {
    title: "Login | DealerADO",
    description: "Log in to your DealerADO account to access personalized car services and manage your profile.",
};


export default async function LoginPage({ searchParams }) {
    return <ServerLoginPage searchParams={searchParams} />;
}
