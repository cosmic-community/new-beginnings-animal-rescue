import Link from 'next/link'
import {
  getOrganizationInfo,
  getAdoptableAnimals,
  getImpactStories,
  getTestimonials,
  getEvents,
} from '@/lib/cosmic'
import { getMetafieldValue, imgix, isUpcoming, toNumber } from '@/lib/utils'
import AnimalCard from '@/components/AnimalCard'
import FundraisingProgress from '@/components/FundraisingProgress'
import SectionHeading from '@/components/SectionHeading'
import TestimonialCard from '@/components/TestimonialCard'
import EventCard from '@/components/EventCard'
import RichText from '@/components/RichText'

export default async function HomePage() {
  const [org, animals, stories, testimonials, events] = await Promise.all([
    getOrganizationInfo(),
    getAdoptableAnimals(),
    getImpactStories(),
    getTestimonials(),
    getEvents(),
  ])

  const available = animals.filter(
    (a) => getMetafieldValue(a.metadata?.adoption_status).toLowerCase() === 'available'
  )
  const featured = (available.length > 0 ? available : animals).slice(0, 6)
  const story = stories[0]
  const upcoming = events.filter((e) => isUpcoming(e.metadata?.event_date)).slice(0, 3)
  const heroImage =
    org?.metadata?.hero_image ?? featured[0]?.metadata?.photo ?? undefined
  const donationUrl = org?.metadata?.donation_link || '/donate'
  const external = donationUrl.startsWith('http')
  const goal = toNumber(org?.metadata?.fundraising_goal)
  const raised = toNumber(org?.metadata?.amount_raised)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream to-coral-50">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 inline-block rounded-full bg-coral-100 px-4 py-1 text-sm font-semibold text-coral-700">
              🐾 Every animal deserves a new beginning
            </p>
            <h1 className="text-4xl font-bold leading-tight text-cocoa sm:text-5xl lg:text-6xl">
              {org?.metadata?.tagline || 'Give a loving animal a second chance'}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cocoa-700">
              {org?.metadata?.mission_statement
                ? getMetafieldValue(org.metadata.mission_statement).slice(0, 220)
                : 'Meet the dogs, cats and friends waiting for a family like yours.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/animals" className="btn-primary">
                🐶 Meet Our Animals
              </Link>
              {external ? (
                <a href={donationUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  💖 Donate
                </a>
              ) : (
                <Link href={donationUrl} className="btn-secondary">
                  💖 Donate
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            {heroImage ? (
              <img
                src={imgix(heroImage, 'w=1400&h=1100&fit=crop&auto=format,compress') ?? ''}
                alt="A rescued animal at New Beginnings Animal Rescue"
                width={700}
                height={550}
                className="h-80 w-full rounded-[2.5rem] object-cover shadow-soft sm:h-[28rem]"
              />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-[2.5rem] bg-coral-100 text-8xl sm:h-[28rem]">
                🐕
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured animals */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Ready for a home"
          title="Meet Our Animals"
          subtitle="These sweethearts are waiting for someone to call them family."
        />
        {featured.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-cocoa-500">New friends are arriving soon. Check back shortly!</p>
        )}
        <div className="mt-10 text-center">
          <Link href="/animals" className="btn-primary">
            See all adoptable animals
          </Link>
        </div>
      </section>

      {/* Fundraising */}
      <section className="bg-cream-100 py-16">
        <div className="container-page">
          <FundraisingProgress raised={raised} goal={goal} donationUrl={donationUrl} />
        </div>
      </section>

      {/* Impact story */}
      {story && (
        <section className="container-page py-16">
          <SectionHeading
            eyebrow="Happy tails"
            title="A Story That Warms Our Hearts"
            subtitle="Your support makes endings like this possible."
          />
          <div className="card mt-10 grid overflow-hidden lg:grid-cols-2">
            {story.metadata?.after_photo ? (
              <img
                src={imgix(story.metadata.after_photo, 'w=1200&h=900&fit=crop&auto=format,compress') ?? ''}
                alt={story.metadata?.animal_name || story.title}
                width={600}
                height={450}
                className="h-72 w-full object-cover lg:h-full"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-coral-100 text-7xl">💖</div>
            )}
            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-bold">{story.title}</h3>
              <div className="mt-4 text-cocoa-700">
                <RichText content={story.metadata?.summary} />
              </div>
              <Link href={`/stories/${story.slug}`} className="btn-primary mt-6">
                Read the full story
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-gradient-to-b from-cream to-coral-50 py-16">
          <div className="container-page">
            <SectionHeading eyebrow="Kind words" title="What Our Community Says" />
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {upcoming.length > 0 && (
        <section className="container-page py-16">
          <SectionHeading
            eyebrow="Get involved"
            title="Upcoming Events"
            subtitle="Come meet our animals and our community in person."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/events" className="btn-secondary">
              View all events
            </Link>
          </div>
        </section>
      )}
    </>
  )
}