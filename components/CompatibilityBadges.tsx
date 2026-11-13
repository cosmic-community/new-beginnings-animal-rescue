import { getFlag } from '@/lib/utils'
import type { Flag } from '@/lib/utils'

interface Props {
  kids?: unknown
  dogs?: unknown
  cats?: unknown
}

function Badge({ emoji, label, flag }: { emoji: string; label: string; flag: Flag }) {
  const styles: Record<Flag, string> = {
    yes: 'bg-sage-100 text-sage-700',
    no: 'bg-stone-100 text-stone-600',
    unknown: 'bg-cream-100 text-cocoa-500',
  }
  const text: Record<Flag, string> = {
    yes: 'Yes',
    no: 'No',
    unknown: 'Not sure yet',
  }
  return (
    <div className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${styles[flag]}`}>
      <span aria-hidden="true" className="text-lg">{emoji}</span>
      <span>
        {label}: {text[flag]}
      </span>
    </div>
  )
}

export default function CompatibilityBadges({ kids, dogs, cats }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge emoji="🧒" label="Kids" flag={getFlag(kids)} />
      <Badge emoji="🐕" label="Dogs" flag={getFlag(dogs)} />
      <Badge emoji="🐈" label="Cats" flag={getFlag(cats)} />
    </div>
  )
}