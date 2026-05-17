export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPrints } from '@/lib/queries'
import { PrintsGrid } from '@/components/PrintsGrid'

export const metadata: Metadata = {
  title: 'Prints',
  description:
    'Order automotive and motorsport photography prints by Roan Merluccio. Available in multiple sizes for car owners, collectors, and enthusiasts in Westchester and NYC.',
}

export default async function PrintsPage() {
  const prints = await getPrints()

  return (
    <div className="pt-24 px-6 pb-16">
      <p className="text-xs tracking-widest uppercase text-accent mb-2">Prints</p>
      <h1 className="font-display text-6xl uppercase text-white mb-12">Available Prints</h1>
      {prints.length > 0 ? (
        <PrintsGrid prints={prints} />
      ) : (
        <p className="text-muted text-sm">
          No prints listed yet — check back soon or{' '}
          <a href="/contact" className="text-accent hover:underline">get in touch</a>.
        </p>
      )}
    </div>
  )
}
