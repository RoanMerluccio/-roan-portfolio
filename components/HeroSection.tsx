'use client'

import dynamic from 'next/dynamic'

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

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 px-6 pt-24 overflow-hidden">
      {sceneUrl ? (
        <SplineHero sceneUrl={sceneUrl} />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%)', zIndex: 0 }}
        />
      )}

      <div className="relative z-10 max-w-5xl">
        <p className="text-xs tracking-widest uppercase text-accent mb-4">
          Motorsport Photography
        </p>
        <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-tight uppercase mb-6">
          Car Photographer<br />
          <span className="text-accent">in Westchester, NY</span>
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Roan Merluccio delivers motorsport and automotive photography, rolling shots, dealership
          vehicle media, car listing photos, videography, and aerial content for car owners,
          dealerships, collectors, teams, and brands across Westchester County, NYC, Connecticut,
          and Rochester.
        </p>
      </div>
    </section>
  )
}
