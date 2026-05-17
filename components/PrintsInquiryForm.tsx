'use client'

import { useState } from 'react'

interface PrintsInquiryFormProps {
  printTitle: string
  onClose: () => void
}

export function PrintsInquiryForm({ printTitle, onClose }: PrintsInquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/prints-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <p className="text-accent font-display text-2xl uppercase">Inquiry Sent</p>
        <p className="text-muted text-sm mt-2">I&apos;ll get back to you shortly.</p>
        <button onClick={onClose} className="mt-4 text-xs tracking-widest uppercase text-white hover:text-accent">
          Close
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="print" value={printTitle} />
      <input
        name="name" type="text" required placeholder="Your Name"
        className="w-full bg-surface-2 border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
      />
      <input
        name="email" type="email" required placeholder="Your Email"
        className="w-full bg-surface-2 border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
      />
      <textarea
        name="message" rows={4} placeholder="Any questions or size preferences?"
        className="w-full bg-surface-2 border border-surface-2 px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
      />
      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong — please email directly.</p>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex-1 bg-accent text-background text-xs tracking-widest uppercase py-3 font-bold hover:bg-white transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
        </button>
        <button type="button" onClick={onClose} className="text-xs tracking-widest uppercase text-muted hover:text-white">
          Cancel
        </button>
      </div>
    </form>
  )
}
