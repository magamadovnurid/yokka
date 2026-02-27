import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}

export function Button({
  children,
  className,
  disabled,
  icon,
  loading = false,
  size = 'md',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const classes = ['ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, className].filter(Boolean).join(' ')

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {icon}
      {loading ? 'Загрузка…' : children}
    </button>
  )
}
