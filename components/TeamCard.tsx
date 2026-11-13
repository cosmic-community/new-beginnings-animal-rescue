import type { TeamMember } from '@/types'
import { getMetafieldValue, imgix } from '@/lib/utils'

export default function TeamCard({ member }: { member: TeamMember }) {
  const m = member.metadata ?? {}
  const photo = imgix(m.photo, 'w=800&h=800&fit=crop&auto=format,compress')
  const name = m.full_name || member.title

  return (
    <div className="card h-full text-center">
      {photo ? (
        <img src={photo} alt={name} width={400} height={400} className="h-72 w-full object-cover" />
      ) : (
        <div className="flex h-72 items-center justify-center bg-coral-100 text-7xl">🐾</div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        {m.role && <p className="mt-1 text-sm font-semibold text-coral-600">{m.role}</p>}
        {m.bio && (
          <p className="mt-3 text-sm text-cocoa-700">{getMetafieldValue(m.bio).replace(/<[^>]*>/g, '')}</p>
        )}
        {m.email && (
          <a href={`mailto:${m.email}`} className="mt-3 inline-block text-sm font-semibold text-coral-600 hover:text-coral-700">
            {m.email}
          </a>
        )}
      </div>
    </div>
  )
}