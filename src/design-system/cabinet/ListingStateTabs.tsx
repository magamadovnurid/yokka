export interface ListingState {
  id: string
  label: string
  count: number
}

export interface ListingStateTabsProps {
  activeId: string
  states: ListingState[]
  onChange?: (id: string) => void
}

export function ListingStateTabs({ activeId, onChange, states }: ListingStateTabsProps) {
  return (
    <section className="ds-state-tabs" aria-label="Статусы объявлений">
      {states.map((state) => (
        <button
          key={state.id}
          aria-pressed={state.id === activeId}
          className={`ds-state-tabs__item ${state.id === activeId ? 'ds-state-tabs__item--active' : ''}`}
          onClick={() => onChange?.(state.id)}
          type="button"
        >
          <span>{state.label}</span>
          <span className="ds-state-tabs__count">{state.count}</span>
        </button>
      ))}
    </section>
  )
}
