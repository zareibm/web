import { readJSON, writeJSON } from './storage.js'

const INQUIRIES_KEY = 'horizon.inquiries'
const SUBSCRIBERS_KEY = 'horizon.subscribers'

/**
 * Enquiries and newsletter sign-ups are persisted locally until a backend is
 * connected. `saveInquiry` returns the stored record so callers can show a
 * reference in the confirmation state.
 */
export function saveInquiry(record) {
  const entry = {
    id: `hp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...record,
  }
  const all = readJSON(INQUIRIES_KEY, [])
  writeJSON(INQUIRIES_KEY, [entry, ...all].slice(0, 100))
  return entry
}

export function listInquiries() {
  return readJSON(INQUIRIES_KEY, [])
}

export function subscribeToNewsletter(email) {
  const all = readJSON(SUBSCRIBERS_KEY, [])
  const exists = all.some((item) => item.email.toLowerCase() === email.toLowerCase())
  if (exists) return { duplicate: true }
  const entry = { email, createdAt: new Date().toISOString() }
  writeJSON(SUBSCRIBERS_KEY, [entry, ...all].slice(0, 200))
  return { duplicate: false, entry }
}

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
