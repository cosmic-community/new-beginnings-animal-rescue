export default function StatusBadge({ status }: { status: string }) {
  if (!status) return null
  const v = status.toLowerCase()
  let style = 'bg-stone-100 text-stone-700'
  let icon = '🐾'
  if (v === 'available') {
    style = 'bg-sage-100 text-sage-700'
    icon = '✅'
  } else if (v === 'pending') {
    style = 'bg-amber-100 text-amber-800'
    icon = '⏳'
  } else if (v === 'adopted') {
    style = 'bg-coral-100 text-coral-700'
    icon = '🏡'
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${style}`}>
      <span aria-hidden="true">{icon}</span>
      {status}
    </span>
  )
}