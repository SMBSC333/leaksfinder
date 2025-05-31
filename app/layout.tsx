import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Profit Leaks Finder | Where\'s the Money Hiding?',
  description: 'Discover hidden profit leaks in your small business operations with our AI-powered analysis tool.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-primary-50 to-secondary-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}
