import type { Metadata } from 'next'
import './globals.css'  // ← 이 줄이 있어야 함!

export const metadata: Metadata = {
  title: 'Griid',
  description: 'Grid layout application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}