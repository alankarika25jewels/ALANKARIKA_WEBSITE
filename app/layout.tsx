import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Allura } from 'next/font/google'
import './globals.css'

const allura = Allura({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-allura',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Alankarika - Premium Jewelry Collection',
  description: 'Discover exquisite jewelry pieces crafted with precision and designed to make you shine. Shop our latest collection of rings, necklaces, pendants, and more.',
  keywords: 'jewelry, rings, necklaces, pendants, gold jewelry, silver jewelry, diamond jewelry',
  authors: [{ name: 'Alankarika' }],
  creator: 'Alankarika',
  publisher: 'Alankarika',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alankarika.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alankarika - Premium Jewelry Collection',
    description: 'Discover exquisite jewelry pieces crafted with precision and designed to make you shine.',
    url: 'https://alankarika.com',
    siteName: 'Alankarika',
    images: [
      {
        url: '/logo-rose.png',
        width: 1200,
        height: 630,
        alt: 'Alankarika Jewelry',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alankarika - Premium Jewelry Collection',
    description: 'Discover exquisite jewelry pieces crafted with precision and designed to make you shine.',
    images: ['/logo-rose.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={allura.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" href="/logo-rose.png" as="image" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-allura: ${allura.variable};
}
        `}</style>
      </head>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  )
}
