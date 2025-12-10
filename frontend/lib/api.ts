// Get API URL - check both build-time and runtime
const getApiUrl = () => {
    // In browser, check if we have a runtime override
    if (typeof window !== 'undefined') {
        // Check for runtime config (useful for debugging)
        const runtimeUrl = (window as any).__API_URL__;
        if (runtimeUrl) return runtimeUrl;
    }
    
    // Use environment variable (set at build time in Vercel)
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl) return envUrl;
    
    // Fallback to localhost for local development
    return 'http://localhost:3001/api';
};

const API_URL = getApiUrl();

// Debug: Log the API URL (only in browser, not during SSR)
if (typeof window !== 'undefined') {
    console.log('🔗 API_URL:', API_URL);
    console.log('🔗 NEXT_PUBLIC_API_URL env var:', process.env.NEXT_PUBLIC_API_URL);
    if (!process.env.NEXT_PUBLIC_API_URL) {
        console.warn('⚠️ NEXT_PUBLIC_API_URL is not set! Using fallback:', API_URL);
    }
}

export const api = {
    async get(endpoint: string) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async post(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async put(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async patch(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async delete(endpoint: string, options?: { data?: any }) {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
            'Authorization': `Bearer ${token}`,
        };
        
        if (options?.data) {
            headers['Content-Type'] = 'application/json';
        }
        
        const url = `${API_URL}${endpoint}`;
        console.log('DELETE request to:', url, 'with options:', options);
        
        const res = await fetch(url, {
            method: 'DELETE',
            headers,
            body: options?.data ? JSON.stringify(options.data) : undefined,
        });
        
        console.log('DELETE response status:', res.status, res.statusText);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error('DELETE error response:', errorText);
            throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
        }
        // Handle empty responses (204 No Content)
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const json = await res.json();
            console.log('DELETE response JSON:', json);
            return json;
        }
        // Return empty object for successful DELETE with no body
        console.log('DELETE successful, no body');
        return {};
    }
};
