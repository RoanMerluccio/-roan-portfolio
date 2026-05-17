import { defineField, defineType } from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: r => r.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'collection', title: 'Collection', type: 'reference', to: [{ type: 'collection' }], weak: true }),
    defineField({ name: 'availableAsPrint', title: 'Available as Print', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'camera',       title: 'Camera',        type: 'string' }),
    defineField({ name: 'lens',         title: 'Lens',          type: 'string' }),
    defineField({ name: 'aperture',     title: 'Aperture',      type: 'string' }),
    defineField({ name: 'shutterSpeed', title: 'Shutter Speed', type: 'string' }),
    defineField({ name: 'iso',          title: 'ISO',           type: 'number' }),
    defineField({ name: 'focalLength',  title: 'Focal Length',  type: 'string' }),
    defineField({ name: 'dateTaken',    title: 'Date Taken',    type: 'datetime' }),
  ],
  preview: { select: { title: 'alt', media: 'image' } },
})
