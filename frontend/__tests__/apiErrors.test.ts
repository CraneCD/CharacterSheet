import { api, ApiError } from '@/lib/api';

function mockResponse(status: number, body: string) {
    global.fetch = jest.fn().mockResolvedValue({
        ok: status < 400,
        status,
        statusText: 'Bad Request',
        text: () => Promise.resolve(body),
        headers: { get: () => 'application/json' },
    }) as unknown as typeof fetch;
}

describe('API errors', () => {
    const originalFetch = global.fetch;
    afterEach(() => { global.fetch = originalFetch; });

    it('uses the server error message', async () => {
        mockResponse(400, JSON.stringify({ error: 'Email already in use.' }));
        const err = await api.post('/auth/register', {}).catch((e) => e);
        expect(err).toBeInstanceOf(ApiError);
        expect(err.message).toBe('Email already in use.');
        expect(err.status).toBe(400);
    });

    it('joins validation issues', async () => {
        mockResponse(400, JSON.stringify({ error: [{ message: 'Invalid email' }, { message: 'Too short' }] }));
        await expect(api.patch('/x', {})).rejects.toThrow('Invalid email. Too short');
    });

    it('falls back to plain text or the status code', async () => {
        mockResponse(500, 'Internal error');
        await expect(api.put('/x', {})).rejects.toThrow('Internal error');
        mockResponse(502, '');
        await expect(api.delete('/x')).rejects.toThrow('Request failed (HTTP 502)');
    });
});
