// app/events/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEventBySlug } from '@/lib/cosmic'
import { formatDate, getMetafieldValue, imgix } from '@/lib/utils'
import RichText from '@/components/RichText'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const m = event.metadata ?? {}
  const image = imgix(m.image, 'w=1600&h=800&fit=crop&auto=format,compress')
  const date = formatDate(m.event_date)
  const type = getMetafieldValue(m.event_type)

  return (
    <article className="container-page max-w-4xl py-12">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: event.id, object_type: event.type })}
      />
      <Link href="/events" className="text-sm font-semibold text-coral-600 hover:text-coral-700">
        ← All events
      </Link>
      {image && (
        <img
          src={image}
          alt={event.title}
          width={800}
          height={400}
          className="mt-6 h-64 w-full rounded-3xl object-cover shadow-soft sm:h-96"
        />
      )}
      {type && (
        <p className="mt-8 inline-block rounded-full bg-sage-100 px-4 py-1 text-sm font-semibold text-sage-700">
          {type}
        </p>
      )}
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{event.title}</h1>
      <div className="mt-4 flex flex-wrap gap-6 text-cocoa-700">
        {date && <span>📅 {date}</span>}
        {m.location && <span>📍 {m.location}</span>}
      </div>
      <div className="mt-8">
        <RichText content={m.description} />
      </div>
      {m.registration_link && (
        <a
          href={m.registration_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          Register for this event
        </a>
      )}
    </article>
  )
}