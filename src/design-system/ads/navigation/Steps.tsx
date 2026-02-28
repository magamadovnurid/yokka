type StepStatus = 'wait' | 'process' | 'finish'

interface StepItem {
  id: string
  label: string
  description?: string
  status: StepStatus
}

interface StepsProps {
  items: StepItem[]
}

export function StepsLine({ items }: StepsProps) {
  return (
    <ol className="ds-ads-steps" aria-label="Progress steps">
      {items.map((item, index) => (
        <li key={item.id} className={`ds-ads-steps__item ds-ads-steps__item--${item.status}`}>
          <span className="ds-ads-steps__dot">{item.status === 'finish' ? '✓' : index + 1}</span>
          <div className="ds-ads-steps__content">
            <p className="ds-ads-steps__label">{item.label}</p>
            {item.description ? <p className="ds-ads-steps__description">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
