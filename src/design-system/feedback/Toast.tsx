import { Icon } from '../primitives/Icon'

interface ToastProps {
  title: string
  message: string
}

export function Toast({ message, title }: ToastProps) {
  return (
    <aside className="ds-toast" aria-live="polite">
      <Icon name="check" size={16} />
      <div>
        <div className="ds-toast__title">{title}</div>
        <div className="ds-toast__message">{message}</div>
      </div>
    </aside>
  )
}
