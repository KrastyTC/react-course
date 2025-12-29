import { useFilterSidebar } from '../ui/FilterSidebarContext'
import './FilterSidebar.css'

export function FilterSidebar() {
  const { isOpen, close } = useFilterSidebar()

  return (
    <>
      {isOpen && <div className="filter-sidebar-backdrop" onClick={close} />}
      <aside className={isOpen ? 'filter-sidebar filter-sidebar--open' : 'filter-sidebar'}>
        <div className="filter-sidebar-header">
          <div className="filter-sidebar-title">Filters</div>
          <button className="filter-sidebar-close" onClick={close} aria-label="Close filters">
            ✕
          </button>
        </div>

        <div className="filter-sidebar-content">
          <p className="filter-sidebar-hint">
            Placeholder sidebar for this lesson. Next step would be to add real filter inputs.
          </p>
        </div>
      </aside>
    </>
  )
}


