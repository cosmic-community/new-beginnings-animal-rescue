export interface ImageField {
  url: string
  imgix_url: string
}

// Select / text style values may arrive as a string, number, boolean or {key, value}
export type MetaValue =
  | string
  | number
  | boolean
  | { key?: string; value?: string }
  | null
  | undefined

export interface CosmicBase {
  id: string
  slug: string
  title: string
  type: string
  created_at: string
  modified_at: string
}

export interface OrganizationInfo extends CosmicBase {
  type: 'organization-info'
  metadata: {
    tagline?: string
    mission_statement?: string
    hero_image?: ImageField
    fundraising_goal?: number | string
    amount_raised?: number | string
    donation_link?: string
    contact_email?: string
  }
}

export interface Program extends CosmicBase {
  type: 'programs'
  metadata: {
    summary?: string
    description?: string
    icon?: ImageField | string
    image?: ImageField
  }
}

export interface EventItem extends CosmicBase {
  type: 'events'
  metadata: {
    event_date?: string
    location?: string
    event_type?: MetaValue
    description?: string
    registration_link?: string
    image?: ImageField
  }
}

export interface ImpactStory extends CosmicBase {
  type: 'impact-stories'
  metadata: {
    animal_name?: string
    summary?: string
    story?: string
    before_photo?: ImageField
    after_photo?: ImageField
    adoption_date?: string
    program?: Program
  }
}

export interface TeamMember extends CosmicBase {
  type: 'team-members'
  metadata: {
    full_name?: string
    role?: string
    bio?: string
    photo?: ImageField
    email?: string
  }
}

export interface Testimonial extends CosmicBase {
  type: 'testimonials'
  metadata: {
    name?: string
    quote?: string
    relationship?: string
    photo?: ImageField
  }
}

export type AdoptionStatus = 'Available' | 'Pending' | 'Adopted'

export interface AdoptableAnimal extends CosmicBase {
  type: 'adoptable-animals'
  metadata: {
    photo?: ImageField
    gallery?: ImageField[]
    species?: MetaValue
    breed?: string
    age?: MetaValue
    sex?: MetaValue
    size?: MetaValue
    personality?: string
    good_with_kids?: MetaValue
    good_with_dogs?: MetaValue
    good_with_cats?: MetaValue
    adoption_status?: MetaValue
    adoption_fee?: MetaValue
    program?: Program
  }
}