const API_URL = 'http://localhost:3001/api';

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
