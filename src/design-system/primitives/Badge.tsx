import type { HTMLAttributes } from 'react'

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'info' | 'accent'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ children, className, variant = 'neutral', ...rest }: BadgeProps) {
  return (
    <span className={['ds-badge', `ds-badge--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  )
}
