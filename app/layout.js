import './globals.css'
import { Toaster } from 'sonner'
import { PROFILE } from '@/lib/portfolio-data'

const site = PROFILE.siteUrl

export const metadata = {
  metadataBase: new URL(site),
  title: { default: 'Aditya Singh — AWS DevOps Engineer & Infrastructure Services', template: '%s · Aditya Singh' },
  description: 'AWS DevOps Engineer helping startups deploy applications, automate CI/CD, and monitor infrastructure. AWS deployment services, Docker, and Linux server management.',
  keywords: ['AWS DevOps Engineer','AWS deployment services','AWS infrastructure','CI/CD automation','AWS monitoring','Docker deployment','Linux server management','Platform Engineer','Terraform','Jenkins'],
  authors: [{ name: 'Aditya Singh', url: site }],
  creator: 'Aditya Singh',
  alternates: { canonical: site },
  manifest: '/manifest.json',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    title: 'Aditya Singh — DevOps & Cloud Engineer',
    description: 'Building reliable cloud infrastructure, scalable deployment pipelines, and automation that helps engineering teams move faster.',
    url: site,
    siteName: 'Aditya Singh',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Aditya Singh — DevOps & Cloud Engineer' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh — DevOps & Cloud Engineer',
    description: 'Building reliable cloud infrastructure, scalable deployment pipelines, and automation.',
    images: ['/og.png']
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
}

export const viewport = { themeColor: '#05070d', width: 'device-width', initialScale: 1 }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: 'AWS DevOps Engineer',
  url: site,
  email: `mailto:${PROFILE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressCountry: 'IN' },
  sameAs: [PROFILE.github, PROFILE.linkedin],
  knowsAbout: ['AWS DevOps','AWS infrastructure','CI/CD automation','AWS monitoring','Docker deployment','Linux server management','Terraform']
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="noise antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" richColors closeButton />
      </body>
    </html>
  )
}
