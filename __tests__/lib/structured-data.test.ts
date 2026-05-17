import { describe, it, expect } from 'vitest'
import { getLocalBusinessSchema, getFAQSchema } from '../../lib/structured-data'

describe('getLocalBusinessSchema', () => {
  it('returns valid JSON-serialisable object', () => {
    const schema = getLocalBusinessSchema()
    expect(() => JSON.stringify(schema)).not.toThrow()
  })

  it('has required @context and @type', () => {
    const schema = getLocalBusinessSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toContain('LocalBusiness')
  })

  it('includes areaServed with Westchester County', () => {
    const schema = getLocalBusinessSchema()
    const areas = schema.areaServed.map((a: { name: string }) => a.name)
    expect(areas).toContain('Westchester County')
  })

  it('has all 13 areaServed locations', () => {
    const schema = getLocalBusinessSchema()
    expect(schema.areaServed.length).toBe(13)
  })

  it('has all 12 services in makesOffer', () => {
    const schema = getLocalBusinessSchema()
    expect(schema.makesOffer.length).toBe(12)
  })
})

describe('getFAQSchema', () => {
  it('returns FAQPage type with mainEntity array', () => {
    const schema = getFAQSchema()
    expect(schema['@type']).toBe('FAQPage')
    expect(Array.isArray(schema.mainEntity)).toBe(true)
    expect(schema.mainEntity.length).toBeGreaterThan(0)
  })

  it('each FAQ has a Question and Answer', () => {
    const schema = getFAQSchema()
    schema.mainEntity.forEach((q: { '@type': string; acceptedAnswer: { '@type': string } }) => {
      expect(q['@type']).toBe('Question')
      expect(q.acceptedAnswer['@type']).toBe('Answer')
    })
  })

  it('has exactly 5 FAQs', () => {
    const schema = getFAQSchema()
    expect(schema.mainEntity.length).toBe(5)
  })
})
