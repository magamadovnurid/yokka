import type { ReactNode } from 'react'

export interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children?: ReactNode
  actions?: ReactNode
}

export function Modal({ open, title, description, onClose, children, actions }: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="ds-modal-backdrop" onClick={onClose} role="presentation">
      <div className="ds-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <header className="ds-modal__header">
          <h4 className="ds-modal__title">{title}</h4>
          <button className="ds-modal__close" onClick={onClose} type="button" aria-label="Закрыть окно">
            ×
          </button>
        </header>
        {description ? <p className="ds-modal__description">{description}</p> : null}
        {children ? <div className="ds-modal__body">{children}</div> : null}
        {actions ? <div className="ds-modal__actions">{actions}</div> : null}
      </div>
    </div>
  )
}

export interface DrawerProps {
  open: boolean
  title: string
  onClose: () => void
  children?: ReactNode
}

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  if (!open) {
    return null
  }

  return (
    <div className="ds-drawer-backdrop" onClick={onClose} role="presentation">
      <aside className="ds-drawer" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <header className="ds-drawer__header">
          <h4 className="ds-drawer__title">{title}</h4>
          <button className="ds-drawer__close" onClick={onClose} type="button" aria-label="Закрыть панель">
            ×
          </button>
        </header>
        <div className="ds-drawer__body">{children}</div>
      </aside>
    </div>
  )
}
