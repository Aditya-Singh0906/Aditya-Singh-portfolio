import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'portfolio'

let cachedClient = null
async function getDb() {
  if (!MONGO_URL) throw new Error('MONGO_URL not set')
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }
  return cachedClient.db(DB_NAME)
}

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    }
  })
}

export async function OPTIONS() {
  return json({}, 200)
}

export async function GET(request, { params }) {
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
    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    return json({ error: err.message || 'Server error' }, 500)
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))

    if (path === 'contact') {
      const { name, email, message, company } = body || {}
      if (!name || !email || !message) {
        return json({ error: 'name, email and message are required' }, 400)
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: 'Invalid email' }, 400)
      }
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
