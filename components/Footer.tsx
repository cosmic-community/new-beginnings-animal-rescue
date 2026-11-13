import Link from 'next/link'

export default function Footer({ email }: { email?: string }) {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 bg-cocoa text-cream">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold">🐾 New Beginnings</p>
          <p className="mt-3 text-sm text-cocoa-300">
            Animal rescue and adoption. Every animal deserves a loving home.
          </p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-cocoa-300">
            <li><Link href="/animals" className="hover:text-white">Adopt</Link></li>
            <li><Link href="/stories" className="hover:text-white">Success Stories</Link></li>
            <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Get involved</p>
          <ul className="mt-3 space-y-2 text-sm text-cocoa-300">
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-cocoa-700 py-5 text-center text-xs text-cocoa-300">
        © {year} New Beginnings Animal Rescue. All rights reserved.
      </div>
    </footer>
  )
}