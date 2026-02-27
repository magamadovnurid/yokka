interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  label?: string
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
}

export function RadioGroup({ label, name, onChange, options, value }: RadioGroupProps) {
  return (
    <fieldset className="ds-radio-group" style={{ border: 0, margin: 0, padding: 0 }}>
      {label ? <legend className="ds-input-field__label">{label}</legend> : null}
      {options.map((option) => (
        <label key={option.value} className="ds-radio">
          <input
            checked={value === option.value}
            name={name}
            onChange={() => onChange(option.value)}
            type="radio"
            value={option.value}
          />
          <span className="ds-radio__label">
            <span className="ds-radio__title">{option.label}</span>
            {option.description ? <span className="ds-radio__desc">{option.description}</span> : null}
          </span>
        </label>
      ))}
    </fieldset>
  )
}
