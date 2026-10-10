import type { MetadataRoute } from 'next'

/** Web app manifest: lets Chrome install the app to the home screen as Grulla D&D. */
export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: 'Grulla D&D',
        short_name: 'Grulla D&D',
        description: 'D&D 5.5e character sheets and campaigns',
        start_url: '/dashboard',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        // The dark theme's background (themeColor in layout.tsx)
        background_color: '#1d1627',
        theme_color: '#1d1627',
        icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
            { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
    }
}
