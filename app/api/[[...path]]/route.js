import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'portfolio'
const GH_USER = 'Aditya-Singh0906'

let cachedClient = null
async function getDb() {
  if (!MONGO_URL) throw new Error('MONGO_URL not set')
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }
  return cachedClient.db(DB_NAME)
}

function json(data, status = 200, extra = {}) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      ...extra
    }
  })
}

export async function OPTIONS() { return json({}, 200) }

async function ghFetch(path) {
  const headers = { 'Accept': 'application/vnd.github+json', 'User-Agent': 'aditya-portfolio' }
  if (process.env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  const r = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: 3600 } })
  if (!r.ok) throw new Error(`GitHub ${path} ${r.status}`)
  return r.json()
}

export async function GET(request, ctx) {
  const params = await ctx.params
  const path = (params?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return json({ status: 'ok', service: 'portfolio-api', time: new Date().toISOString() })
    }
    if (path === 'stats') {
      const db = await getDb()
      const total = await db.collection('contact_messages').countDocuments().catch(() => 0)
      return json({ messages: total })
    }
    if (path === 'github/profile') {
      const user = await ghFetch(`/users/${GH_USER}`)
      return json({
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        html_url: user.html_url,
        created_at: user.created_at
      }, 200, { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' })
    }
    if (path === 'github/repos') {
      const repos = await ghFetch(`/users/${GH_USER}/repos?per_page=100&sort=updated`)
      const filtered = (repos || [])
        .filter(r => !r.fork)
        .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)))
        .slice(0, 6)
        .map(r => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          watchers: r.watchers_count,
          topics: r.topics || [],
          updated_at: r.updated_at
        }))
      return json({ repos: filtered }, 200, { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' })
    }
    if (path === 'github/languages') {
      const repos = await ghFetch(`/users/${GH_USER}/repos?per_page=100`)
      const counts = {}
      for (const r of repos || []) {
        if (r.fork || !r.language) continue
        counts[r.language] = (counts[r.language] || 0) + 1
      }
      const total = Object.values(counts).reduce((a,b) => a+b, 0) || 1
      const languages = Object.entries(counts)
        .sort((a,b) => b[1]-a[1])
        .map(([name, count]) => ({ name, count, pct: Math.round((count/total)*1000)/10 }))
      return json({ languages }, 200, { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' })
    }
    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    return json({ error: err.message || 'Server error' }, 500)
  }
}

export async function POST(request, ctx) {
  const params = await ctx.params
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    if (path === 'contact') {
      const { name, email, message, company } = body || {}
      if (!name || !email || !message) return json({ error: 'name, email and message are required' }, 400)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email' }, 400)
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 160),
        company: company ? String(company).slice(0, 160) : '',
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString()
      }
      await db.collection('contact_messages').insertOne(doc)
      return json({ ok: true, id: doc.id })
    }
    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    return json({ error: err.message || 'Server error' }, 500)
  }
}
