export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getCollection, getCollections } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { PhotoGrid } from '@/components/PhotoGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  const collections = await getCollections()
  return collections.map(c => ({ slug: c.slug?.current ?? '' })).filter(p => p.slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) return {}
  return {
    title: collection.seoTitle ?? collection.title,
    description: collection.seoDescription ?? collection.description,
    openGraph: {
      title: collection.seoTitle ?? collection.title,
      description: collection.seoDescription ?? collection.description,
      images: collection.coverImage
        ? [{ url: urlFor(collection.coverImage).width(1200).height(630).url() }]
        : [],
    },
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = await getCollection(slug)
  if (!collection) notFound()

  const coverUrl = collection.coverImage
    ? urlFor(collection.coverImage).width(1920).height(800).url()
    : null

  const sortedPhotos = [...collection.photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <>
      {coverUrl && (
        <div className="relative h-[60vh] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={`${collection.title} — automotive photography by Roan Merluccio`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 z-10">
            {collection.category && (
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: collection.accentColor }}
              >
                {collection.category}
                {collection.location && ` · ${collection.location}`}
              </p>
            )}
            <h1 className="font-display text-6xl uppercase text-white leading-none">
              {collection.title}
            </h1>
          </div>
        </div>
      )}
      <div className="pt-8">
        <PhotoGrid photos={sortedPhotos} collectionTitle={collection.title} />
      </div>
    </>
  )
}
