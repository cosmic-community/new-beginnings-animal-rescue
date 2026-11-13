import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getOrganizationInfo } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: {
    default: 'New Beginnings Animal Rescue',
    template: '%s | New Beginnings Animal Rescue',
  },
  description:
    'Adopt a loving animal, read heartwarming success stories, and help New Beginnings Animal Rescue give every animal a second chance.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const org = await getOrganizationInfo()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  const email = org?.metadata?.contact_email ?? ''

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6af6b8aba7198175fb5680cc"></script>
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer email={email} />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}