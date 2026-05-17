'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/prints', label: 'Prints' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-surface-2 bg-background/90 backdrop-blur-sm">
      <Link href="/" className="font-display text-xl tracking-widest text-white hover:text-accent transition-colors">
        RM
      </Link>
      <nav aria-label="Main navigation">
        <ul className="flex gap-6 list-none m-0 p-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  pathname === href ? 'text-accent' : 'text-muted hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
