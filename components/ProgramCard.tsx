import type { Program } from '@/types'
import { getMetafieldValue, imgix } from '@/lib/utils'
import RichText from '@/components/RichText'

interface Props {
  program: Program
  showDescription?: boolean
}

export default function ProgramCard({ program, showDescription = false }: Props) {
  const m = program.metadata ?? {}
  const image = imgix(m.image, 'w=1000&h=600&fit=crop&auto=format,compress')
  const icon = m.icon
  const iconNode =
    typeof icon === 'object' && icon && icon.imgix_url ? (
      <img
        src={`${icon.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 rounded-2xl object-cover"
      />
    ) : (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-100 text-2xl">
        {getMetafieldValue(icon) || '🐾'}
      </span>
    )

  return (
    <div className="card h-full">
      {image && (
        <img src={image} alt={program.title} width={500} height={300} className="h-52 w-full object-cover" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-3">
          {iconNode}
          <h3 className="text-2xl font-bold">{program.title}</h3>
        </div>
        <p className="mt-4 text-cocoa-700">{getMetafieldValue(m.summary)}</p>
        {showDescription && m.description && (
          <div className="mt-4">
            <RichText content={m.description} />
          </div>
        )}
      </div>
    </div>
  )
}