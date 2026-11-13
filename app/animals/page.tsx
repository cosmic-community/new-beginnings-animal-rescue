import type { Metadata } from 'next'
import { getAdoptableAnimals } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/utils'
import AnimalCard from '@/components/AnimalCard'
import AnimalFilters from '@/components/AnimalFilters'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Adopt',
  description: 'Browse adoptable dogs, cats and more at New Beginnings Animal Rescue.',
}

export default async function AnimalsPage({
  searchParams,
}: {
  searchParams: Promise<{ species?: string; status?: string }>
}) {
  const { species = '', status = '' } = await searchParams
  const animals = await getAdoptableAnimals()

  const speciesSet = new Set<string>()
  for (const a of animals) {
    const s = getMetafieldValue(a.metadata?.species).trim()
    if (s) speciesSet.add(s)
  }
  const speciesList = Array.from(speciesSet).sort()

  const filtered = animals.filter((a) => {
    const s = getMetafieldValue(a.metadata?.species).toLowerCase()
    const st = getMetafieldValue(a.metadata?.adoption_status).toLowerCase()
    if (species && s !== species.toLowerCase()) return false
    if (status && st !== status.toLowerCase()) return false
    return true
  })

  return (
    <>
      <PageHero
        eyebrow="Adopt"
        title="Find Your New Best Friend"
        subtitle="Every animal here is vaccinated, loved and ready for a forever home."
      />
      <section className="container-page py-12">
        <AnimalFilters species={speciesList} currentSpecies={species} currentStatus={status} />
        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-5xl">🐾</p>
            <p className="mt-4 text-lg text-cocoa-700">No animals match those filters right now.</p>
          </div>
        )}
      </section>
    </>
  )
}