import { Icon } from '../primitives/Icon'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="ds-breadcrumbs" aria-label="Навигационная цепочка">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className={`ds-breadcrumbs__item ${isCurrent ? 'ds-breadcrumbs__item--current' : ''}`}>
            {item.href && !isCurrent ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            {!isCurrent ? <Icon name="chevron-right" size={12} /> : null}
          </span>
        )
      })}
    </nav>
  )
}
