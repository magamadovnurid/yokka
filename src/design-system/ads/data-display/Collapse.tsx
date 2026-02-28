interface CollapseItem {
  id: string
  label: string
  content: string
}

interface CollapseProps {
  items: CollapseItem[]
  openId: string
  onToggle?: (id: string) => void
}

export function Collapse({ items, onToggle, openId }: CollapseProps) {
  return (
    <div className="ds-ads-collapse">
      {items.map((item) => {
        const isOpen = item.id === openId

        return (
          <section key={item.id} className="ds-ads-collapse__item">
            <button
              aria-expanded={isOpen}
              className="ds-ads-collapse__header"
              onClick={() => onToggle?.(item.id)}
              type="button"
            >
              <span>{item.label}</span>
              <span className={`ds-ads-collapse__chevron ${isOpen ? 'ds-ads-collapse__chevron--open' : ''}`}>⌄</span>
            </button>
            {isOpen ? <p className="ds-ads-collapse__content">{item.content}</p> : null}
          </section>
        )
      })}
    </div>
  )
}
