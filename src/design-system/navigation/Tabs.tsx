interface TabItem {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange?: (id: string) => void
}

export function Tabs({ activeId, items, onChange }: TabsProps) {
  return (
    <section className="ds-tabs" aria-label="Вкладки">
      {items.map((item) => (
        <button
          key={item.id}
          className={`ds-tabs__item ${item.id === activeId ? 'ds-tabs__item--active' : ''}`}
          onClick={() => onChange?.(item.id)}
          type="button"
        >
          <span>{item.label}</span>
          {item.count !== undefined ? <span className="ds-tabs__count">{item.count}</span> : null}
        </button>
      ))}
    </section>
  )
}
