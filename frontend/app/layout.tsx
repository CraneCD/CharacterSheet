import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Alegreya_SC, Alegreya_Sans } from 'next/font/google'
import AuthGuard from './components/AuthGuard'
import AppShell from './components/AppShell'
import { ToastProvider } from './components/ui/Toast'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

// Alegreya SC for names and titles, Alegreya Sans for everything else (see --font-* in globals.css)
const displayFont = Alegreya_SC({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display-face', display: 'swap' })
const bodyFont = Alegreya_Sans({ subsets: ['latin'], weight: ['400', '500', '700', '800'], style: ['normal', 'italic'], variable: '--font-body-face', display: 'swap' })

export const metadata: Metadata = {
    title: 'D&D 5.5e Character Sheet',
    description: 'Manage your One D&D characters',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#1d1627' },
        { media: '(prefers-color-scheme: light)', color: '#f6f3fa' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // data-theme is set before hydration by THEME_INIT_SCRIPT
        <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body>
                <ToastProvider>
                    <AuthGuard>
                        <AppShell>
                            {children}
                        </AppShell>
                    </AuthGuard>
                </ToastProvider>
            </body>
        </html>
    )
}
