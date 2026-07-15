'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  ArrowUpRight, ArrowRight, Github, Linkedin, Mail, MapPin, FileDown,
  Cloud, Container, GitBranch, Boxes, Activity, Code2, ShieldCheck, Sparkles,
  Terminal, Server, Layers, Workflow, Radio, Search, X,
  ChevronRight, Check, Send, Loader2, Circle, CalendarDays, GraduationCap, Award,
  ExternalLink, Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Command as CmdRoot, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from '@/components/ui/command'

import { PROFILE, NAV, SKILLS, PROJECTS, EXPERIENCE, CERTIFICATIONS, EDUCATION, ACHIEVEMENTS } from '@/lib/portfolio-data'

const iconMap = { Cloud, Container, GitBranch, Boxes, Activity, Code2, ShieldCheck, Sparkles }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } })
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

function Nav({ onOpenCmd }) {
  const ids = NAV.map(n => n.id)
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className={`flex items-center justify-between rounded-full border border-white/[0.06] transition-all ${scrolled ? 'bg-[#080b13]/80 backdrop-blur-xl px-3 py-2' : 'bg-transparent px-3 py-2'}`}>
          <a href="#home" className="flex items-center gap-2 pl-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 ping-slow" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Aditya Singh</span>
            <span className="hidden md:inline text-xs text-white/40 mono">/ devops</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-3 py-1.5 text-xs mono uppercase tracking-widest transition-colors ${active === n.id ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCmd}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-white/20 transition-all"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="mono">Search</span>
              <kbd className="mono ml-2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/50">⌘K</kbd>
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 text-xs font-medium hover:bg-white/90 transition-all"
            >
              Get in touch <ArrowRight className="h-3 w-3" />
            </a>
            <button
              className="md:hidden rounded-full border border-white/10 bg-white/[0.03] p-2"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-auto max-w-6xl px-4 mt-2"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-[#080b13]/95 backdrop-blur-xl p-3">
              {NAV.map(n => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${active === n.id ? 'bg-white/[0.05] text-white' : 'text-white/60'}`}
                >
                  {n.label} <ChevronRight className="h-4 w-4 opacity-40" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HeroScene() {
  const containerRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 80, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 80, damping: 20 })

  const handleMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const nodes = [
    { x: 20, y: 20, label: 'AWS', icon: Cloud, delay: 0.1 },
    { x: 70, y: 12, label: 'K8s', icon: Boxes, delay: 0.2 },
    { x: 88, y: 40, label: 'Docker', icon: Container, delay: 0.3 },
    { x: 78, y: 72, label: 'Jenkins', icon: Workflow, delay: 0.4 },
    { x: 42, y: 82, label: 'Terraform', icon: Server, delay: 0.5 },
    { x: 10, y: 60, label: 'Grafana', icon: Activity, delay: 0.6 },
    { x: 32, y: 32, label: 'GitHub', icon: GitBranch, delay: 0.7 }
  ]
  const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[6,1],[0,4],[2,4]]

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative w-full aspect-square max-w-[560px] mx-auto"
      style={{ perspective: 1200 }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[92%] h-[92%] rounded-full border border-white/[0.06]" />
          <div className="absolute w-[70%] h-[70%] rounded-full border border-white/[0.08]" />
          <div className="absolute w-[48%] h-[48%] rounded-full border border-white/[0.10]" />
          <div className="absolute w-[26%] h-[26%] rounded-full border border-blue-400/20" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[26%] h-[26%] rounded-full bg-gradient-to-br from-blue-500/40 to-indigo-500/10 blur-2xl" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-2xl glass-strong p-4 glow-blue"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] mono text-white/50 uppercase tracking-widest">production</div>
                <div className="text-xs font-medium">infra.cluster</div>
              </div>
            </div>
          </motion.div>
        </div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {lines.map(([a,b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="url(#lineGrad)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.08 }}
            />
          ))}
          {lines.slice(0,5).map(([a,b], i) => (
            <motion.circle
              key={`p${i}`}
              r="0.4"
              fill="#60a5fa"
              initial={{ cx: nodes[a].x, cy: nodes[a].y, opacity: 0 }}
              animate={{
                cx: [nodes[a].x, nodes[b].x],
                cy: [nodes[a].y, nodes[b].y],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}
        </svg>

        {nodes.map((n, i) => {
          const Icon = n.icon
          return (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + n.delay }}
              className="absolute floaty"
              style={{
                left: `${n.x}%`, top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.4}s`
              }}
            >
              <div className="group relative">
                <div className="glass-strong rounded-xl px-2.5 py-2 flex items-center gap-2 hover:border-blue-400/40 transition-all">
                  <Icon className="h-3.5 w-3.5 text-blue-300" />
                  <span className="text-[11px] mono text-white/80">{n.label}</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl transition-all" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 400], [0, 80])

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 grid-bg mask-radial opacity-[0.7]" />
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="aurora bg-blue-600/40 w-[600px] h-[600px] -top-40 -left-40" />
        <div className="aurora bg-indigo-500/30 w-[500px] h-[500px] top-40 -right-32" />
        <div className="aurora bg-cyan-500/20 w-[400px] h-[400px] bottom-0 left-1/3" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 mb-6"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 ping-slow" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] mono uppercase tracking-widest text-white/70">Open to opportunities · 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]"
            >
              <span className="gradient-text">Reliable cloud infrastructure,</span>
              <br />
              <span className="text-white/60">built for teams that</span>{' '}
              <span className="blue-gradient-text">ship fast.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-base md:text-lg text-white/60 leading-relaxed"
            >
              I&apos;m Aditya — a DevOps &amp; Cloud engineer based in Indore. I build CI/CD pipelines,
              Kubernetes deployments, and Terraform-driven AWS infrastructure that quietly do their job
              so engineering teams can move faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition-all">
                See selected work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href={PROFILE.resume} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition-all">
                <FileDown className="h-4 w-4" /> Resume
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] w-10 h-10 text-white/80 hover:text-white hover:border-white/20 transition-all" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] w-10 h-10 text-white/80 hover:text-white hover:border-white/20 transition-all" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs mono text-white/40"
            >
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Indore, India</div>
              <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {PROFILE.email}</div>
              <div className="flex items-center gap-1.5"><Radio className="h-3.5 w-3.5" /> UTC+5:30</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}

function StackMarquee() {
  const items = ['AWS','Kubernetes','Terraform','Jenkins','Docker','GitHub Actions','Prometheus','Grafana','Linux','Python','Bash','Ansible','CloudWatch','Route 53','Helm','ArgoCD']
  const doubled = [...items, ...items]
  return (
    <section aria-hidden className="relative py-10 border-y border-white/[0.05] bg-white/[0.01] overflow-hidden">
      <div className="flex marquee whitespace-nowrap gap-12">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <Circle className="h-1.5 w-1.5 fill-blue-400/60 text-blue-400/60" />
            <span className="text-white/40 mono text-sm uppercase tracking-widest">{t}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Section({ id, eyebrow, title, description, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-14 max-w-3xl"
        >
          {eyebrow && <div className="section-eyebrow mb-4">{eyebrow}</div>}
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight gradient-text leading-[1.05]">{title}</h2>
          {description && <p className="mt-5 text-white/55 md:text-lg leading-relaxed max-w-2xl">{description}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  )
}

function About() {
  const stats = [
    { k: '25+', v: 'Docker images shipped' },
    { k: '8', v: 'Jenkins pipelines owned' },
    { k: '99%+', v: 'uptime across envs' },
    { k: '~75%', v: 'less manual deploy time' }
  ]
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title="An engineer who thinks in systems, not tickets."
      description="I did not fall in love with DevOps because it was trendy. I fell in love with it because I kept getting curious about the boring layer — the one that quietly decides whether a product feels reliable or fragile. That curiosity turned into pipelines, Kubernetes clusters, and Terraform modules."
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5 text-white/70 md:text-[17px] leading-relaxed"
        >
          <p>
            I&apos;m currently a DevOps trainee at <span className="text-white">Zevo360 Technologies</span>, where I own CI/CD pipelines
            and AWS infrastructure across dev, staging, and production. Day to day, that looks like
            Jenkinsfiles, Terraform plans, Kubernetes manifests, and a lot of small automations that
            add up.
          </p>
          <p>
            My engineering philosophy is boring on purpose: keep the moving parts small, make failure
            modes explicit, and let the automation absorb the repetition. I prefer a Terraform module
            I can reason about over a clever one-off script that only I understand.
          </p>
          <p>
            Longer term, I want to build in the space where AI meets operations — assistants that plan,
            execute, and audit real infrastructure work under strict guardrails. That is where I think
            the next generation of platform tooling is heading.
          </p>
          <div className="pt-4 flex items-center gap-2 text-xs mono text-white/40">
            <GraduationCap className="h-3.5 w-3.5" />
            {EDUCATION.degree} · {EDUCATION.institution} · CGPA {EDUCATION.cgpa}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((s) => (
            <div key={s.v} className="glass rounded-2xl p-5 hover-lift">
              <div className="text-3xl md:text-4xl font-semibold gradient-text">{s.k}</div>
              <div className="mt-2 text-xs text-white/50 leading-snug">{s.v}</div>
            </div>
          ))}
          <div className="col-span-2 glass rounded-2xl p-5">
            <div className="text-xs mono uppercase tracking-widest text-blue-300/80 mb-3">What I&apos;m focused on</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300" />Deployment pipelines that stay green under real load.</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300" />Infrastructure as code that other engineers can read.</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300" />AI-assisted automation with strong guardrails.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 — Toolchain"
      title="The stack I reach for."
      description="Grouped the way I actually think about it — from provisioning the cloud, to shipping images through pipelines, to keeping the whole thing observable."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILLS.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Cloud
          return (
            <motion.div
              key={cat.category}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="group relative glass rounded-2xl p-5 hover-lift overflow-hidden"
            >
              <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${cat.accent} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="flex items-center gap-2.5 mb-4 relative">
                <div className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.06] grid place-items-center">
                  <Icon className="h-4 w-4 text-blue-300" />
                </div>
                <div className="text-sm font-medium">{cat.category}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 relative">
                {cat.items.map((it) => (
                  <span key={it} className="text-[11px] mono px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/70">
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function ProjectsGrid({ onOpen }) {
  return (
    <Section
      id="projects"
      eyebrow="03 — Selected work"
      title="Systems I've built and shipped."
      description="Each project is a small case study. Click any card for the full breakdown — problem, architecture, challenges, and what I would do differently next time."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => onOpen(p)}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-left group relative glass rounded-2xl p-6 hover-lift overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] to-transparent" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] mono uppercase tracking-widest text-blue-300">{p.status}</span>
                  <span className="text-[10px] mono text-white/30">·</span>
                  <span className="text-[10px] mono text-white/40">{p.year}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">{p.name}</h3>
                <p className="mt-1.5 text-sm text-white/50">{p.tagline}</p>
              </div>
              <div className="shrink-0 h-9 w-9 rounded-full border border-white/10 grid place-items-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            <ul className="relative mt-5 space-y-1.5">
              {p.highlights.map((h) => (
                <li key={h} className="text-[13px] text-white/70 flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 mt-0.5 text-blue-300 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="relative mt-5 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 6).map((s) => (
                <span key={s} className="text-[10px] mono px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-white/60">
                  {s}
                </span>
              ))}
              {p.stack.length > 6 && (
                <span className="text-[10px] mono px-2 py-0.5 text-white/40">+{p.stack.length - 6}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <div className="section-eyebrow mb-2">{label}</div>
      <p className="text-white/75">{value}</p>
    </div>
  )
}

function ProjectDialog({ project, onClose }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#080b13]/95 backdrop-blur-xl border border-white/[0.08] text-white">
        {project && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] mono uppercase tracking-widest text-blue-300">{project.status}</span>
                <span className="text-[10px] mono text-white/30">·</span>
                <span className="text-[10px] mono text-white/40">{project.year}</span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-semibold tracking-tight gradient-text text-left">
                {project.name}
              </DialogTitle>
              <p className="text-sm text-white/50 mt-1 text-left">{project.tagline}</p>
            </DialogHeader>

            <div className="mt-5 space-y-6 text-sm text-white/75 leading-relaxed">
              <Field label="Overview" value={project.overview} />
              <Field label="Problem" value={project.problem} />
              <Field label="Solution" value={project.solution} />

              <div>
                <div className="section-eyebrow mb-2">Architecture</div>
                <ul className="space-y-1.5">
                  {project.architecture.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-1 text-blue-300 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="section-eyebrow mb-2">Tech stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="text-[11px] mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Field label="Challenges" value={project.challenges} />
              <Field label="Lessons learned" value={project.lessons} />
              <Field label="Future improvements" value={project.future} />

              <div className="pt-2 flex flex-wrap gap-2">
                <a href={project.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs hover:border-white/20 transition-all">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a href={project.demo} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs hover:border-white/20 transition-all">
                  <ExternalLink className="h-3.5 w-3.5" /> Live demo
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="04 — Experience"
      title="Where I've done the work."
      description="A short timeline focused on ownership, technology, and impact."
    >
      <div className="relative">
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-10"
          >
            <div className="hidden md:block text-right pr-10 pt-1">
              <div className="text-xs mono uppercase tracking-widest text-white/40 flex items-center justify-end gap-2">
                <CalendarDays className="h-3.5 w-3.5" /> {e.period}
              </div>
              <div className="mt-1 text-xs text-white/40">{e.location}</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[26px] md:-left-[27px] top-1.5 h-3 w-3 rounded-full bg-blue-400 ring-4 ring-blue-400/15" />
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="md:hidden text-[11px] mono uppercase tracking-widest text-white/40 mb-2">{e.period}</div>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-blue-300" />
                  <h3 className="text-lg font-semibold">{e.role} · {e.company}</h3>
                </div>
                <p className="text-sm text-white/55 mt-2">{e.summary}</p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="text-sm text-white/75 flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-blue-300 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="05 — Learning"
      title="Certifications & training."
      description="Structured learning that filled in gaps around the projects I was already building."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group glass rounded-2xl p-5 hover-lift flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-blue-300" />
                <span className="text-[11px] mono uppercase tracking-widest text-white/40">{c.period}</span>
              </div>
              <h3 className="text-base font-medium leading-tight">{c.name}</h3>
              <p className="text-sm text-white/50 mt-1">{c.issuer}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors shrink-0 mt-1" />
          </motion.a>
        ))}
      </div>

      <div className="mt-10 glass rounded-2xl p-6">
        <div className="section-eyebrow mb-3">Achievements</div>
        <ul className="grid md:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a) => (
            <li key={a} className="text-sm text-white/70 flex items-start gap-2">
              <Sparkles className="h-4 w-4 mt-0.5 text-blue-300 shrink-0" /> {a}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill your name, email, and message.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to send')
      toast.success("Message sent. I'll get back to you soon.")
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="06 — Contact"
      title="Let's build something reliable."
      description="Best way to reach me is the form below or email. I read everything and reply within a day or two."
    >
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-6">
            <div className="section-eyebrow mb-4">Direct</div>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-white/80 hover:text-white group">
                <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.06] grid place-items-center group-hover:border-blue-400/40 transition-colors">
                  <Mail className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-[11px] mono uppercase tracking-widest text-white/40">Email</div>
                  <div>{PROFILE.email}</div>
                </div>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white group">
                <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.06] grid place-items-center group-hover:border-blue-400/40 transition-colors">
                  <Github className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-[11px] mono uppercase tracking-widest text-white/40">GitHub</div>
                  <div>@adityasingh</div>
                </div>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white group">
                <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.06] grid place-items-center group-hover:border-blue-400/40 transition-colors">
                  <Linkedin className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-[11px] mono uppercase tracking-widest text-white/40">LinkedIn</div>
                  <div>Aditya Singh</div>
                </div>
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="section-eyebrow mb-3">Availability</div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ping-slow" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-white/80">Available for full-time DevOps / Cloud roles</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">Open to relocation anywhere in India. Remote-friendly. Responds within 24–48 hours.</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-strong rounded-2xl p-6 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Name</label>
              <Input value={form.name} onChange={onChange('name')} placeholder="Jane Doe" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
            </div>
            <div>
              <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Email</label>
              <Input type="email" value={form.email} onChange={onChange('email')} placeholder="jane@company.com" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
            </div>
          </div>
          <div>
            <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Company (optional)</label>
            <Input value={form.company} onChange={onChange('company')} placeholder="Acme Inc." className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
          </div>
          <div>
            <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Message</label>
            <Textarea rows={6} value={form.message} onChange={onChange('message')} placeholder="Tell me a bit about what you're building..." className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white resize-none" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] mono text-white/40">Encrypted in transit · No spam, ever.</span>
            <Button type="submit" disabled={loading} className="rounded-full bg-white text-black hover:bg-white/90 px-5">
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending</> : <>Send message <Send className="h-3.5 w-3.5 ml-2" /></>}
            </Button>
          </div>
        </motion.form>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-10 mt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
          </span>
          <span className="mono">© {new Date().getFullYear()} Aditya Singh · Built with intent.</span>
        </div>
        <div className="flex items-center gap-3">
          <a href={PROFILE.github} className="text-white/50 hover:text-white text-sm"><Github className="h-4 w-4" /></a>
          <a href={PROFILE.linkedin} className="text-white/50 hover:text-white text-sm"><Linkedin className="h-4 w-4" /></a>
          <a href={`mailto:${PROFILE.email}`} className="text-white/50 hover:text-white text-sm"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  )
}

function CommandPalette({ open, setOpen }) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const openLink = (url) => { setOpen(false); window.open(url, '_blank') }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 bg-[#080b13]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden">
        <CmdRoot className="bg-transparent">
          <CommandInput placeholder="Type a section, project or action..." className="text-white" />
          <CommandList className="text-white">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Navigate">
              {NAV.map(n => (
                <CommandItem key={n.id} onSelect={() => go(n.id)} className="text-white/80">
                  <ChevronRight className="h-3.5 w-3.5 mr-2 text-blue-300" /> Go to {n.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Projects">
              {PROJECTS.map(p => (
                <CommandItem key={p.slug} onSelect={() => go('projects')} className="text-white/80">
                  <Layers className="h-3.5 w-3.5 mr-2 text-blue-300" /> {p.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => openLink(`mailto:${PROFILE.email}`)} className="text-white/80">
                <Mail className="h-3.5 w-3.5 mr-2 text-blue-300" /> Email Aditya
              </CommandItem>
              <CommandItem onSelect={() => openLink(PROFILE.github)} className="text-white/80">
                <Github className="h-3.5 w-3.5 mr-2 text-blue-300" /> Open GitHub
              </CommandItem>
              <CommandItem onSelect={() => openLink(PROFILE.linkedin)} className="text-white/80">
                <Linkedin className="h-3.5 w-3.5 mr-2 text-blue-300" /> Open LinkedIn
              </CommandItem>
              <CommandItem onSelect={() => openLink(PROFILE.resume)} className="text-white/80">
                <FileDown className="h-3.5 w-3.5 mr-2 text-blue-300" /> Download resume
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CmdRoot>
      </DialogContent>
    </Dialog>
  )
}

const App = () => {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [openProject, setOpenProject] = useState(null)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] text-white">
      <Nav onOpenCmd={() => setCmdOpen(true)} />
      <Hero />
      <StackMarquee />
      <About />
      <Skills />
      <ProjectsGrid onOpen={setOpenProject} />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />

      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </main>
  )
}

export default App
