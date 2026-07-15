import { PROFILE } from '@/lib/portfolio-data'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${PROFILE.siteUrl}/sitemap.xml`,
    host: PROFILE.siteUrl
  }
}
