import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
}

export function Select({ error, hint, label, options, ...rest }: SelectProps) {
  return (
    <label className="ds-input-field">
      {label ? <span className="ds-input-field__label">{label}</span> : null}
      <span className={`ds-input-wrap ds-select-wrap ${error ? 'ds-input-wrap--error' : ''}`}>
        <select className="ds-select" {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      {error ? <span className="ds-input-field__error">{error}</span> : null}
      {!error && hint ? <span className="ds-input-field__hint">{hint}</span> : null}
    </label>
  )
}
