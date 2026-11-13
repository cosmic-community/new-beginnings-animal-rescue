import type { Metadata } from 'next'
import { getPrograms } from '@/lib/cosmic'
import ProgramCard from '@/components/ProgramCard'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Programs',
  description: 'The programs that help New Beginnings Animal Rescue save and rehome animals.',
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="How We Help Animals"
        subtitle="From rescue to rehabilitation to adoption, here is how your support is put to work."
      />
      <section className="container-page py-12">
        {programs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} showDescription />
            ))}
          </div>
        ) : (
          <p className="text-center text-cocoa-500">Programs are coming soon.</p>
        )}
      </section>
    </>
  )
}