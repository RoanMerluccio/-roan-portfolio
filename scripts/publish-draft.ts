import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '12fu9om0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

async function main() {
  const draftId = 'drafts.c6ceedc2-feb6-4cfd-b7e8-f4cec1a6dab1'
  const publishedId = 'c6ceedc2-feb6-4cfd-b7e8-f4cec1a6dab1'

  const draft = await client.getDocument(draftId)
  if (!draft) { console.error('Draft not found'); process.exit(1) }

  const { _id, _updatedAt, ...rest } = draft
  await client.createOrReplace({ ...rest, _id: publishedId })
  await client.delete(draftId)

  console.log(`Published: "${draft.title}" (${publishedId})`)
}

main().catch(err => { console.error(err); process.exit(1) })
