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
