import type { HTMLAttributes } from 'react'

type TagVariant = 'neutral' | 'success' | 'warning' | 'info' | 'accent'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
}

export function Tag({ children, className, variant = 'neutral', ...rest }: TagProps) {
  const classes = ['ds-tag', `ds-tag--${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
