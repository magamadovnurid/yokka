import { Button } from '../primitives/Button'
import { Icon, type IconName } from '../primitives/Icon'

interface EmptyStateProps {
  title: string
  description: string
  icon?: IconName
  actionText?: string
}

export function EmptyState({ actionText, description, icon = 'box', title }: EmptyStateProps) {
  return (
    <section className="ds-empty">
      <Icon name={icon} size={22} />
      <h3 className="ds-empty__title">{title}</h3>
      <p className="ds-empty__description">{description}</p>
      {actionText ? <Button variant="secondary">{actionText}</Button> : null}
    </section>
  )
}
