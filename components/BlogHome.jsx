'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, ArrowUpRight, Tag as TagIcon, Rss } from 'lucide-react'

export default function BlogHome({ posts, categories }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const inCat = cat === 'All' || p.category === cat
      const s = q.trim().toLowerCase()
      const inSearch = !s || p.title.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s) || (p.tags || []).some(t => t.toLowerCase().includes(s))
      return inCat && inSearch
    })
  }, [q, cat, posts])

  return (
    <div>
      {/* Search + filter */}
      <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, tags, topics..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/20"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...categories].map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[11px] mono uppercase tracking-widest px-3 py-1.5 rounded-full border transition ${cat === c ? 'bg-white text-black border-white' : 'text-white/60 border-white/10 hover:text-white hover:border-white/20'}`}
            >{c}</button>
          ))}
          <a href="/api/rss" className="text-[11px] mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 inline-flex items-center gap-1" title="RSS feed"><Rss className="h-3 w-3" /> RSS</a>
        </div>
      </div>

      {/* Posts */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-8 text-center text-white/50 text-sm">No articles match yet.</div>
        )}
        {filtered.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          >
            <Link href={`/blog/${p.slug}`} className="group glass rounded-2xl p-6 hover-lift block">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] mono uppercase tracking-widest text-blue-300">{p.category}</span>
                <span className="text-[10px] mono text-white/30">·</span>
                <span className="text-[10px] mono text-white/40 inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readingTime}</span>
                <span className="text-[10px] mono text-white/30">·</span>
                <span className="text-[10px] mono text-white/40">{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white group-hover:text-blue-200 transition-colors">{p.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition shrink-0 mt-1" />
              </div>
              <p className="mt-2 text-sm text-white/55 line-clamp-3">{p.description}</p>
              {p.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map(t => (
                    <span key={t} className="text-[10px] mono px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-white/60 inline-flex items-center gap-1"><TagIcon className="h-2.5 w-2.5" /> {t}</span>
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
