export interface SidebarItem {
  id: string
  label: string
  count?: number
}

export interface SidebarNavProps {
  title: string
  activeId: string
  items: SidebarItem[]
  onChange?: (id: string) => void
}

export function SidebarNav({ activeId, items, onChange, title }: SidebarNavProps) {
  return (
    <nav className="ds-cabinet-nav" aria-label={title}>
      <p className="ds-cabinet-nav__title">{title}</p>
      {items.map((item) => (
        <button
          key={item.id}
          aria-current={item.id === activeId ? 'page' : undefined}
          className={`ds-cabinet-nav__item ${item.id === activeId ? 'ds-cabinet-nav__item--active' : ''}`}
          onClick={() => onChange?.(item.id)}
          type="button"
        >
          <span>{item.label}</span>
          {item.count !== undefined ? <span className="ds-cabinet-nav__count">{item.count}</span> : null}
        </button>
      ))}
    </nav>
  )
}
