import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { getLocalBusinessSchema } from '@/lib/structured-data'

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
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
  const schema = getLocalBusinessSchema()

  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-background text-white font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
