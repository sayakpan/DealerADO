'use server';

import { cookies } from 'next/headers';

export async function getServerToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value
    const expirationDate = cookieStore.get('tokenExpiration')?.value;

    if (!token || !expirationDate || Date.now() > +expirationDate) {
        return null;
    }
    
    return token;
}
