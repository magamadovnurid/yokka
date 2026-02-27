import { Button } from '../primitives/Button'
import { Input } from '../primitives/Input'
import { Select } from '../primitives/Select'
import { Tag } from '../primitives/Tag'

interface SortOption {
  value: string
  label: string
}

export interface FilterBarProps {
  query: string
  resultCount: number
  chips: string[]
  sort?: string
  sortOptions?: SortOption[]
  onQueryChange?: (query: string) => void
  onSortChange?: (sort: string) => void
  onReset?: () => void
  onChipRemove?: (chip: string) => void
}

const defaultSortOptions: SortOption[] = [
  { value: 'new', label: 'Сначала новые' },
  { value: 'cheap', label: 'Сначала дешевле' },
  { value: 'expensive', label: 'Сначала дороже' },
]

export function FilterBar({
  chips,
  onChipRemove,
  onQueryChange,
  onReset,
  onSortChange,
  query,
  resultCount,
  sort,
  sortOptions = defaultSortOptions,
}: FilterBarProps) {
  const activeSort = sort ?? sortOptions[0]?.value ?? 'new'

  return (
    <section className="ds-market-filterbar" aria-label="Панель фильтров">
      <div className="ds-market-filterbar__top">
        <Input
          aria-label="Поиск"
          {...(onQueryChange
            ? {
                value: query,
                onChange: (event) => onQueryChange(event.target.value),
              }
            : {
                defaultValue: query,
              })}
          startAdornment="🔎"
        />
        <Select
          aria-label="Сортировка"
          {...(onSortChange
            ? {
                value: activeSort,
                onChange: (event) => onSortChange(event.target.value),
              }
            : {
                defaultValue: activeSort,
              })}
          options={sortOptions}
        />
        <Button onClick={onReset} type="button" variant="secondary">
          Сбросить
        </Button>
      </div>

      <div className="ds-market-filterbar__chips">
        {chips.map((chip) =>
          onChipRemove ? (
            <button key={chip} className="ds-market-filterbar__chip-btn" onClick={() => onChipRemove(chip)} type="button">
              <Tag variant="neutral">{chip} ×</Tag>
            </button>
          ) : (
            <Tag key={chip} variant="neutral">
              {chip}
            </Tag>
          ),
        )}
      </div>

      <p className="ds-input-field__hint">Найдено объявлений: {resultCount.toLocaleString('ru-RU')}</p>
    </section>
  )
}
