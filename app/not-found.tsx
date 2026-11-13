import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-6xl">🐾</p>
      <h1 className="mt-4 text-4xl font-bold">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-cocoa-700">It may have found a new home.</p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  )
}