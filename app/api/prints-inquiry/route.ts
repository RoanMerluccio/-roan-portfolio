import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json().catch(() => ({}))
  const { name, email, print, message } = body

  if (!name || !email || !print) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Prints <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    replyTo: email as string,
    subject: `[Print Inquiry] ${print} — from ${name}`,
    text: `Print: ${print}\nName: ${name}\nEmail: ${email}\n\n${message ?? ''}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
