import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'D&D 5.5e Character Sheet',
    description: 'Manage your One D&D characters',
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <main className="container">
                    {children}
                </main>
            </body>
        </html>
    )
}
