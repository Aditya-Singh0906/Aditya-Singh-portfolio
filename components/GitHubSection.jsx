'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, Users, BookOpen, ExternalLink, ArrowUpRight, Loader2 } from 'lucide-react'

const GH_USER = 'Aditya-Singh0906'

function Card({ children, className = '' }) {
  return <div className={`glass rounded-2xl ${className}`}>{children}</div>
}

export default function GitHubSection() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [langs, setLangs] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let live = true
    async function load() {
      try {
        const [p, r, l] = await Promise.all([
          fetch('/api/github/profile').then(x => x.json()),
          fetch('/api/github/repos').then(x => x.json()),
          fetch('/api/github/languages').then(x => x.json())
        ])
        if (!live) return
        if (p?.error) throw new Error(p.error)
        setProfile(p)
        setRepos(r?.repos || [])
        setLangs((l?.languages || []).slice(0, 6))
      } catch (e) {
        setErr(e.message)
      } finally {
        if (live) setLoading(false)
      }
    }
    load()
    return () => { live = false }
  }, [])

  const themeParams = 'theme=transparent&bg_color=00000000&title_color=e6ecf5&text_color=93a3b8&icon_color=60a5fa&border_color=1a2233&hide_border=false&border_radius=16'
  const streakParams = 'theme=transparent&background=00000000&stroke=1a2233&ring=60a5fa&fire=60a5fa&currStreakLabel=e6ecf5&currStreakNum=e6ecf5&sideNums=e6ecf5&sideLabels=93a3b8&dates=93a3b8&border_radius=16&hide_border=false'
  const langParams = `${themeParams}&layout=compact&langs_count=8&card_width=445`

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <div className="section-eyebrow mb-4">05 — Open source</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight gradient-text leading-[1.05]">Live from my GitHub.</h2>
          <p className="mt-5 text-white/55 md:text-lg leading-relaxed max-w-2xl">Repositories, stats, and contribution streaks — pulled straight from <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">@{GH_USER}</a> and refreshed automatically.</p>
        </motion.div>

        {/* Profile summary */}
        <div className="grid md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Followers', value: profile?.followers, icon: Users },
            { label: 'Following', value: profile?.following, icon: Users },
            { label: 'Public repos', value: profile?.public_repos, icon: BookOpen },
            { label: 'Location', value: profile?.location, icon: Github, isText: true }
          ].map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="p-5 hover-lift">
                <div className="flex items-center gap-2 text-[11px] mono uppercase tracking-widest text-white/40 mb-2">
                  <Icon className="h-3.5 w-3.5" /> {s.label}
                </div>
                <div className={`font-semibold ${s.isText ? 'text-lg text-white/80' : 'text-3xl gradient-text'}`}>
                  {loading ? <span className="inline-block w-16 h-6 rounded bg-white/[0.05] animate-pulse" /> : (s.value ?? '—')}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Contribution graph */}
        <Card className="p-5 md:p-6 mb-6 hover-lift overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="section-eyebrow">Contribution graph</div>
            <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="text-[11px] mono text-white/50 hover:text-white inline-flex items-center gap-1">View on GitHub <ArrowUpRight className="h-3 w-3" /></a>
          </div>
          <div className="overflow-x-auto">
            {/* ghchart returns an SVG heatmap that respects colors */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/60a5fa/${GH_USER}`}
              alt={`${GH_USER} contribution graph`}
              className="w-full min-w-[600px]"
              loading="lazy"
            />
          </div>
        </Card>

       {/* Stats + Streak */}
<div className="grid md:grid-cols-2 gap-4 mb-6">
  <Card className="p-3 hover-lift overflow-hidden flex items-center justify-center">
    <img
      src={`https://github-readme-stats-aditya-singh13-projects.vercel.app/api?username=${GH_USER}&show_icons=true&${themeParams}`}
      alt="GitHub stats"
      className="w-full max-w-[500px]"
      loading="lazy"
    />
  </Card>

  <Card className="p-3 hover-lift overflow-hidden flex items-center justify-center">
    <img
      src={`https://github-readme-streak-stats.herokuapp.com/?user=${GH_USER}&${streakParams}`}
      alt="GitHub streak"
      className="w-full max-w-[500px]"
      loading="lazy"
    />
  </Card>
</div>

{/* Top Languages + Live Languages */}
<div className="grid md:grid-cols-2 gap-4 mb-6">
  <Card className="p-3 hover-lift overflow-hidden flex items-center justify-center">
    <img
      src={`https://github-readme-stats-aditya-singh13-projects.vercel.app/api/top-langs/?username=${GH_USER}&${langParams}`}
      alt="Top languages"
      className="w-full max-w-[500px]"
      loading="lazy"
    />
  </Card>

  <Card className="p-6 hover-lift">
    <div className="section-eyebrow mb-4">Language mix (live)</div>

    {loading && (
      <div className="flex items-center gap-2 text-white/40 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading…
      </div>
    )}

    {!loading && langs.length === 0 && (
      <div className="text-white/40 text-sm">
        No public language data yet.
      </div>
    )}

    <div className="space-y-3">
      {langs.map((l) => (
        <div key={l.name}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-white/70 mono">{l.name}</span>
            <span className="text-white/40 mono">{l.pct}%</span>
          </div>

          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${l.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
            />
          </div>
        </div>
      ))}
    </div>
  </Card>
</div>
        
        {/* Pinned / top repositories */}
        <div className="mb-4 flex items-center justify-between">
          <div className="section-eyebrow">Top repositories</div>
          <a href={`https://github.com/${GH_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="text-[11px] mono text-white/50 hover:text-white inline-flex items-center gap-1">All repos <ArrowUpRight className="h-3 w-3" /></a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-5 h-40 animate-pulse" />
          ))}
          {!loading && repos.length === 0 && !err && (
            <div className="col-span-full glass rounded-2xl p-6 text-sm text-white/50">No public repositories yet.</div>
          )}
          {err && (
            <div className="col-span-full glass rounded-2xl p-6 text-sm text-white/50">Could not load GitHub data right now.</div>
          )}
          {repos.map((r) => (
            <motion.a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group glass rounded-2xl p-5 hover-lift block"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-white">
                  <BookOpen className="h-4 w-4 text-blue-300" />
                  <span className="font-medium text-sm truncate">{r.name}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
              </div>
              <p className="text-xs text-white/55 line-clamp-2 min-h-[32px]">{r.description || 'No description provided.'}</p>
              <div className="mt-4 flex items-center gap-4 text-[11px] mono text-white/50">
                {r.language && <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-400" /> {r.language}</span>}
                <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> {r.stars}</span>
                <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" /> {r.forks}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
