import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'TODO_WEBSITE_URL'
const ogImage = `${siteUrl}/og-image.jpg`

export const metadata: Metadata = {
  title: {
    default: 'Car Photographer in Westchester, NY | Roan Merluccio Automotive Photography',
    template: '%s | Roan Merluccio Automotive Photography',
  },
  description:
    'Motorsport and automotive photography, rolling shots, dealership media, car listing photos, videography, and aerial content for car owners, teams, dealerships, and brands in Westchester, NYC, Connecticut, and Rochester.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Roan Merluccio Automotive Photography',
    title: 'Car Photographer in Westchester, NY | Roan Merluccio Automotive Photography',
    description:
      'Motorsport and automotive photography, rolling shots, dealership media, car listing photos, videography, and aerial content for car owners, teams, dealerships, and brands in Westchester, NYC, Connecticut, and Rochester.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Roan Merluccio Automotive Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Photographer in Westchester, NY | Roan Merluccio Automotive Photography',
    description:
      'Motorsport and automotive photography, rolling shots, dealership media, car listing photos, videography, and aerial content for car owners, teams, dealerships, and brands in Westchester, NYC, Connecticut, and Rochester.',
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: { index: true, follow: true },
  keywords: [
    'car photographer Westchester NY',
    'automotive photographer',
    'motorsport photographer',
    'rolling shots photographer',
    'dealership photography',
    'car photographer near me',
    'automotive photographer Westchester NY',
    'car photographer Bronxville NY',
    'vehicle listing photos',
    'Formula SAE photographer',
    'car photography NYC',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-background text-white font-body antialiased">
        {children}
      </body>
    </html>
  )
}
