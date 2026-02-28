interface RateProps {
  value: number
  count?: number
  onChange?: (value: number) => void
}

export function Rate({ count = 5, onChange, value }: RateProps) {
  return (
    <div className="ds-ads-rate" role="radiogroup" aria-label="Rate selector">
      {Array.from({ length: count }, (_, index) => {
        const score = index + 1

        return (
          <button
            key={score}
            aria-checked={score === value}
            className={`ds-ads-rate__star ${score <= value ? 'ds-ads-rate__star--active' : ''}`}
            onClick={() => onChange?.(score)}
            role="radio"
            type="button"
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
