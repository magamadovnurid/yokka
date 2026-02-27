import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  subtitle?: string
  action?: ReactNode
}

export function Card({ action, children, subtitle, title }: CardProps) {
  return (
    <article className="ds-card">
      {(title || subtitle || action) && (
        <header className="ds-card__header">
          <div>
            {title ? <h3 className="ds-card__title">{title}</h3> : null}
            {subtitle ? <p className="ds-card__subtitle">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </article>
  )
}
