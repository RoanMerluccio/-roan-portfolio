import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Roan Merluccio for automotive photography, motorsport coverage, rolling shots, and dealership media in Westchester, NYC, and Connecticut.',
}

export default function ContactPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-3xl">
      <p className="text-xs tracking-widest uppercase text-accent mb-2">Contact</p>
      <h1 className="font-display text-6xl uppercase text-white mb-4">Get In Touch</h1>
      <p className="text-muted text-sm mb-10 max-w-lg leading-relaxed">
        Available for motorsport events, automotive shoots, rolling shots, dealership media,
        and aerial content across Westchester, NYC, Connecticut, and Rochester.
      </p>
      <ContactForm />
    </div>
  )
}
