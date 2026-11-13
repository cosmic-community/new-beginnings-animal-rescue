import type { Metadata } from 'next'
import { getImpactStories } from '@/lib/cosmic'
import StoryCard from '@/components/StoryCard'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Success Stories',
  description: 'Heartwarming adoption stories from New Beginnings Animal Rescue.',
}

export default async function StoriesPage() {
  const stories = await getImpactStories()

  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Happy Tails"
        subtitle="See what a second chance looks like, thanks to adopters and supporters like you."
      />
      <section className="container-page py-12">
        {stories.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <p className="text-center text-cocoa-500">Stories are coming soon.</p>
        )}
      </section>
    </>
  )
}