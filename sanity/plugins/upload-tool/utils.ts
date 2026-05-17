import type { ExifFields } from './types'

const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function filterImageFiles(files: File[]): File[] {
  return files.filter(f => ACCEPTED_TYPES.has(f.type))
}

export function parseExifFields(raw: Record<string, unknown>): ExifFields {
  const fields: ExifFields = {}

  const make = raw.Make as string | undefined
  const model = raw.Model as string | undefined
  if (make || model) fields.camera = [make, model].filter(Boolean).join(' ')

  if (raw.LensModel) fields.lens = String(raw.LensModel)

  if (typeof raw.FNumber === 'number') {
    fields.aperture = `f/${raw.FNumber}`
  }

  if (typeof raw.ExposureTime === 'number') {
    fields.shutterSpeed = raw.ExposureTime >= 1
      ? `${raw.ExposureTime}s`
      : `1/${Math.round(1 / raw.ExposureTime)}s`
  }

  if (typeof raw.ISO === 'number') fields.iso = raw.ISO

  if (typeof raw.FocalLength === 'number') fields.focalLength = `${raw.FocalLength}mm`

  if (raw.DateTimeOriginal) {
    const d = raw.DateTimeOriginal instanceof Date
      ? raw.DateTimeOriginal
      : new Date(String(raw.DateTimeOriginal))
    if (!isNaN(d.getTime())) fields.dateTaken = d.toISOString()
  }

  return fields
}
