import { getMetafieldValue } from '@/lib/utils'

interface Props {
  content?: unknown
  className?: string
}

export default function RichText({ content, className = '' }: Props) {
  const text = getMetafieldValue(content)
  if (text.trim() === '') return null

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(text)
  if (isHtml) {
    return (
      <div
        className={`prose prose-lg prose-stone max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }

  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim() !== '')
  return (
    <div className={`space-y-4 text-lg leading-relaxed text-cocoa-700 ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}