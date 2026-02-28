interface TimelineItem {
  id: string
  title: string
  time: string
  text: string
  tone?: 'neutral' | 'success' | 'warning'
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="ds-ads-timeline">
      {items.map((item) => (
        <li key={item.id} className="ds-ads-timeline__item">
          <span className={`ds-ads-timeline__dot ds-ads-timeline__dot--${item.tone ?? 'neutral'}`} />
          <div className="ds-ads-timeline__body">
            <div className="ds-ads-timeline__header">
              <p className="ds-ads-timeline__title">{item.title}</p>
              <span className="ds-ads-timeline__time">{item.time}</span>
            </div>
            <p className="ds-ads-timeline__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
