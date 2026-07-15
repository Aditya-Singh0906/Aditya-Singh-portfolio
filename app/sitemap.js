import { getAllPosts } from '@/lib/blog'
import { PROFILE } from '@/lib/portfolio-data'

export default function sitemap() {
  const base = PROFILE.siteUrl
  const now = new Date()
  const routes = [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 }
  ]
  const posts = getAllPosts().map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.6
  }))
  return [...routes, ...posts]
}
