interface MenuItem {
  id: string
  label: string
  count?: number
}

interface MenuProps {
  items: MenuItem[]
  activeId: string
  onChange?: (id: string) => void
}

export function NavMenu({ activeId, items, onChange }: MenuProps) {
  return (
    <nav className="ds-ads-menu" aria-label="Navigation menu">
      {items.map((item) => (
        <button
          key={item.id}
          className={`ds-ads-menu__item ${item.id === activeId ? 'ds-ads-menu__item--active' : ''}`}
          onClick={() => onChange?.(item.id)}
          type="button"
        >
          <span>{item.label}</span>
          {item.count !== undefined ? <span className="ds-ads-menu__count">{item.count}</span> : null}
        </button>
      ))}
    </nav>
  )
}
