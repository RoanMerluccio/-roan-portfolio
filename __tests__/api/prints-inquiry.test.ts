import { describe, it, expect, vi } from 'vitest'

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
      },
    }
  }),
}))

describe('POST /api/prints-inquiry', () => {
  it('returns 400 when required fields are missing', async () => {
    const { POST } = await import('../../app/api/prints-inquiry/route')
    const req = new Request('http://localhost/api/prints-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 with valid payload', async () => {
    const { POST } = await import('../../app/api/prints-inquiry/route')
    const req = new Request('http://localhost/api/prints-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'test@example.com', print: 'Monza Shot' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })
})
