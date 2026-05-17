'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        className="absolute top-6 right-6 text-white text-3xl leading-none font-display tracking-widest hover:text-accent"
        onClick={onClose}
        aria-label="Close photo viewer"
      >
        ✕
      </button>
      <div
        className="relative w-full h-full max-w-6xl max-h-screen p-8"
        onClick={e => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
      </div>
    </div>
  )
}
