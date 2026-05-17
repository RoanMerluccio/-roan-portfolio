import { CollectionCard } from './CollectionCard'
import type { Collection } from '@/lib/queries'

interface CollectionsGridProps {
  collections: Collection[]
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  const [featured, ...rest] = collections

  return (
    <section className="px-6 pb-16" aria-label="Photo collections">
      <p className="text-xs tracking-widest uppercase text-accent mb-4">Latest Work</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {featured && (
          <div className="md:col-span-2 md:row-span-2 h-full">
            <CollectionCard collection={featured} featured />
          </div>
        )}
        {rest.map(collection => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </section>
  )
}
