# New Beginnings Animal Rescue

![App Preview](https://imgix.cosmicjs.com/3cecb260-df32-11f1-9283-01aa56c6a663-uploaded-1794554228859.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A warm, modern, adoption-focused website for a nonprofit animal rescue. It is built with Next.js 16, Tailwind CSS and [Cosmic](https://www.cosmicjs.com/docs).

## Features

- Emotional home page with "Meet Our Animals" and "Donate" CTAs
- Adoptable animals grid with species and status filters
- Animal detail pages with gallery, compatibility badges, fee and "Apply to Adopt"
- Success stories with before and after photos
- Programs, events (list and detail), about page with team, and donate page
- Live fundraising progress bar from Cosmic data
- Responsive, accessible and SEO friendly

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6af6b8aba7198175fb5680ce&clone_repository=6af6baa3a7198175fb56814e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a nonprofit website with mission statement, programs, events, impact stories, and a team section.
>
> User instructions: A company website within, team members, case studies, and testimonials for my new beginnings animal rescue. I need to raise money for"

### Code Generation Prompt

> Build a Next.js application for a company website called "New Beginnings Animal Rescue". The content is managed in Cosmic CMS with the following object types: organization-info, programs, events, impact-stories, team-members, testimonials, adoptable-animals. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Adoption-focused website for New Beginnings Animal Rescue, a nonprofit animal rescue. Primary goal: increase the number of adoptions; secondary goal: fundraising from pet lovers with big hearts and deep pockets. Use the existing content types: organization-info (tagline, mission, fundraising goal, amount raised, donation link), programs, events, impact-stories, team-members, testimonials, and adoptable-animals (name, main photo, photo gallery, species, breed, age, sex, size, personality, good with kids/dogs/cats, adoption status Available/Pending/Adopted, adoption fee, related program).
>
> Pages:
> - Home: warm, emotional hero with tagline and two clear CTAs ("Meet Our Animals" and "Donate"), featured available animals, a fundraising progress bar (amount raised vs goal), an impact story highlight, testimonials, and upcoming events.
> - Adopt (/animals): grid of adoptable animals with filters by species and adoption status, showing photo, name, breed, age, and status badge.
> - Animal detail page (/animals/[slug]): "Meet [Name]" page with photo gallery, all details, compatibility badges (kids, dogs, cats), adoption fee, linked program, and a prominent "Apply to Adopt" CTA.
> - Success Stories (/stories) list and detail pages.
> - Programs, Events (list and detail), About (mission and team members).
> - Donate page/section linking to the donation URL from organization info, with the fundraising progress bar.
>
> Design: warm, friendly, heartfelt, polished and premium feel to appeal to generous donors. Soft warm color palette, rounded cards, great photography, mobile responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19, TypeScript (strict)
- Tailwind CSS 3 with the Typography plugin
- [Cosmic](https://www.cosmicjs.com/docs) SDK

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- A Cosmic bucket with the seven object types above

### Installation

```bash
bun install
bun run dev
```

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY` and `COSMIC_WRITE_KEY` in your environment.

## Cosmic SDK Examples

```typescript
const { objects } = await cosmic.objects
  .find({ type: 'adoptable-animals' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

All content is fetched server-side through `lib/cosmic.ts`. Edit your animals, stories, events, programs, team and organization info in Cosmic and the site updates automatically. A 404 from Cosmic is treated as an empty list.

## Deployment Options

- **Vercel**: import the repo and add the three Cosmic environment variables.
- **Netlify**: use the Next.js runtime and add the same variables.
<!-- README_END -->