import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../primitives/Icon'

export interface MenuItem {
  id: string
  label: string
  meta?: string
  danger?: boolean
}

export interface DropdownMenuProps {
  label: string
  items: MenuItem[]
  onSelect?: (id: string) => void
}

export function DropdownMenu({ label, items, onSelect }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const closeOnOutside = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!rootRef.current?.contains(target)) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', closeOnOutside)
    return () => window.removeEventListener('mousedown', closeOnOutside)
  }, [open])

  return (
    <div className="ds-dropdown" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="ds-dropdown__trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {label}
        <Icon name="chevron-down" size={12} />
      </button>

      {open ? (
        <div className="ds-dropdown__panel" role="menu">
          {items.map((item) => (
            <button
              className={`ds-dropdown__item ${item.danger ? 'ds-dropdown__item--danger' : ''}`}
              key={item.id}
              onClick={() => {
                onSelect?.(item.id)
                setOpen(false)
              }}
              role="menuitem"
              type="button"
            >
              <span>{item.label}</span>
              {item.meta ? <span className="ds-dropdown__item-meta">{item.meta}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export interface ActionMenuProps {
  onAction?: (id: string) => void
}

export function ActionMenu({ onAction }: ActionMenuProps) {
  const actions = useMemo(
    () => [
      { id: 'promote', icon: 'filter', label: 'Продвинуть' },
      { id: 'edit', icon: 'settings', label: 'Редактировать' },
      { id: 'archive', icon: 'check', label: 'В архив' },
    ],
    [],
  )

  return (
    <div className="ds-action-menu" role="toolbar">
      {actions.map((action) => (
        <button
          aria-label={action.label}
          className="ds-action-menu__btn"
          key={action.id}
          onClick={() => onAction?.(action.id)}
          type="button"
        >
          <Icon name={action.icon as 'filter' | 'settings' | 'check'} size={14} />
        </button>
      ))}
    </div>
  )
}

export interface ContextMenuOption {
  id: string
  label: string
}

export interface ContextMenuSurfaceProps {
  options: ContextMenuOption[]
  onSelect?: (id: string) => void
}

export function ContextMenuSurface({ options, onSelect }: ContextMenuSurfaceProps) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const areaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }
    const close = () => setOpen(false)
    window.addEventListener('click', close)
    window.addEventListener('contextmenu', close)
    return () => {
      window.removeEventListener('click', close)
      window.removeEventListener('contextmenu', close)
    }
  }, [open])

  return (
    <div
      className="ds-context-surface"
      onContextMenu={(event) => {
        event.preventDefault()
        const rect = areaRef.current?.getBoundingClientRect()
        const left = event.clientX - (rect?.left ?? 0)
        const top = event.clientY - (rect?.top ?? 0)
        setCoords({ x: left, y: top })
        setOpen(true)
      }}
      ref={areaRef}
    >
      <p className="ds-context-surface__text">Правый клик для открытия контекстного меню</p>

      {open ? (
        <div className="ds-context-surface__menu" role="menu" style={{ left: coords.x, top: coords.y }}>
          {options.map((option) => (
            <button
              className="ds-context-surface__item"
              key={option.id}
              onClick={() => {
                onSelect?.(option.id)
                setOpen(false)
              }}
              role="menuitem"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export interface PopoverProps {
  title: string
  description: string
  cta: string
  onCtaClick?: () => void
}

export function PopoverCard({ title, description, cta, onCtaClick }: PopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="ds-popover">
      <button className="ds-popover__trigger" onClick={() => setOpen((value) => !value)} type="button">
        Подсказка
        <Icon name="info" size={13} />
      </button>

      {open ? (
        <div className="ds-popover__panel" role="dialog">
          <p className="ds-popover__title">{title}</p>
          <p className="ds-popover__text">{description}</p>
          <button className="ds-popover__cta" onClick={onCtaClick} type="button">
            {cta}
          </button>
        </div>
      ) : null}
    </div>
  )
}
