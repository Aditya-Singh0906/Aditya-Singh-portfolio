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

import { PROFILE, NAV, EXTERNAL_NAV, SKILLS, PROJECTS, CERTIFICATIONS, EDUCATION, ACHIEVEMENTS } from '@/lib/portfolio-data'
import GitHubSection from '@/components/GitHubSection'

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
      <div className="container-wide">
        <div className={`flex items-center justify-between rounded-full border border-white/[0.06] transition-all ${scrolled ? 'bg-[#080b13]/90 backdrop-blur-xl px-4 py-3' : 'bg-[#080b13]/40 backdrop-blur-md px-6 py-4 lg:px-8'}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70 ping-slow" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Aditya Singh</span>
            <span className="hidden md:inline text-xs text-white/40 mono">/ devops</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-3 py-2 xl:px-4 text-[10px] xl:text-[11px] mono uppercase tracking-widest transition-colors ${active === n.id ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
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
            {EXTERNAL_NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative px-3 py-2 xl:px-4 text-[10px] xl:text-[11px] mono uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 xl:gap-4">
            <button
              onClick={onOpenCmd}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[11px] text-white/60 hover:text-white hover:border-white/20 transition-all"
              aria-label="Open command palette"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="mono hidden xl:inline">Search</span>
              <kbd className="mono rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-white/50 hidden xl:inline">⌘K</kbd>
            </button>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[11px] text-white/70 hover:text-white hover:border-white/20 transition-all uppercase mono tracking-widest"
              aria-label="Download resume"
            >
              <FileDown className="h-3.5 w-3.5" /> Resume
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-[12px] font-bold hover:bg-white/90 transition-all uppercase mono tracking-widest"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
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
            className="md:hidden container-wide mt-2"
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
              {EXTERNAL_NAV.map(n => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/60"
                >
                  {n.label} <ChevronRight className="h-4 w-4 opacity-40" />
                </a>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-blue-300"
              >
                Download Resume <FileDown className="h-4 w-4" />
              </a>
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

      <div className="relative z-10 container-wide w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              <span className="gradient-text">AWS Infrastructure</span>
              <br />
              <span className="text-white/60">That Deploys, Monitors &</span>{' '}
              <span className="blue-gradient-text">Runs Reliably.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-base md:text-lg text-white/60 leading-relaxed"
            >
              I help startups and small software teams deploy applications on AWS, automate deployments with CI/CD, and monitor their infrastructure with reliable alerts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-white/90 transition-all">
                Get Infrastructure Help
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition-all">
                View My Work
              </a>
              <a href={PROFILE.resume} className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-xs text-white/60 hover:text-white transition-all">
                <FileDown className="h-3 w-3" /> View Resume
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
      <div className="container-wide">
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
  const capabilities = [
    { icon: Workflow, title: 'Production-style CI/CD workflows' },
    { icon: Server, title: 'AWS infrastructure automation' },
    { icon: Activity, title: 'Cloud monitoring & alerting' },
    { icon: Container, title: 'Containerized deployments' }
  ]
  return (
    <Section
      id="about"
      eyebrow="05 — About"
      title="An engineer who thinks in systems, not tickets."
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 xl:gap-20 items-start mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-white/70 md:text-[17px] leading-relaxed max-w-[85ch]"
        >
          <p>
            I'm an AWS and DevOps-focused engineer interested in building reliable cloud infrastructure, automated deployment pipelines, and practical monitoring systems.
          </p>
          <p>
            My work focuses on turning manual infrastructure tasks into repeatable workflows using AWS, Linux, Docker, CI/CD, Infrastructure as Code, and observability tools.
          </p>
          <p>
            I enjoy understanding how systems work end to end — from provisioning infrastructure and deploying applications to monitoring services and troubleshooting failures.
          </p>
          <p>
            I'm also exploring how AI can make infrastructure operations more intelligent through automation, incident analysis, documentation, and operational assistance.
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
          {capabilities.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.title} className="glass rounded-2xl p-5 hover-lift">
                <Icon className="h-6 w-6 text-blue-400 mb-3" />
                <div className="text-sm text-white/80 font-medium leading-snug">{c.title}</div>
              </div>
            )
          })}
          <div className="col-span-2 glass rounded-2xl p-5">
            <div className="text-xs mono uppercase tracking-widest text-blue-300/80 mb-3">What I'm focused on</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300 shrink-0" />Deployment pipelines that stay green under real load.</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300 shrink-0" />Infrastructure as code that other engineers can read.</li>
              <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300 shrink-0" />AI-assisted automation with strong guardrails.</li>
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
      eyebrow="04 — TECH STACK"
      title="The Stack I Reach For."
      description="Grouped the way I actually think about it — from provisioning the cloud, to shipping images through pipelines, to keeping the whole thing observable."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
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
              className="group relative glass rounded-2xl p-6 hover-lift overflow-hidden flex flex-col"
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
      eyebrow="02 — CASE STUDIES"
      title="Infrastructure Solutions & Case Studies."
      description="Click any project for a complete breakdown of the problem, solution, architecture, and results."
    >
      <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">
        {PROJECTS.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => onOpen(p)}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-left group relative glass rounded-2xl p-6 lg:p-8 hover-lift overflow-hidden flex flex-col justify-between"
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
              <Field label="Problem" value={project.problem} />
              <Field label="Solution" value={project.solution} />

              <div>
                <div className="section-eyebrow mb-2">Architecture</div>
                <ul className="space-y-1.5">
                  {project.architecture?.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <ChevronRight className="h-3.5 w-3.5 mt-1 text-blue-300 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.result && <Field label="Result" value={project.result} />}

              <div>
                <div className="section-eyebrow mb-2">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.map((s) => (
                    <span key={s} className="text-[11px] mono px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a href={project.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs hover:border-white/20 transition-all">
                  <Github className="h-3.5 w-3.5" /> View GitHub
                </a>
                <a href={project.demo} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs hover:border-white/20 transition-all">
                  <ExternalLink className="h-3.5 w-3.5" /> View Demo
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs hover:border-white/20 transition-all">
                  <Layers className="h-3.5 w-3.5" /> View Architecture
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}



function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="07 — CERTIFICATIONS"
      title="Certifications & Training."
      description="Structured learning that filled in gaps around the projects I was already building."
    >
      <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
        {CERTIFICATIONS.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group glass rounded-2xl p-6 lg:p-8 hover-lift flex items-start justify-between gap-4"
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

function Services() {
  const services = [
    { icon: Cloud, title: 'AWS Application Deployment', description: 'EC2, Ubuntu/Linux, Docker, Nginx, HTTPS/SSL and production deployment.', cta: 'Discuss Your Setup' },
    { icon: Workflow, title: 'CI/CD Automation', description: 'GitHub Actions, Jenkins, automated builds, testing and deployment pipelines.', cta: 'Learn More' },
    { icon: Activity, title: 'AWS Monitoring & Alerting', description: 'CloudWatch dashboards, CPU/memory/disk monitoring, alarms and automated notifications.', cta: 'Learn More' },
    { icon: Server, title: 'Linux & Server Management', description: 'Server configuration, troubleshooting, backups, security hardening and operational support.', cta: 'Discuss Your Setup' }
  ]
  return (
    <Section id="services" eyebrow="01 — SERVICES" title="AWS & DevOps Services" description="Practical infrastructure solutions for teams that need reliable deployment, automation and monitoring.">
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group relative glass-strong p-8 rounded-2xl hover:border-blue-500/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white/90">{s.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">{s.description}</p>
              </div>
              <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
                <a href="#contact" className="inline-flex items-center gap-2 text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  {s.cta} <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function WhoIHelp() {
  const audiences = [
    { title: 'Startups', description: 'Deploy your application on AWS without building a full infrastructure team.' },
    { title: 'Software Agencies', description: 'Create repeatable deployment and monitoring infrastructure for client applications.' },
    { title: 'Small SaaS Teams', description: 'Automate deployments and monitor production infrastructure without managing everything manually.' }
  ]
  return (
    <Section id="who-i-help" title="Built for Teams Without Dedicated DevOps Support">
      <div className="grid md:grid-cols-3 gap-6 xl:gap-8 mt-12">
        {audiences.map((a, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-panel p-8 xl:p-10 rounded-2xl border border-white/5 hover:border-white/20 transition-all relative overflow-hidden group min-h-[220px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-400/0 to-indigo-500/0 group-hover:from-blue-500/50 group-hover:via-blue-400/50 group-hover:to-indigo-500/50 transition-all" />
            <h3 className="text-xl font-semibold mb-3 text-white/90">{a.title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">{a.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function HowIWork() {
  const steps = [
    { num: '01', title: 'Understand', desc: 'Understand the application, infrastructure and deployment requirements.' },
    { num: '02', title: 'Deploy', desc: 'Set up the AWS/Linux/Docker environment.' },
    { num: '03', title: 'Automate', desc: 'Build CI/CD pipelines for repeatable deployments.' },
    { num: '04', title: 'Monitor', desc: 'Configure dashboards, alerts and infrastructure monitoring.' },
    { num: '05', title: 'Handover', desc: 'Provide documentation and operational guidance.' }
  ]
  return (
    <Section id="how-i-work" eyebrow="03 — WORKFLOW" title="How I Work">
      <div className="mt-16 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex gap-6 relative pb-12 last:pb-0 group">
            {i !== steps.length - 1 && (
              <div className="absolute left-[23px] top-12 bottom-0 w-px bg-white/10 group-hover:bg-blue-500/30 transition-colors" />
            )}
            <div className="relative z-10 shrink-0 w-12 h-12 rounded-full border border-white/20 bg-[#080b13] flex items-center justify-center text-blue-400 font-mono text-sm group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
              {step.num}
            </div>
            <div className="pt-2.5">
              <h3 className="text-xl font-medium text-white/90 mb-2">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function BusinessCTA() {
  return (
    <section className="relative py-24 overflow-hidden border-y border-white/[0.05] bg-gradient-to-b from-blue-900/10 to-transparent">
      <div className="absolute inset-0 grid-bg opacity-30 mask-radial" />
      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight gradient-text mb-6">Need Help With Your AWS Infrastructure?</h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Tell me what you're running, where it's hosted, and what infrastructure problem you're trying to solve.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-blue-500 text-white px-6 py-3 text-sm font-medium hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Request Infrastructure Review <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/20 transition-all">
              View My Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
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
      eyebrow="08 — CONTACT"
      title="Let's Talk About Your Infrastructure."
      description="If you need help deploying, automating or monitoring an application on AWS, send me the details of your current setup and requirements."
    >
      <div className="grid lg:grid-cols-[1fr_1.25fr] gap-8 xl:gap-16">
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
              <span className="text-sm text-white/80">Available for AWS & DevOps consulting</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">Open to full-time AWS / DevOps opportunities as well. Remote-friendly. Responds within 24–48 hours.</p>
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
              <Input value={form.name} onChange={onChange('name')} placeholder="Your name" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
            </div>
            <div>
              <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Email</label>
              <Input type="email" value={form.email} onChange={onChange('email')} placeholder="you@company.com" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
            </div>
          </div>
          <div>
            <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Company (optional)</label>
            <Input value={form.company} onChange={onChange('company')} placeholder="Company (optional)" className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white h-11" />
          </div>
          <div>
            <label className="text-[11px] mono uppercase tracking-widest text-white/50 mb-1.5 block">Message</label>
            <Textarea rows={6} value={form.message} onChange={onChange('message')} placeholder="Tell me about your application, infrastructure, or deployment problem..." className="bg-white/[0.03] border-white/[0.06] focus-visible:ring-blue-400/40 focus-visible:border-blue-400/40 text-white resize-none" />
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
      <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
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
              <CommandItem onSelect={() => { setOpen(false); window.location.href = '/blog' }} className="text-white/80">
                <ChevronRight className="h-3.5 w-3.5 mr-2 text-blue-300" /> Go to Blog
              </CommandItem>
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
      <Services />
      <WhoIHelp />
      <ProjectsGrid onOpen={setOpenProject} />
      <HowIWork />
      <Skills />
      <About />
      <GitHubSection />
      <Certifications />
      <BusinessCTA />
      <Contact />
      <Footer />

      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </main>
  )
}

export default App
