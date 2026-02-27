import { Button } from '../primitives/Button'
import { Icon } from '../primitives/Icon'
import { Input } from '../primitives/Input'
import { Tag } from '../primitives/Tag'

export interface SearchPanelProps {
  title: string
  subtitle: string
  popularFilters: string[]
  query?: string
  location?: string
  onQueryChange?: (query: string) => void
  onLocationChange?: (location: string) => void
  onSearch?: () => void
  onFilterClick?: (filter: string) => void
}

export function SearchPanel({
  location = '',
  onFilterClick,
  onLocationChange,
  onQueryChange,
  onSearch,
  popularFilters,
  query = '',
  subtitle,
  title,
}: SearchPanelProps) {
  return (
    <section className="ds-market-search">
      <header className="ds-stack" style={{ gap: '8px' }}>
        <h2 className="ds-market-search__title">{title}</h2>
        <p className="ds-market-search__meta">{subtitle}</p>
      </header>

      <div className="ds-market-search__grid">
        <Input
          aria-label="Запрос"
          {...(onQueryChange
            ? {
                value: query,
                onChange: (event) => onQueryChange(event.target.value),
              }
            : undefined)}
          placeholder="Что ищете"
          startAdornment={<Icon name="search" size={15} />}
        />
        <Input
          aria-label="Город"
          {...(onLocationChange
            ? {
                value: location,
                onChange: (event) => onLocationChange(event.target.value),
              }
            : undefined)}
          placeholder="Город"
          startAdornment={<Icon name="location" size={15} />}
        />
        <Button onClick={onSearch} type="button">
          Найти
        </Button>
      </div>

      <div className="ds-market-search__chips">
        {popularFilters.map((filter) =>
          onFilterClick ? (
            <button key={filter} className="ds-market-search__chip-btn" onClick={() => onFilterClick(filter)} type="button">
              <Tag variant="neutral">{filter}</Tag>
            </button>
          ) : (
            <Tag key={filter} variant="neutral">
              {filter}
            </Tag>
          ),
        )}
      </div>
    </section>
  )
}
