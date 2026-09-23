import './globals.css'
import type { Metadata, Viewport } from 'next'
import AuthGuard from './components/AuthGuard'
import AppShell from './components/AppShell'
import { ToastProvider } from './components/ui/Toast'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

export const metadata: Metadata = {
    title: 'D&D 5.5e Character Sheet',
    description: 'Manage your One D&D characters',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
        { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // data-theme is set before hydration by THEME_INIT_SCRIPT
        <html lang="en" suppressHydrationWarning>
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
