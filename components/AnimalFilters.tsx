import Link from 'next/link'

interface Props {
  species: string[]
  currentSpecies: string
  currentStatus: string
}

const STATUSES: string[] = ['Available', 'Pending', 'Adopted']

function buildHref(species: string, status: string): string {
  const params = new URLSearchParams()
  if (species) params.set('species', species)
  if (status) params.set('status', status)
  const qs = params.toString()
  return qs ? `/animals?${qs}` : '/animals'
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? 'bg-coral-500 text-white shadow-soft' : 'bg-white text-cocoa-700 hover:bg-coral-50'
      }`}
    >
      {children}
    </Link>
  )
}

export default function AnimalFilters({ species, currentSpecies, currentStatus }: Props) {
  const sp = currentSpecies.toLowerCase()
  const st = currentStatus.toLowerCase()

  return (
    <div className="space-y-4 rounded-3xl bg-cream-100 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-bold text-cocoa-500">Species</span>
        <Chip href={buildHref('', currentStatus)} active={sp === ''}>All</Chip>
        {species.map((s) => (
          <Chip key={s} href={buildHref(s, currentStatus)} active={sp === s.toLowerCase()}>
            {s}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-bold text-cocoa-500">Status</span>
        <Chip href={buildHref(currentSpecies, '')} active={st === ''}>All</Chip>
        {STATUSES.map((s) => (
          <Chip key={s} href={buildHref(currentSpecies, s)} active={st === s.toLowerCase()}>
            {s}
          </Chip>
        ))}
      </div>
    </div>
  )
}