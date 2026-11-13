import type { Testimonial } from '@/types'
import { getMetafieldValue, imgix } from '@/lib/utils'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const m = testimonial.metadata ?? {}
  const photo = imgix(m.photo, 'w=160&h=160&fit=crop&auto=format,compress')
  const name = m.name || testimonial.title

  return (
    <figure className="card flex h-full flex-col p-8">
      <span className="font-serif text-5xl leading-none text-coral-400" aria-hidden="true">“</span>
      <blockquote className="mt-2 flex-1 text-cocoa-700">
        {getMetafieldValue(m.quote).replace(/<[^>]*>/g, '')}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {photo ? (
          <img src={photo} alt={name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-100 text-xl">🐾</span>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          {m.relationship && <p className="text-sm text-cocoa-500">{m.relationship}</p>}
        </div>
      </figcaption>
    </figure>
  )
}