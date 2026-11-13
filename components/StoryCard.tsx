import Link from 'next/link'
import type { ImpactStory } from '@/types'
import { getMetafieldValue, imgix } from '@/lib/utils'

export default function StoryCard({ story }: { story: ImpactStory }) {
  const m = story.metadata ?? {}
  const photo = imgix(m.after_photo ?? m.before_photo, 'w=900&h=720&fit=crop&auto=format,compress')
  const summary = getMetafieldValue(m.summary).replace(/<[^>]*>/g, '')

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="card group block transition-transform duration-300 hover:-translate-y-1"
    >
      {photo ? (
        <img
          src={photo}
          alt={m.animal_name || story.title}
          width={450}
          height={360}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-60 items-center justify-center bg-coral-100 text-6xl">💖</div>
      )}
      <div className="p-6">
        {m.animal_name && (
          <p className="text-sm font-semibold text-coral-600">{m.animal_name}</p>
        )}
        <h3 className="mt-1 text-2xl font-bold">{story.title}</h3>
        {summary && <p className="mt-2 line-clamp-3 text-cocoa-700">{summary}</p>}
        <p className="mt-4 text-sm font-semibold text-coral-600">Read story →</p>
      </div>
    </Link>
  )
}