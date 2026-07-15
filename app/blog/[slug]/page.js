import Link from 'next/link'
import { notFound } from 'next/navigation'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import { ArrowLeft, ArrowRight, Clock, Tag as TagIcon, Calendar, Github, Linkedin, Mail } from 'lucide-react'
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/blog'
import CopyCodeButtons from '@/components/CopyCodeButtons'
import { PROFILE } from '@/lib/portfolio-data'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not found' }
  return {
    title: `${post.title} — Aditya Singh`,
    description: post.description,
    alternates: { canonical: `${PROFILE.siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${PROFILE.siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author]
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description }
  }
}

function extractHeadings(md) {
  const lines = md.split('\n')
  const headings = []
  let inCode = false
  for (const line of lines) {
    if (line.startsWith('```')) { inCode = !inCode; continue }
    if (inCode) continue
    const m = /^(#{2,3})\s+(.+)$/.exec(line)
    if (m) {
      const level = m[1].length
      const text = m[2].replace(/[#*`]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      headings.push({ level, text, id })
    }
  }
  return headings
}

async function renderMarkdown(source) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false, defaultLang: 'plaintext' })
    .use(rehypeStringify)
    .process(source)
  return String(file)
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const { prev, next } = getAdjacentPosts(slug)
  const headings = extractHeadings(post.content)
  const html = await renderMarkdown(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    url: `${PROFILE.siteUrl}/blog/${post.slug}`,
    keywords: (post.tags || []).join(', ')
  }

  return (
    <main className="relative min-h-screen bg-[#05070d] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="absolute inset-0 grid-bg mask-radial opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora bg-blue-600/25 w-[500px] h-[500px] -top-40 -left-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 pt-28 pb-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs mono uppercase tracking-widest text-white/50 hover:text-white transition mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>

        <div className="grid lg:grid-cols-[1fr_240px] gap-10">
          <article className="min-w-0">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] mono uppercase tracking-widest text-blue-300">{post.category}</span>
                <span className="text-[10px] mono text-white/30">·</span>
                <span className="text-[10px] mono text-white/40 inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-[10px] mono text-white/30">·</span>
                <span className="text-[10px] mono text-white/40 inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readingTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight gradient-text leading-[1.05]">{post.title}</h1>
              {post.description && <p className="mt-4 text-white/55 md:text-lg leading-relaxed">{post.description}</p>}
              {post.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map(t => (
                    <span key={t} className="text-[10px] mono px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-white/60 inline-flex items-center gap-1"><TagIcon className="h-2.5 w-2.5" /> {t}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />
            <CopyCodeButtons />

            <div className="mt-14 pt-8 border-t border-white/[0.05] grid sm:grid-cols-2 gap-3">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group glass rounded-2xl p-4 hover-lift">
                  <div className="text-[10px] mono uppercase tracking-widest text-white/40 mb-1 inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Previous</div>
                  <div className="text-sm text-white group-hover:text-blue-200 transition">{prev.title}</div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="group glass rounded-2xl p-4 hover-lift text-right">
                  <div className="text-[10px] mono uppercase tracking-widest text-white/40 mb-1 inline-flex items-center gap-1 justify-end">Next <ArrowRight className="h-3 w-3" /></div>
                  <div className="text-sm text-white group-hover:text-blue-200 transition">{next.title}</div>
                </Link>
              ) : <div />}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="section-eyebrow mb-3">On this page</div>
              <ul className="space-y-1.5 text-sm">
                {headings.map(h => (
                  <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
                    <a href={`#${h.id}`} className="text-white/50 hover:text-white transition">{h.text}</a>
                  </li>
                ))}
                {headings.length === 0 && <li className="text-white/30 text-xs mono">—</li>}
              </ul>
              <div className="mt-8 glass rounded-xl p-4">
                <div className="section-eyebrow mb-2">By</div>
                <div className="text-sm text-white font-medium">{post.author}</div>
                <div className="text-xs text-white/50 mt-0.5">DevOps & Cloud engineer</div>
                <div className="flex gap-2 mt-3">
                  <a href={PROFILE.github} className="text-white/50 hover:text-white"><Github className="h-3.5 w-3.5" /></a>
                  <a href={PROFILE.linkedin} className="text-white/50 hover:text-white"><Linkedin className="h-3.5 w-3.5" /></a>
                  <a href={`mailto:${PROFILE.email}`} className="text-white/50 hover:text-white"><Mail className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
