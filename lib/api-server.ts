// Helper providing data (project and tasks) from the backend 
// to Nextjs server components
import {cookies} from "next/headers";

export async function fetchServer(endpoint: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const API_URL = process.env.API_URL_INTERNAL;

    // We provide the token cookie for authentication on backend
    const headers = new Headers(options.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {...options, headers,})

    if (response.status === 401) {
        //TODO: Add feedback to let frontend route to /login
    }

    return response;
}