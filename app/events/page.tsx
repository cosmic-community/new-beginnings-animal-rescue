import type { Metadata } from 'next'
import { getEvents } from '@/lib/cosmic'
import { isUpcoming } from '@/lib/utils'
import EventCard from '@/components/EventCard'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Adoption days, fundraisers and community events from New Beginnings Animal Rescue.',
}

export default async function EventsPage() {
  const events = await getEvents()
  const upcoming = events.filter((e) => isUpcoming(e.metadata?.event_date))
  const past = events.filter((e) => !isUpcoming(e.metadata?.event_date)).reverse()

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Come Meet Us"
        subtitle="Adoption days, fundraisers and community gatherings. Bring a friend."
      />
      <section className="container-page py-12">
        <h2 className="text-3xl font-bold">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-cocoa-500">No upcoming events right now. Check back soon!</p>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mt-16 text-3xl font-bold">Past events</h2>
            <div className="mt-8 grid gap-8 opacity-80 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}