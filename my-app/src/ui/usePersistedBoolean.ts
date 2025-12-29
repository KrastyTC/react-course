import { useEffect, useState } from 'react'

function parseBoolean(value: string | null): boolean | null {
  if (value === null) return null
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}

export function usePersistedBoolean(key: string, defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(() => {
    try {
      const parsed = parseBoolean(localStorage.getItem(key))
      return parsed ?? defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, String(value))
    } catch {
      // ignore (private mode / denied storage)
    }
  }, [key, value])

  return [value, setValue] as const
}


