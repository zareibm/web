/**
 * Small localStorage wrapper. Storage can throw (private mode, disabled
 * cookies, quota), so every access is guarded and degrades to memory.
 */
const memory = new Map()

function hasLocalStorage() {
  try {
    const key = '__hp_probe__'
    window.localStorage.setItem(key, '1')
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function readJSON(key, fallback) {
  try {
    const raw = hasLocalStorage() ? window.localStorage.getItem(key) : memory.get(key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  const raw = JSON.stringify(value)
  try {
    if (hasLocalStorage()) window.localStorage.setItem(key, raw)
    else memory.set(key, raw)
  } catch {
    memory.set(key, raw)
  }
}
