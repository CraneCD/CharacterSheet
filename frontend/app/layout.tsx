import './globals.css'
import type { Metadata, Viewport } from 'next'
import AuthGuard from './components/AuthGuard'

export const metadata: Metadata = {
    title: 'D&D 5.5e Character Sheet',
    description: 'Manage your One D&D characters',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AuthGuard>
                    <main className="container">
                        {children}
                    </main>
                </AuthGuard>
            </body>
        </html>
    )
}
