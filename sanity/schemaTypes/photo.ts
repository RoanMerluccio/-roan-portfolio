import { defineField, defineType } from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'collection', title: 'Collection', type: 'reference', to: [{ type: 'collection' }] }),
    defineField({ name: 'availableAsPrint', title: 'Available as Print', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'alt', media: 'image' } },
})
