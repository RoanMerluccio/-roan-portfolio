import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'portrait', title: 'Portrait', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'gearList', title: 'Gear List', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Category', type: 'string' },
          { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
    }),
  ],
})
