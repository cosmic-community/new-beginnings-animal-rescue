import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import { getDateValue } from '@/lib/utils'
import type {
  OrganizationInfo,
  Program,
  EventItem,
  ImpactStory,
  TeamMember,
  Testimonial,
  AdoptableAnimal,
} from '@/types'

export { getMetafieldValue } from '@/lib/utils'

// Write-capable client (server-side only). Reads that render pages use getCosmic().
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const PROPS: string[] = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at']

async function fetchObjects<T>(type: string): Promise<T[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.find({ type }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.objects ?? []) as T[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch ${type}`)
  }
}

async function fetchOne<T>(type: string, slug: string): Promise<T | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const query = client.objects.findOne({ type, slug }).props(PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object ?? null) as T | null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch ${type} ${slug}`)
  }
}

export async function getOrganizationInfo(): Promise<OrganizationInfo | null> {
  const items = await fetchObjects<OrganizationInfo>('organization-info')
  return items[0] ?? null
}

export async function getPrograms(): Promise<Program[]> {
  return fetchObjects<Program>('programs')
}

export async function getEvents(): Promise<EventItem[]> {
  const items = await fetchObjects<EventItem>('events')
  return items.sort((a, b) => {
    const da = Date.parse(String(a.metadata?.event_date ?? '')) || 0
    const db = Date.parse(String(b.metadata?.event_date ?? '')) || 0
    return da - db
  })
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return fetchOne<EventItem>('events', slug)
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const items = await fetchObjects<ImpactStory>('impact-stories')
  return items.sort((a, b) => {
    const da = Date.parse(String(a.metadata?.adoption_date ?? '')) || getDateValue(a)
    const db = Date.parse(String(b.metadata?.adoption_date ?? '')) || getDateValue(b)
    return db - da
  })
}

export async function getImpactStoryBySlug(slug: string): Promise<ImpactStory | null> {
  return fetchOne<ImpactStory>('impact-stories', slug)
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return fetchObjects<TeamMember>('team-members')
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchObjects<Testimonial>('testimonials')
}

function statusRank(animal: AdoptableAnimal): number {
  const raw = animal.metadata?.adoption_status
  let value = ''
  if (typeof raw === 'string') value = raw
  else if (raw && typeof raw === 'object') value = String(raw.value ?? raw.key ?? '')
  const v = value.toLowerCase()
  if (v === 'available') return 0
  if (v === 'pending') return 1
  return 2
}

export async function getAdoptableAnimals(): Promise<AdoptableAnimal[]> {
  const items = await fetchObjects<AdoptableAnimal>('adoptable-animals')
  return items.sort((a, b) => {
    const rank = statusRank(a) - statusRank(b)
    if (rank !== 0) return rank
    return getDateValue(b) - getDateValue(a)
  })
}

export async function getAnimalBySlug(slug: string): Promise<AdoptableAnimal | null> {
  return fetchOne<AdoptableAnimal>('adoptable-animals', slug)
}