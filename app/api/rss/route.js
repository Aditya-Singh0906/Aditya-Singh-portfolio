import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { PROFILE } from '@/lib/portfolio-data'

export const dynamic = 'force-static'

function esc(s = '') { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }

export async function GET() {
  const posts = getAllPosts()
  const site = PROFILE.siteUrl
  const items = posts.map(p => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.description || '')}</description>
      <category>${esc(p.category)}</category>
    </item>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Aditya Singh — Blog</title>
<link>${site}/blog</link>
<description>Notes on DevOps, cloud infrastructure, and automation.</description>
<language>en</language>
${items}
</channel>
</rss>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
