import Link from 'next/link'
import type { EventItem } from '@/types'
import { formatDate, getMetafieldValue, imgix } from '@/lib/utils'

export default function EventCard({ event }: { event: EventItem }) {
  const m = event.metadata ?? {}
  const image = imgix(m.image, 'w=900&h=560&fit=crop&auto=format,compress')
  const date = formatDate(m.event_date)
  const type = getMetafieldValue(m.event_type)

  return (
    <Link
      href={`/events/${event.slug}`}
      className="card group block transition-transform duration-300 hover:-translate-y-1"
    >
      {image ? (
        <img
          src={image}
          alt={event.title}
          width={450}
          height={280}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-sage-100 text-5xl">📅</div>
      )}
      <div className="p-6">
        {type && (
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-sage-700">{type}</span>
        )}
        <h3 className="mt-3 text-xl font-bold">{event.title}</h3>
        {date && <p className="mt-2 text-sm text-cocoa-700">📅 {date}</p>}
        {m.location && <p className="text-sm text-cocoa-700">📍 {m.location}</p>}
      </div>
    </Link>
  )
}