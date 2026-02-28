import { useMemo } from 'react'

export interface RangeSliderProps {
  label: string
  min: number
  max: number
  value: number
  step?: number
  onChange: (value: number) => void
}

export function RangeSlider({ label, min, max, value, step = 1, onChange }: RangeSliderProps) {
  const progress = ((value - min) / Math.max(1, max - min)) * 100

  return (
    <div className="ds-range">
      <div className="ds-range__head">
        <span className="ds-range__label">{label}</span>
        <span className="ds-range__value">{value.toLocaleString('ru-RU')}</span>
      </div>
      <div className="ds-range__track">
        <span className="ds-range__fill" style={{ width: `${progress}%` }} />
      </div>
      <input
        className="ds-range__input"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </div>
  )
}

export interface PriceRangeProps {
  minLimit: number
  maxLimit: number
  minValue: number
  maxValue: number
  onChange: (next: { minValue: number; maxValue: number }) => void
}

export function PriceRange({ minLimit, maxLimit, minValue, maxValue, onChange }: PriceRangeProps) {
  const normalized = useMemo(
    () => ({
      minValue: Math.max(minLimit, Math.min(minValue, maxValue - 1)),
      maxValue: Math.min(maxLimit, Math.max(maxValue, minValue + 1)),
    }),
    [maxLimit, maxValue, minLimit, minValue],
  )

  const minPercent = ((normalized.minValue - minLimit) / Math.max(1, maxLimit - minLimit)) * 100
  const maxPercent = ((normalized.maxValue - minLimit) / Math.max(1, maxLimit - minLimit)) * 100

  return (
    <div className="ds-price-range">
      <div className="ds-price-range__head">
        <span className="ds-price-range__chip">от {normalized.minValue.toLocaleString('ru-RU')} ₽</span>
        <span className="ds-price-range__chip">до {normalized.maxValue.toLocaleString('ru-RU')} ₽</span>
      </div>

      <div className="ds-price-range__slider-wrap">
        <div className="ds-price-range__track" />
        <div className="ds-price-range__selected" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }} />

        <input
          className="ds-price-range__input ds-price-range__input--min"
          max={normalized.maxValue - 1}
          min={minLimit}
          onChange={(event) =>
            onChange({
              minValue: Number(event.target.value),
              maxValue: normalized.maxValue,
            })
          }
          type="range"
          value={normalized.minValue}
        />

        <input
          className="ds-price-range__input ds-price-range__input--max"
          max={maxLimit}
          min={normalized.minValue + 1}
          onChange={(event) =>
            onChange({
              minValue: normalized.minValue,
              maxValue: Number(event.target.value),
            })
          }
          type="range"
          value={normalized.maxValue}
        />
      </div>
    </div>
  )
}
