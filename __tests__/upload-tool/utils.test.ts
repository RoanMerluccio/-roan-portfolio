import { describe, it, expect } from 'vitest'
import { filterImageFiles, parseExifFields } from '../../sanity/plugins/upload-tool/utils'

describe('filterImageFiles', () => {
  it('keeps jpeg, png, webp and removes other types', () => {
    const files = [
      new File([''], 'a.jpg', { type: 'image/jpeg' }),
      new File([''], 'b.png', { type: 'image/png' }),
      new File([''], 'c.webp', { type: 'image/webp' }),
      new File([''], 'd.pdf', { type: 'application/pdf' }),
      new File([''], 'e.txt', { type: 'text/plain' }),
    ]
    const result = filterImageFiles(files)
    expect(result).toHaveLength(3)
    expect(result.map(f => f.name)).toEqual(['a.jpg', 'b.png', 'c.webp'])
  })

  it('returns empty array when no image files', () => {
    const files = [new File([''], 'a.pdf', { type: 'application/pdf' })]
    expect(filterImageFiles(files)).toEqual([])
  })

  it('returns empty array for empty input', () => {
    expect(filterImageFiles([])).toEqual([])
  })
})

describe('parseExifFields', () => {
  it('combines Make and Model into camera', () => {
    const result = parseExifFields({ Make: 'Sony', Model: 'ILCE-7M4' })
    expect(result.camera).toBe('Sony ILCE-7M4')
  })

  it('uses only Model when Make is missing', () => {
    const result = parseExifFields({ Model: 'ILCE-7M4' })
    expect(result.camera).toBe('ILCE-7M4')
  })

  it('formats aperture as f/N', () => {
    expect(parseExifFields({ FNumber: 2.8 }).aperture).toBe('f/2.8')
  })

  it('formats fast shutter speed as fraction', () => {
    expect(parseExifFields({ ExposureTime: 0.001 }).shutterSpeed).toBe('1/1000s')
  })

  it('formats slow shutter speed in seconds', () => {
    expect(parseExifFields({ ExposureTime: 2 }).shutterSpeed).toBe('2s')
  })

  it('formats focal length with mm suffix', () => {
    expect(parseExifFields({ FocalLength: 85 }).focalLength).toBe('85mm')
  })

  it('passes through ISO as a number', () => {
    expect(parseExifFields({ ISO: 400 }).iso).toBe(400)
  })

  it('converts DateTimeOriginal Date object to ISO string', () => {
    const date = new Date('2025-11-03T10:30:00.000Z')
    const result = parseExifFields({ DateTimeOriginal: date })
    expect(result.dateTaken).toBe(date.toISOString())
  })

  it('converts LensModel to lens string', () => {
    expect(parseExifFields({ LensModel: 'FE 85mm F1.4 GM' }).lens).toBe('FE 85mm F1.4 GM')
  })

  it('returns empty object for empty input', () => {
    expect(parseExifFields({})).toEqual({})
  })

  it('ignores unknown keys', () => {
    const result = parseExifFields({ SomeRandomKey: 'value' })
    expect(result).toEqual({})
  })
})
