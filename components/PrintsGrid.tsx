'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Print } from '@/lib/queries'
import { PrintsInquiryForm } from './PrintsInquiryForm'

interface PrintsGridProps {
  prints: Print[]
}

export function PrintsGrid({ prints }: PrintsGridProps) {
  const [selected, setSelected] = useState<Print | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {prints.map(print => {
          if (!print.photo) return null
          const src = urlFor(print.photo.image).width(800).height(600).url()
          return (
            <div key={print._id} className="group relative bg-surface overflow-hidden">
              <Image
                src={src}
                alt={print.photo.alt || `Print: ${print.title} — automotive photography by Roan Merluccio`}
                width={800}
                height={600}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="p-4 space-y-2">
                <h2 className="font-display text-xl uppercase text-white">{print.title}</h2>
                {print.sizesAvailable?.length > 0 && (
                  <p className="text-xs text-muted tracking-wide">{print.sizesAvailable.join(' · ')}</p>
                )}
                {print.priceRange && (
                  <p className="text-xs tracking-widest text-accent">{print.priceRange}</p>
                )}
                <button
                  onClick={() => setSelected(print)}
                  className="mt-2 text-xs tracking-widest uppercase border border-white/20 px-4 py-2 text-white hover:border-accent hover:text-accent transition-colors"
                >
                  Inquire
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-surface border border-surface-2 p-8 max-w-md w-full">
            <h3 className="font-display text-2xl uppercase text-white mb-6">
              Inquire: {selected.title}
            </h3>
            <PrintsInquiryForm printTitle={selected.title} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </>
  )
}
