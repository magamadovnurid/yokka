import { Badge } from '../primitives/Badge'

export interface NotificationItem {
  id: string
  title: string
  text: string
  time: string
  unread?: boolean
  type: 'system' | 'order' | 'message'
}

export interface NotificationListProps {
  items: NotificationItem[]
  onItemClick?: (item: NotificationItem) => void
}

const badgeLabel: Record<NotificationItem['type'], string> = {
  system: 'Система',
  order: 'Сделка',
  message: 'Чат',
}

export function NotificationList({ items, onItemClick }: NotificationListProps) {
  return (
    <section className="ds-notifications" aria-label="Уведомления">
      {items.map((item) => (
        <article
          key={item.id}
          className={`ds-notification ${item.unread ? 'ds-notification--unread' : ''} ${onItemClick ? 'ds-notification--interactive' : ''}`}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
          onKeyDown={
            onItemClick
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onItemClick(item)
                  }
                }
              : undefined
          }
          role={onItemClick ? 'button' : undefined}
          tabIndex={onItemClick ? 0 : undefined}
        >
          <div className="ds-row" style={{ justifyContent: 'space-between' }}>
            <p className="ds-notification__title">{item.title}</p>
            <Badge variant={item.unread ? 'accent' : 'neutral'}>{badgeLabel[item.type]}</Badge>
          </div>
          <p className="ds-notification__text">{item.text}</p>
          <p className="ds-notification__time">{item.time}</p>
        </article>
      ))}
    </section>
  )
}
