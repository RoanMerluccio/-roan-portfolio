import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/plugins/structure'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema,
})
