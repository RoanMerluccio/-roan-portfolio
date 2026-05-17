import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { getAbout } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Roan Merluccio is a motorsport and automotive photographer based in Westchester, NY, serving NYC, Connecticut, and Rochester.',
}

export default async function AboutPage() {
  const about = await getAbout()

  return (
    <div className="pt-24 px-6 pb-16 max-w-5xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-accent mb-2">About</p>
      <h1 className="font-display text-6xl uppercase text-white mb-12">Roan Merluccio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {about?.portrait && (
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={urlFor(about.portrait).width(800).height(1067).url()}
              alt="Roan Merluccio — automotive and motorsport photographer based in Westchester NY"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <div className="space-y-8">
          {about?.bio && (
            <div className="prose prose-invert prose-sm max-w-none text-muted leading-relaxed">
              <PortableText value={about.bio as Parameters<typeof PortableText>[0]['value']} />
            </div>
          )}

          {about?.gearList && about.gearList.length > 0 && (
            <div>
              <h2 className="font-display text-2xl uppercase text-white mb-4">Gear</h2>
              <div className="space-y-4">
                {about.gearList.map(section => (
                  <div key={section.label}>
                    <p className="text-xs tracking-widest uppercase text-accent mb-1">{section.label}</p>
                    <ul className="space-y-1">
                      {section.items.map(item => (
                        <li key={item} className="text-sm text-muted">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
