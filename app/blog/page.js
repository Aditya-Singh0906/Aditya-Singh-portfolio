import Link from 'next/link'
import { ArrowLeft, ChevronRight, Rss, Github, Linkedin, Mail } from 'lucide-react'
import { getAllPosts, getCategories } from '@/lib/blog'
import BlogHome from '@/components/BlogHome'
import { PROFILE } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Blog — Aditya Singh',
  description: 'Notes on DevOps, cloud infrastructure, automation, and platform engineering by Aditya Singh.',
  alternates: { canonical: `${PROFILE.siteUrl}/blog` },
  openGraph: {
    title: 'Blog — Aditya Singh',
    description: 'Notes on DevOps, cloud infrastructure, and automation.',
    url: `${PROFILE.siteUrl}/blog`,
    type: 'website'
  }
}

export default function BlogIndex() {
  const posts = getAllPosts().map(({ content, ...rest }) => rest)
  const categories = getCategories()

  return (
    <main className="relative min-h-screen bg-[#05070d] text-white">
      <div className="absolute inset-0 grid-bg mask-radial opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora bg-blue-600/30 w-[500px] h-[500px] -top-40 -left-40" />
        <div className="aurora bg-indigo-500/20 w-[400px] h-[400px] top-40 -right-32" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 pt-28 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-xs mono uppercase tracking-widest text-white/50 hover:text-white transition mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
        </Link>

        <div className="mb-10 max-w-3xl">
          <div className="section-eyebrow mb-4">Writing</div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight gradient-text leading-[1.05]">Notes on shipping infrastructure.</h1>
          <p className="mt-5 text-white/55 md:text-lg leading-relaxed max-w-2xl">Short, opinionated pieces on the parts of DevOps I actually care about — pipelines that stay green, Terraform that stays readable, and observability that pays off in the middle of the night.</p>
        </div>

        <BlogHome posts={posts} categories={categories} />

        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div className="mono">© {new Date().getFullYear()} Aditya Singh</div>
          <div className="flex items-center gap-3">
            <a href="/api/rss" title="RSS" className="hover:text-white"><Rss className="h-4 w-4" /></a>
            <a href={PROFILE.github} className="hover:text-white"><Github className="h-4 w-4" /></a>
            <a href={PROFILE.linkedin} className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-white"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </main>
  )
}
