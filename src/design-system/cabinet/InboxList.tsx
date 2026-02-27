import { Badge } from '../primitives/Badge'

export interface InboxItem {
  id: string
  title: string
  text: string
  time: string
  unread?: number
  meta?: string
}

export interface InboxListProps {
  items: InboxItem[]
  activeId: string
  onSelect?: (id: string) => void
}

export function InboxList({ activeId, items, onSelect }: InboxListProps) {
  return (
    <section className="ds-inbox" aria-label="Список диалогов">
      {items.map((item) => (
        <article
          key={item.id}
          aria-pressed={onSelect ? item.id === activeId : undefined}
          className={`ds-inbox__item ${item.id === activeId ? 'ds-inbox__item--active' : ''} ${onSelect ? 'ds-inbox__item--interactive' : ''}`}
          onClick={onSelect ? () => onSelect(item.id) : undefined}
          onKeyDown={
            onSelect
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onSelect(item.id)
                  }
                }
              : undefined
          }
          role={onSelect ? 'button' : undefined}
          tabIndex={onSelect ? 0 : undefined}
        >
          <div className="ds-inbox__row">
            <h3 className="ds-inbox__title">{item.title}</h3>
            <p className="ds-inbox__meta">{item.time}</p>
          </div>
          <p className="ds-inbox__text">{item.text}</p>
          <div className="ds-inbox__row">
            <p className="ds-inbox__meta">{item.meta ?? 'Marketplace chat'}</p>
            {item.unread ? <Badge variant="accent">{item.unread}</Badge> : null}
          </div>
        </article>
      ))}
    </section>
  )
}
