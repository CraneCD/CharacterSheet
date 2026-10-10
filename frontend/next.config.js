// `npm run build:app` builds the Android app's pages as static files (out/), which Capacitor
// bundles into the APK. The website (Vercel) is the normal build.
const appBuild = process.env.NEXT_PUBLIC_APP_BUILD === '1'

/** @type {import('next').NextConfig} */
const nextConfig = appBuild
    ? {
        output: 'export',
        // No image server inside the app
        images: { unoptimized: true },
    }
    : {
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
        // Ids moved from the path to the query string (lib/routes.ts); keep old links and bookmarks working
        async redirects() {
            return [
                { source: '/character/:id', destination: '/character?id=:id', permanent: true },
                { source: '/campaigns/:campaign/encounters/:id', destination: '/campaigns/encounter?campaign=:campaign&id=:id', permanent: true },
                { source: '/campaigns/:id((?!view$|encounter$)[^/]+)', destination: '/campaigns/view?id=:id', permanent: true },
                { source: '/admin/:type((?!type$)[^/]+)/new', destination: '/admin/type/new?type=:type', permanent: true },
                { source: '/admin/:type((?!type$)[^/]+)/:key', destination: '/admin/type/edit?type=:type&key=:key', permanent: true },
                { source: '/admin/:type((?!type$)[^/]+)', destination: '/admin/type?type=:type', permanent: true },
            ]
        },
    }

module.exports = nextConfig
