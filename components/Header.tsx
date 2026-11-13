'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links: Array<{ href: string; label: string }> = [
  { href: '/animals', label: 'Adopt' },
  { href: '/stories', label: 'Success Stories' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-cocoa">
          <span aria-hidden="true">🐾</span>
          <span>New Beginnings</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-coral-600 ${
                  active ? 'text-coral-600' : 'text-cocoa-700'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/donate" className="btn-primary !px-5 !py-2 text-sm">
            💖 Donate
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-cocoa md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream-200 bg-cream px-4 pb-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 font-semibold text-cocoa-700 hover:bg-coral-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/donate" onClick={() => setOpen(false)} className="btn-primary w-full">
                💖 Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}