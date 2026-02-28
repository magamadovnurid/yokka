interface SegmentedItem {
  label: string
  value: string
}

interface SegmentedProps {
  items: SegmentedItem[]
  value: string
  onChange?: (value: string) => void
}

export function Segmented({ items, onChange, value }: SegmentedProps) {
  return (
    <div className="ds-ads-segmented" role="tablist" aria-label="Segmented control">
      {items.map((item) => (
        <button
          key={item.value}
          aria-selected={item.value === value}
          className={`ds-ads-segmented__item ${item.value === value ? 'ds-ads-segmented__item--active' : ''}`}
          onClick={() => onChange?.(item.value)}
          role="tab"
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
