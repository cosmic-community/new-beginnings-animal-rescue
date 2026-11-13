import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface Props {
  raised: number
  goal: number
  donationUrl?: string
}

export default function FundraisingProgress({ raised, goal, donationUrl }: Props) {
  const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0
  const url = donationUrl && donationUrl !== '' ? donationUrl : '/donate'
  const external = url.startsWith('http')

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-soft sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-coral-600">Help us reach our goal</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your kindness keeps us going</h2>
      {goal > 0 ? (
        <>
          <div className="mt-8 flex items-end justify-between text-left">
            <div>
              <p className="text-3xl font-bold text-cocoa">{formatCurrency(raised)}</p>
              <p className="text-sm text-cocoa-500">raised</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold text-cocoa-700">{formatCurrency(goal)}</p>
              <p className="text-sm text-cocoa-500">goal</p>
            </div>
          </div>
          <div
            className="mt-3 h-5 overflow-hidden rounded-full bg-cream-200"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Fundraising progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-coral-400 to-coral-600 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-coral-700">{percent}% funded</p>
        </>
      ) : (
        <p className="mt-4 text-cocoa-700">Every gift helps us rescue, heal and rehome animals.</p>
      )}
      {external ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
          💖 Donate Now
        </a>
      ) : (
        <Link href={url} className="btn-primary mt-8">
          💖 Donate Now
        </Link>
      )}
    </div>
  )
}