/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Browsers must always check for a new service worker (public/sw.js)
                source: '/sw.js',
                headers: [
                    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
                    { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
