interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export function Slider({ max = 100, min = 0, onChange, step = 1, value }: SliderProps) {
  return (
    <label className="ds-ads-slider">
      <input
        className="ds-ads-slider__control"
        max={max}
        min={min}
        onChange={(event) => onChange?.(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
      <span className="ds-ads-slider__value">{value}</span>
    </label>
  )
}
