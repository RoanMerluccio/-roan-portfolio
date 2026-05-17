import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-surface-2 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs tracking-widest text-muted uppercase">
        © {new Date().getFullYear()} Roan Merluccio
      </p>
      <Link
        href="/contact"
        className="text-xs tracking-widest uppercase text-accent hover:text-white transition-colors"
      >
        Available for Commissions
      </Link>
    </footer>
  )
}
