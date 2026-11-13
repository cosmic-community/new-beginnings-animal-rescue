import type { Metadata } from 'next'
import Link from 'next/link'
import { getOrganizationInfo, getPrograms } from '@/lib/cosmic'
import { getMetafieldValue, toNumber } from '@/lib/utils'
import PageHero from '@/components/PageHero'
import FundraisingProgress from '@/components/FundraisingProgress'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Your gift gives rescued animals food, medical care and a path to a loving home.',
}

export default async function DonatePage() {
  const [org, programs] = await Promise.all([getOrganizationInfo(), getPrograms()])
  const donationUrl = org?.metadata?.donation_link || ''
  const goal = toNumber(org?.metadata?.fundraising_goal)
  const raised = toNumber(org?.metadata?.amount_raised)
  const email = org?.metadata?.contact_email

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your Gift Changes Lives"
        subtitle="Every dollar helps a rescued animal get care, comfort and a chance at a forever family."
      />
      <section className="container-page max-w-4xl py-12">
        <FundraisingProgress raised={raised} goal={goal} donationUrl={donationUrl || undefined} />
        {!donationUrl && (
          <p className="mt-6 text-center text-cocoa-500">
            Online giving is being set up.{' '}
            {email ? (
              <>
                Email <a className="font-semibold text-coral-600" href={`mailto:${email}`}>{email}</a> to give today.
              </>
            ) : (
              'Please check back soon.'
            )}
          </p>
        )}
      </section>

      {programs.length > 0 && (
        <section className="bg-cream-100 py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Where it goes"
              title="Your Donation at Work"
              subtitle="Gifts support the programs that rescue, heal and rehome animals."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <div key={program.id} className="card p-6">
                  <h3 className="text-xl font-bold">{program.title}</h3>
                  <p className="mt-2 text-cocoa-700">{getMetafieldValue(program.metadata?.summary)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16 text-center">
        <h2 className="text-3xl font-bold">Can&apos;t give right now?</h2>
        <p className="mx-auto mt-3 max-w-xl text-cocoa-700">
          Adopting, attending an event or sharing our animals helps just as much.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/animals" className="btn-primary">Meet Our Animals</Link>
          <Link href="/events" className="btn-secondary">See Events</Link>
        </div>
      </section>
    </>
  )
}