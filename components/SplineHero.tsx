'use client'

import Spline from '@splinetool/react-spline'

interface SplineHeroProps {
  sceneUrl: string
}

export function SplineHero({ sceneUrl }: SplineHeroProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-30 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Spline scene={sceneUrl} />
    </div>
  )
}
