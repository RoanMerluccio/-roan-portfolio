export const dynamic = 'force-dynamic'

import { HeroSection } from '@/components/HeroSection'
import { ServiceBlocks } from '@/components/ServiceBlocks'
import { FeaturedWork } from '@/components/FeaturedWork'
import { CollectionsGrid } from '@/components/CollectionsGrid'
import { FAQ } from '@/components/FAQ'
import { getCollections } from '@/lib/queries'
import { getFAQSchema } from '@/lib/structured-data'

export default async function HomePage() {
  const collections = await getCollections()
  const faqSchema = getFAQSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\u003c'),
        }}
      />
      <HeroSection />
      <ServiceBlocks />
      <FeaturedWork />
      <CollectionsGrid collections={collections} />
      <FAQ />
    </>
  )
}