import type { Metadata } from 'next'
import Link from 'next/link'
import { getOrganizationInfo, getTeamMembers } from '@/lib/cosmic'
import PageHero from '@/components/PageHero'
import RichText from '@/components/RichText'
import TeamCard from '@/components/TeamCard'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'About',
  description: 'Our mission and the people behind New Beginnings Animal Rescue.',
}

export default async function AboutPage() {
  const [org, team] = await Promise.all([getOrganizationInfo(), getTeamMembers()])

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Our Mission"
        subtitle={org?.metadata?.tagline || 'Giving every animal a new beginning.'}
      />
      <section className="container-page max-w-3xl py-12">
        <RichText content={org?.metadata?.mission_statement} />
      </section>

      <section className="bg-cream-100 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="The people"
            title="Meet Our Team"
            subtitle="Dedicated staff and volunteers who love animals as much as you do."
          />
          {team.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-cocoa-500">Team profiles are coming soon.</p>
          )}
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <h2 className="text-3xl font-bold">Join our mission</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/animals" className="btn-primary">Adopt</Link>
          <Link href="/donate" className="btn-secondary">Donate</Link>
        </div>
      </section>
    </>
  )
}