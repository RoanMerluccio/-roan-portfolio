'use client'

import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  if (status === 'sent') {
    return (
      <div className="py-12">
        <p className="font-display text-3xl uppercase text-accent">Message Sent</p>
        <p className="text-muted text-sm mt-2">I&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="name" type="text" required placeholder="Name"
        className="w-full bg-surface border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
      />
      <input
        name="email" type="email" required placeholder="Email"
        className="w-full bg-surface border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
      />
      <input
        name="subject" type="text" placeholder="Subject"
        className="w-full bg-surface border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
      />
      <textarea
        name="message" rows={6} required placeholder="Message"
        className="w-full bg-surface border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
      />
      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-accent text-background text-xs tracking-widest uppercase px-8 py-3 font-bold hover:bg-white transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
