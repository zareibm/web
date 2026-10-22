import { useEffect } from 'react'

/** Keeps the document title in step with the active route. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined
    const previous = document.title
    document.title = title.includes('Horizon') ? title : `${title} | Horizon Properties`
    return () => {
      document.title = previous
    }
  }, [title])
}
