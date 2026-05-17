import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Collection } from '@/lib/queries'

interface CollectionCardProps {
  collection: Collection
  featured?: boolean
}

export function CollectionCard({ collection, featured = false }: CollectionCardProps) {
  const imageUrl = collection.coverImage
    ? urlFor(collection.coverImage).width(featured ? 1200 : 600).height(featured ? 800 : 500).url()
    : null

  return (
    <Link
      href={`/collections/${collection.slug?.current ?? '#'}`}
      className="group relative flex flex-col justify-end overflow-hidden bg-surface h-full"
      style={{ minHeight: featured ? '480px' : '240px' }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`${collection.title} — automotive photography by Roan Merluccio`}
          fill
          priority={featured}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: collection.accentColor ?? '#e8ff00' }}
      />
      <div className="relative z-10 p-5">
        {collection.category && (
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: collection.accentColor ?? '#e8ff00' }}>
            {collection.category}
          </p>
        )}
        <h2 className={`font-display uppercase text-white leading-tight ${featured ? 'text-4xl' : 'text-2xl'}`}>
          {collection.title}
        </h2>
        <p className="text-xs text-muted mt-1 tracking-widest">
          {collection.photoCount ?? 0} Photos
        </p>
      </div>
    </Link>
  )
}
