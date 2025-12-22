import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export type ToastNotification = {
  id: string
  type: ToastType
  message: string
  timestamp?: number
  timeout?: number
}

type ToastState = {
  notifications: ToastNotification[]
  addNotification: (n: Omit<ToastNotification, 'id'> & { id?: string }) => string
  removeNotification: (id: string) => void
}

function makeId() {
  // crypto.randomUUID is available in modern browsers; fallback keeps it working everywhere.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useToastStore = create<ToastState>((set) => ({
  notifications: [],
  addNotification: (n) => {
    const id = n.id ?? makeId()
    const next: ToastNotification = {
      id,
      type: n.type,
      message: n.message,
      timestamp: n.timestamp ?? Date.now(),
      timeout: n.timeout,
    }

    set((s) => ({
      notifications: [next, ...s.notifications],
    }))

    return id
  },
  removeNotification: (id) => {
    set((s) => ({
      notifications: s.notifications.filter((t) => t.id !== id),
    }))
  },
}))


