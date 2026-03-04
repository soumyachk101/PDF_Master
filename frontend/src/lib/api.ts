import axios from 'axios'
import { toast } from '@/hooks/use-toast'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // Needed if using cookies
    headers: {
        'Content-Type': 'application/json',
    },
})

// Optional: Add interceptors to handle auth tokens or global error logging
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Check if error response exists
        if (error.response) {
            // Token expiration / Unauthorized
            if (error.response.status === 401) {
                // Optional: Handle redirect to login or token refresh logic
                console.error('Unauthorized access. Please login.');
                toast({
                    title: "Authentication Error",
                    description: "Your session has expired or you are unauthorized.",
                    variant: "destructive",
                })
            } else {
                // Let the specific API calls handle their own specific UI errors if preferred
                console.error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
            }
        } else if (error.request) {
            // Network errors
            toast({
                title: "Network Error",
                description: "Could not connect to the server. Please check your internet connection.",
                variant: "destructive",
            })
        }

        return Promise.reject(error);
    }
)
