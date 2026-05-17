import { defineField, defineType } from 'sanity'

export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'accentColor', title: 'Accent Color (hex)', type: 'string', initialValue: '#e8ff00' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Motorsport', 'Automotive', 'Dealership', 'Aerial', 'Event', 'Other'] },
    }),
    defineField({ name: 'clientType', title: 'Client Type', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'photos', title: 'Photos', type: 'array', of: [{ type: 'reference', to: [{ type: 'photo' }] }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
})
