import { defineField, defineType } from 'sanity'

export const printType = defineType({
  name: 'print',
  title: 'Print',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'photo', title: 'Photo', type: 'reference', to: [{ type: 'photo' }] }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'sizesAvailable', title: 'Sizes Available', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['A3', 'A2', 'A1', '50x70cm', '60x90cm', 'Custom'] },
    }),
    defineField({ name: 'priceRange', title: 'Price Range', type: 'string' }),
    defineField({ name: 'available', title: 'Available', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'title', media: 'photo.image' } },
})
