import { Icon } from '../primitives/Icon'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  variant?: AlertVariant
  title: string
  description: string
}

const iconByVariant: Record<AlertVariant, 'info' | 'check' | 'warning' | 'error'> = {
  info: 'info',
  success: 'check',
  warning: 'warning',
  error: 'error',
}

export function Alert({ description, title, variant = 'info' }: AlertProps) {
  return (
    <section className={`ds-alert ds-alert--${variant}`}>
      <p className="ds-inline ds-alert__title">
        <Icon name={iconByVariant[variant]} size={16} />
        {title}
      </p>
      <p className="ds-alert__description">{description}</p>
    </section>
  )
}
