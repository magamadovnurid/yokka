import type { HTMLAttributes } from 'react'

type StatusDotTone = 'muted' | 'info' | 'success' | 'warning' | 'danger'

interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusDotTone
  label: string
}

export function StatusDot({ className, label, tone = 'muted', ...rest }: StatusDotProps) {
  return (
    <span className={['ds-status-dot', `ds-status-dot--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="ds-status-dot__point" />
      <span>{label}</span>
    </span>
  )
}
