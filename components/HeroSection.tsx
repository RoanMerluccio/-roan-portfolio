'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const SplineHero = dynamic(
  () => import('./SplineHero').then(m => m.SplineHero),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)', zIndex: 0 }}
      />
    ),
  }
)

const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? ''

const heroImageUrl = urlFor({
  _type: 'image',
  asset: { _ref: 'image-fc72b0503be9eeec07ccb13f2a23caace794bf5c-5168x2912-jpg', _type: 'reference' },
}).width(1920).url()

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-6 pt-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src={heroImageUrl}
          alt=""
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0a0a0a 35%, transparent 100%)' }}
        />
      </div>

      {sceneUrl && <SplineHero sceneUrl={sceneUrl} />}

      <div className="relative z-10 max-w-5xl">
        <p className="text-xs tracking-widest uppercase text-accent mb-4">
          Automotive · Motorsport · Aerial
        </p>
        <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-tight uppercase mb-6">
          Roan<br />
          <span className="text-accent">Merluccio</span>
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed mb-8">
          Photography for car owners, dealerships, motorsport teams, and brands.
          Based in Westchester, NY — available worldwide.
        </p>
        <div className="flex gap-4">
          <Link
            href="/collections/f1"
            className="bg-accent text-black text-xs font-bold tracking-widest uppercase px-6 py-3"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="border border-white/20 text-white/60 text-xs tracking-widest uppercase px-6 py-3"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
