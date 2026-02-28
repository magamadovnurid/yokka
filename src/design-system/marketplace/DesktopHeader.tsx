import { Avatar } from '../primitives/Avatar'
import { Badge } from '../primitives/Badge'
import { Icon, type IconName } from '../primitives/Icon'
import { Input } from '../primitives/Input'

interface DesktopHeaderAction {
  id: string
  label: string
  icon: IconName
  count?: number
}

export interface DesktopHeaderProps {
  city: string
  query: string
  userName: string
  actions: DesktopHeaderAction[]
  onAction?: (actionId: string) => void
  onCityClick?: () => void
  onQueryChange?: (query: string) => void
}

export function DesktopHeader({ actions, city, onAction, onCityClick, onQueryChange, query, userName }: DesktopHeaderProps) {
  return (
    <header className="ds-market-header" aria-label="Desktop header">
      <div className="ds-market-header__left">
        <strong className="ds-market-header__brand">Yokka</strong>
        <button className="ds-market-header__city" onClick={onCityClick} type="button">
          <Icon name="location" size={14} />
          <span>{city}</span>
        </button>
      </div>

      <div className="ds-market-header__search">
        <Input
          aria-label="Header search"
          onChange={(event) => onQueryChange?.(event.target.value)}
          placeholder="Поиск объявлений"
          startAdornment={<Icon name="search" size={14} />}
          value={query}
        />
      </div>

      <div className="ds-market-header__right">
        {actions.map((action) => (
          <button key={action.id} className="ds-market-header__action" onClick={() => onAction?.(action.id)} type="button">
            <span className="ds-inline">
              <Icon name={action.icon} size={14} />
              <span>{action.label}</span>
            </span>
            {action.count ? <Badge variant="accent">{action.count}</Badge> : null}
          </button>
        ))}

        <div className="ds-market-header__profile">
          <Avatar name={userName} online />
          <span className="ds-market-header__profile-name">{userName}</span>
        </div>
      </div>
    </header>
  )
}
