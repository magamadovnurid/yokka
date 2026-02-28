import type { ReactNode } from 'react'
import { useState } from 'react'

export interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="ds-tooltip"
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
    >
      <span className="ds-tooltip__anchor">{children}</span>
      {open ? <span className="ds-tooltip__bubble">{content}</span> : null}
    </span>
  )
}

export interface RichTooltipProps {
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
}

export function RichTooltip({ title, description, actionLabel, onAction }: RichTooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="ds-rich-tooltip"
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
    >
      <span className="ds-rich-tooltip__anchor">Наведи, чтобы увидеть подсказку</span>
      {open ? (
        <span className="ds-rich-tooltip__panel" role="tooltip">
          <span className="ds-rich-tooltip__title">{title}</span>
          <span className="ds-rich-tooltip__description">{description}</span>
          <button className="ds-rich-tooltip__action" onClick={onAction} type="button">
            {actionLabel}
          </button>
        </span>
      ) : null}
    </span>
  )
}
