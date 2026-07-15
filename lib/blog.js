import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  const posts = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '1970-01-01',
      category: data.category || 'General',
      tags: data.tags || [],
      cover: data.cover || null,
      author: data.author || 'Aditya Singh',
      readingTime: rt.text,
      content
    }
  })
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return getAllPosts().find(p => p.slug === slug) || null
}

export function getCategories() {
  const set = new Set(getAllPosts().map(p => p.category))
  return Array.from(set)
}

export function getTags() {
  const set = new Set(getAllPosts().flatMap(p => p.tags))
  return Array.from(set)
}

export function getAdjacentPosts(slug) {
  const all = getAllPosts()
  const idx = all.findIndex(p => p.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  }
}
