'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from './Lightbox'
import { urlFor } from '@/lib/sanity'
import type { Photo } from '@/lib/queries'

interface PhotoGridProps {
  photos: Photo[]
  collectionTitle: string
}

export function PhotoGrid({ photos, collectionTitle }: PhotoGridProps) {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 px-6 pb-16">
        {photos.map(photo => {
          const src = urlFor(photo.image).width(1200).url()
          const alt = photo.alt || `Automotive photography by Roan Merluccio — ${collectionTitle}`
          return (
            <button
              key={photo._id}
              className="block w-full mb-1 overflow-hidden group cursor-zoom-in"
              onClick={() => setActive({ src, alt })}
              aria-label={`View: ${alt}`}
            >
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          )
        })}
      </div>
      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />
      )}
    </>
  )
}
