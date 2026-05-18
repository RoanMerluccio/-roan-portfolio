# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the motorsport-focused hero with a general intro page — hero photo, name/tagline, five service blocks, and a featured work strip.

**Architecture:** Three components (`HeroSection` updated, `ServiceBlocks` new, `FeaturedWork` new) wired together in `app/page.tsx`. `FeaturedWork` is a server component that fetches the latest collection from Sanity. No schema changes needed.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, Sanity v5, `@sanity/image-url`

---

### Task 1: Update HeroSection + create ServiceBlocks

**Files:**
- Modify: `components/HeroSection.tsx`
- Create: `components/ServiceBlocks.tsx`

- [ ] **Step 1: Replace `components/HeroSection.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/ServiceBlocks.tsx`**

```tsx
const SERVICES = [
  { n: '01', title: 'Motorsport', desc: 'F1, Formula SAE, track days, and racing series coverage.' },
  { n: '02', title: 'Rolling Shots', desc: 'Two-car rolling and cinematic motion photography on the road.' },
  { n: '03', title: 'Dealership', desc: 'Vehicle listings, showroom, and brand media for dealers.' },
  { n: '04', title: 'Aerial', desc: 'Drone photography and video for events, properties, and automotive.' },
  { n: '05', title: 'Events', desc: 'Car shows, meets, launches, and automotive gatherings.' },
]

export function ServiceBlocks() {
  return (
    <section className="px-6 pb-8">
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-xs tracking-widest uppercase text-accent">What I Shoot</p>
        <p className="text-xs tracking-widest uppercase text-muted">5 Disciplines</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {SERVICES.slice(0, 3).map((s, i) => (
          <div
            key={s.n}
            className="bg-background p-6"
            style={{ borderTop: `2px solid ${i === 0 ? 'var(--color-accent)' : 'transparent'}` }}
          >
            <p className="text-xs tracking-widest text-accent mb-2">{s.n}</p>
            <h3 className="text-sm font-bold uppercase text-white mb-2">{s.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mt-px">
        {SERVICES.slice(3).map(s => (
          <div
            key={s.n}
            className="bg-background p-6"
            style={{ borderTop: '2px solid transparent' }}
          >
            <p className="text-xs tracking-widest text-accent mb-2">{s.n}</p>
            <h3 className="text-sm font-bold uppercase text-white mb-2">{s.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Check `http://localhost:3000` — hero photo visible at 25% opacity, five service blocks below**

- [ ] **Step 4: Commit**

```bash
git add components/HeroSection.tsx components/ServiceBlocks.tsx
git commit -m "feat: update hero and add service blocks for homepage redesign"
```

---

### Task 2: FeaturedWork component + wire page.tsx

**Files:**
- Create: `components/FeaturedWork.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/FeaturedWork.tsx`**

```tsx
import Link from 'next/link'
import { client } from '@/lib/sanity'

async function getLatestCollection() {
  return client.fetch<{ title: string; slug: { current: string }; photoCount: number } | null>(
    `*[_type == "collection"] | order(_updatedAt desc) [0] {
      title, slug, "photoCount": count(photos[defined(@)])
    }`
  )
}

export async function FeaturedWork() {
  const collection = await getLatestCollection()
  if (!collection) return null

  return (
    <section className="px-6 pb-12">
      <Link
        href={`/collections/${collection.slug.current}`}
        className="flex justify-between items-center border-l-2 border-accent bg-white/5 px-6 py-5 hover:bg-white/10 transition-colors"
      >
        <div>
          <p className="text-xs tracking-widest uppercase text-accent mb-1">Latest Work</p>
          <p className="text-sm font-bold text-white uppercase">
            {collection.title} — {collection.photoCount} photos
          </p>
        </div>
        <span className="text-xs tracking-widest uppercase text-accent">View Collection →</span>
      </Link>
    </section>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx` — add ServiceBlocks and FeaturedWork imports and insert them between HeroSection and CollectionsGrid**

The existing JSON-LD script block at the top of the JSX stays unchanged. Import and add the two new components:

```tsx
import { ServiceBlocks } from '@/components/ServiceBlocks'
import { FeaturedWork } from '@/components/FeaturedWork'
```

Insert `<ServiceBlocks />` and `<FeaturedWork />` after `<HeroSection />` and before `<CollectionsGrid />`.

- [ ] **Step 3: Verify `http://localhost:3000` — featured strip shows "F1 — 26 photos" with a working link**

- [ ] **Step 4: Commit and push**

```bash
git add components/FeaturedWork.tsx app/page.tsx
git commit -m "feat: add featured work strip and wire homepage redesign"
git push origin master
```
