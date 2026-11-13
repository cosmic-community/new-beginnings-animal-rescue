interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="bg-gradient-to-br from-cream-100 via-cream to-coral-50">
      <div className="container-page py-14 text-center sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-coral-600">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-cocoa-700">{subtitle}</p>}
      </div>
    </section>
  )
}