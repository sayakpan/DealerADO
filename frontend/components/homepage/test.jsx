'use client';

import { login } from "@/lib/auth";
import { getAllCategories } from "@/services/homepage";
import { useState } from "react";

export default function Test() {
    const [allCategories, setAllCategories] = useState([]);
    const handleClick = async () => {
        const res = await login(
            {
                "email": "dealer2@example.com",
                "password": "strongpass123"
            }
        )
        console.log(res)
    };

    const getAllCategoriesButton = async () => {
        const res = await getAllCategories();
        console.log(res);
        setAllCategories(res.data || []);
    };

    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            <p>This is the main content area.</p>
            <button onClick={handleClick}>Click Me</button>

            <button onClick={() => getAllCategoriesButton()}>Get All Categories</button>
            <pre>{JSON.stringify(allCategories, null, 2)}</pre>
        </div>
    );
}