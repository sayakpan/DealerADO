import { login } from "@/lib/auth";
import { getAllCategories } from "@/services/homepage";
import Image from "next/image";
import { cookies } from "next/headers"
import Test from "@/components/homepage/test";
import HomeBeforeLogin from "@/components/homepage/HomeBeforeLogin";

export default async function Home() {

    return (
        <div className="">
            <HomeBeforeLogin />
        </div>
    );
}