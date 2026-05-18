/**
 * Backfills collection.photos arrays for photos that have a collection reference
 * but aren't yet listed in the collection's photos array.
 *
 * Usage (PowerShell):
 *   $env:SANITY_WRITE_TOKEN="your-token"; npx tsx scripts/backfill-collection-photos.ts
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN environment variable')
  process.exit(1)
}

const client = createClient({
  projectId: '12fu9om0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function main() {
  // Fetch all photos that have a collection reference
  const photos = await client.fetch<{ _id: string; collection: { _ref: string } }[]>(
    `*[_type == "photo" && defined(collection._ref)]{ _id, collection }`
  )

  if (photos.length === 0) {
    console.log('No photos with a collection reference found.')
    return
  }

  // Group photo IDs by collection ID
  const byCollection = new Map<string, string[]>()
  for (const photo of photos) {
    const colId = photo.collection._ref
    if (!byCollection.has(colId)) byCollection.set(colId, [])
    byCollection.get(colId)!.push(photo._id)
  }

  console.log(`Found ${photos.length} photos across ${byCollection.size} collection(s)`)

  for (const [collectionId, photoIds] of byCollection) {
    // Fetch current photos array to avoid duplicates
    const col = await client.fetch<{ title: string; photos?: { _ref: string }[] }>(
      `*[_id == $id][0]{ title, "photos": photos[]{ _ref } }`,
      { id: collectionId }
    )

    const existing = new Set((col?.photos ?? []).map(p => p._ref))
    const toAdd = photoIds.filter(id => !existing.has(id))

    if (toAdd.length === 0) {
      console.log(`"${col?.title}" — already up to date`)
      continue
    }

    const refs = toAdd.map(id => ({ _type: 'reference' as const, _ref: id, _weak: true }))
    await client
      .patch(collectionId)
      .setIfMissing({ photos: [] })
      .append('photos', refs)
      .commit()

    console.log(`"${col?.title}" — added ${toAdd.length} photo(s)`)
  }

  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
