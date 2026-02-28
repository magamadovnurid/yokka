export interface CategoryStripItem {
  id: string
  label: string
  count?: number
}

export interface CategoryStripProps {
  items: CategoryStripItem[]
  activeId: string
  onChange?: (id: string) => void
}

export function CategoryStrip({ activeId, items, onChange }: CategoryStripProps) {
  return (
    <nav className="ds-market-category-strip" aria-label="Категории desktop">
      {items.map((item) => (
        <button
          key={item.id}
          className={`ds-market-category-strip__item ${item.id === activeId ? 'ds-market-category-strip__item--active' : ''}`}
          onClick={() => onChange?.(item.id)}
          type="button"
        >
          <span>{item.label}</span>
          {item.count !== undefined ? <span className="ds-market-category-strip__count">{item.count}</span> : null}
        </button>
      ))}
    </nav>
  )
}
