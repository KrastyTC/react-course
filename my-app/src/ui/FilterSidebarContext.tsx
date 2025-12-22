import { createContext, useContext, useMemo } from 'react'
import { usePersistedBoolean } from './usePersistedBoolean'

type FilterSidebarContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const FilterSidebarContext = createContext<FilterSidebarContextValue | null>(null)

export function FilterSidebarProvider(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = usePersistedBoolean('sidebar-open', false)

  const value = useMemo<FilterSidebarContextValue>(() => {
    return {
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }
  }, [isOpen, setIsOpen])

  return (
    <FilterSidebarContext.Provider value={value}>
      {props.children}
    </FilterSidebarContext.Provider>
  )
}

export function useFilterSidebar() {
  const ctx = useContext(FilterSidebarContext)
  if (!ctx) {
    throw new Error('useFilterSidebar must be used within <FilterSidebarProvider>')
  }
  return ctx
}


