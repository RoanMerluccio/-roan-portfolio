# Home Page Redesign — Design Spec

**Date:** 2026-05-18  
**Status:** Approved

## Overview

Replace the motorsport-focused hero section on the home page (`/`) with a general intro page that presents Roan Merluccio as an automotive photographer across multiple disciplines. Motorsport remains featured work, not the sole identity.

## Layout

### Hero Section

Full-width section with:
- Background: one of the photographer's actual photos (F1 Belgium cover image), dimmed to ~25% opacity with a gradient overlay fading to black at the bottom
- Falls back to dark radial gradient if no photo is configured
- Content (bottom-left aligned, z-index above background):
  - Label: `AUTOMOTIVE · MOTORSPORT · AERIAL` (yellow accent, uppercase, wide tracking)
  - Heading: `ROAN MERLUCCIO` (large, bold, uppercase, white)
  - Description: short 1–2 sentence bio covering disciplines and location
  - Two CTAs: `VIEW WORK` (yellow filled) and `GET IN TOUCH` (outlined)

### Service Blocks

Section header: `WHAT I SHOOT` (yellow accent label) with discipline count on the right.

Five service blocks in a 3 + 2 grid:
1. **Motorsport** — F1, Formula SAE, track days, racing series coverage *(yellow top border — primary discipline)*
2. **Rolling Shots** — Two-car rolling, cinematic motion photography on the road
3. **Dealership** — Vehicle listings, showroom, and brand media for dealers
4. **Aerial** — Drone photography and video for events, properties, and automotive
5. **Events** — Car shows, meets, launches, and automotive gatherings

Each block: numbered label (01–05), bold uppercase title, short description in muted text.

### Featured Work Strip

Below service blocks: a highlighted bar (left yellow border) showing the most recently updated collection — title, photo count, and a `VIEW COLLECTION →` link. Pulls the latest collection from Sanity dynamically.

### Collections Grid + FAQ

Existing `CollectionsGrid` and `FAQ` components remain below, unchanged.

## Architecture

### Modified files

- `app/page.tsx` — update to use new `HeroSection` props and add `ServiceBlocks` + `FeaturedWork` components
- `components/HeroSection.tsx` — update copy and add hero photo background (replace Spline-only approach with a static photo fallback that always shows something)
- `components/ServiceBlocks.tsx` — new component, pure UI, no data fetching
- `components/FeaturedWork.tsx` — new component, fetches latest collection from Sanity

### New files

```
components/ServiceBlocks.tsx   ← static service grid, no props needed
components/FeaturedWork.tsx    ← fetches latest collection, renders strip
```

### Data

`FeaturedWork` fetches:
```groq
*[_type == "collection"] | order(_updatedAt desc) [0] {
  title, slug, coverImage, "photoCount": count(photos[defined(@)])
}
```

No new Sanity schema changes needed.

## What's Out of Scope

- Adding per-service landing pages
- Animating the service blocks
- Making the hero photo configurable from the Studio (hardcoded asset ref is fine for now)
- Changing the nav or footer
