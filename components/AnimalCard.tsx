import Link from 'next/link'
import type { AdoptableAnimal } from '@/types'
import { getMetafieldValue, imgix } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'

export default function AnimalCard({ animal }: { animal: AdoptableAnimal }) {
  const m = animal.metadata ?? {}
  const photo = imgix(m.photo, 'w=900&h=720&fit=crop&auto=format,compress')
  const details = [getMetafieldValue(m.breed), getMetafieldValue(m.age), getMetafieldValue(m.sex)].filter(
    (v) => v !== ''
  )

  return (
    <Link
      href={`/animals/${animal.slug}`}
      className="card group block transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        {photo ? (
          <img
            src={photo}
            alt={animal.title}
            width={450}
            height={360}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-coral-100 text-6xl">🐾</div>
        )}
        <div className="absolute left-4 top-4">
          <StatusBadge status={getMetafieldValue(m.adoption_status)} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{animal.title}</h3>
        {details.length > 0 && <p className="mt-1 text-sm text-cocoa-500">{details.join(' · ')}</p>}
        <p className="mt-4 text-sm font-semibold text-coral-600">Meet {animal.title} →</p>
      </div>
    </Link>
  )
}