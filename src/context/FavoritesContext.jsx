import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readJSON, writeJSON } from '../lib/storage.js'

const STORAGE_KEY = 'horizon.favorites'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    const stored = readJSON(STORAGE_KEY, [])
    return Array.isArray(stored) ? stored : []
  })

  useEffect(() => {
    writeJSON(STORAGE_KEY, ids)
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    )
  }, [])

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggle,
    }),
    [ids, toggle],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return context
}
