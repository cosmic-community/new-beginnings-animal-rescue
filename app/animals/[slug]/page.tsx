// app/animals/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAnimalBySlug, getOrganizationInfo } from '@/lib/cosmic'
import { formatFee, getMetafieldValue } from '@/lib/utils'
import type { ImageField } from '@/types'
import PhotoGallery from '@/components/PhotoGallery'
import StatusBadge from '@/components/StatusBadge'
import CompatibilityBadges from '@/components/CompatibilityBadges'
import RichText from '@/components/RichText'

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [animal, org] = await Promise.all([getAnimalBySlug(slug), getOrganizationInfo()])
  if (!animal) notFound()

  const m = animal.metadata ?? {}
  const images: ImageField[] = []
  if (m.photo) images.push(m.photo)
  if (Array.isArray(m.gallery)) {
    for (const g of m.gallery) {
      if (g && g.imgix_url) images.push(g)
    }
  }

  const status = getMetafieldValue(m.adoption_status)
  const adopted = status.toLowerCase() === 'adopted'
  const email = org?.metadata?.contact_email
  const applyHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(`Adoption application: ${animal.title}`)}`
    : '/about'

  const details: Array<[string, string]> = [
    ['Species', getMetafieldValue(m.species)],
    ['Breed', getMetafieldValue(m.breed)],
    ['Age', getMetafieldValue(m.age)],
    ['Sex', getMetafieldValue(m.sex)],
    ['Size', getMetafieldValue(m.size)],
    ['Adoption fee', formatFee(m.adoption_fee)],
  ]
  const visibleDetails = details.filter(([, value]) => value !== '')
  const program = m.program

  return (
    <div className="container-page py-12">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: animal.id, object_type: animal.type })}
      />
      <Link href="/animals" className="text-sm font-semibold text-coral-600 hover:text-coral-700">
        ← Back to all animals
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <PhotoGallery images={images} alt={animal.title} />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={status} />
          </div>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Meet {animal.title}</h1>

          {visibleDetails.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-soft sm:grid-cols-3">
              {visibleDetails.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-cocoa-500">{label}</dt>
                  <dd className="mt-1 font-semibold text-cocoa">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {m.personality && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Personality</h2>
              <div className="mt-3 text-cocoa-700">
                <RichText content={m.personality} />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Good with…</h2>
            <div className="mt-3">
              <CompatibilityBadges
                kids={m.good_with_kids}
                dogs={m.good_with_dogs}
                cats={m.good_with_cats}
              />
            </div>
          </div>

          {program && program.slug && (
            <p className="mt-8 text-cocoa-700">
              Part of our{' '}
              <Link href="/programs" className="font-semibold text-coral-600 hover:text-coral-700">
                {program.title}
              </Link>{' '}
              program.
            </p>
          )}

          <div className="mt-10">
            {adopted ? (
              <div className="rounded-3xl bg-coral-50 p-6">
                <p className="font-semibold">🎉 {animal.title} has found a home!</p>
                <Link href="/animals?status=Available" className="btn-primary mt-4">
                  Meet other animals
                </Link>
              </div>
            ) : (
              <>
                <a href={applyHref} className="btn-primary w-full sm:w-auto">
                  💌 Apply to Adopt {animal.title}
                </a>
                {status.toLowerCase() === 'pending' && (
                  <p className="mt-3 text-sm text-cocoa-500">
                    An application is pending, but you can still apply as a backup family.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}