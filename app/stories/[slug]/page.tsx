// app/stories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getImpactStoryBySlug } from '@/lib/cosmic'
import { formatDate, imgix } from '@/lib/utils'
import RichText from '@/components/RichText'

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getImpactStoryBySlug(slug)
  if (!story) notFound()

  const m = story.metadata ?? {}
  const before = imgix(m.before_photo, 'w=1000&h=800&fit=crop&auto=format,compress')
  const after = imgix(m.after_photo, 'w=1000&h=800&fit=crop&auto=format,compress')
  const adoptedOn = formatDate(m.adoption_date)

  return (
    <article className="container-page max-w-4xl py-12">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: story.id, object_type: story.type })}
      />
      <Link href="/stories" className="text-sm font-semibold text-coral-600 hover:text-coral-700">
        ← All success stories
      </Link>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{story.title}</h1>
      <p className="mt-3 text-cocoa-500">
        {m.animal_name ? `${m.animal_name}` : ''}
        {m.animal_name && adoptedOn ? ' · ' : ''}
        {adoptedOn ? `Adopted ${adoptedOn}` : ''}
      </p>

      {(before || after) && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {before && (
            <figure className="card">
              <img src={before} alt={`${m.animal_name || story.title} before`} width={500} height={400} className="h-72 w-full object-cover" />
              <figcaption className="p-3 text-center text-sm font-semibold text-cocoa-500">Before</figcaption>
            </figure>
          )}
          {after && (
            <figure className="card">
              <img src={after} alt={`${m.animal_name || story.title} after`} width={500} height={400} className="h-72 w-full object-cover" />
              <figcaption className="p-3 text-center text-sm font-semibold text-sage-700">After 💖</figcaption>
            </figure>
          )}
        </div>
      )}

      <div className="mt-10">
        <RichText content={m.story || m.summary} />
      </div>

      {m.program && m.program.title && (
        <p className="mt-8 text-cocoa-700">
          Made possible by our{' '}
          <Link href="/programs" className="font-semibold text-coral-600 hover:text-coral-700">
            {m.program.title}
          </Link>{' '}
          program.
        </p>
      )}

      <div className="mt-12 rounded-3xl bg-coral-50 p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to write the next happy ending?</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link href="/animals" className="btn-primary">Meet Our Animals</Link>
          <Link href="/donate" className="btn-secondary">Donate</Link>
        </div>
      </div>
    </article>
  )
}