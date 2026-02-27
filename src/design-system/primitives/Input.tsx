import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  startAdornment?: ReactNode
}

export function Input({ error, hint, label, startAdornment, ...rest }: InputProps) {
  return (
    <label className="ds-input-field">
      {label ? <span className="ds-input-field__label">{label}</span> : null}
      <span className={`ds-input-wrap ${error ? 'ds-input-wrap--error' : ''}`}>
        {startAdornment ? <span className="ds-input-wrap__adornment">{startAdornment}</span> : null}
        <input className="ds-input" {...rest} />
      </span>
      {error ? <span className="ds-input-field__error">{error}</span> : null}
      {!error && hint ? <span className="ds-input-field__hint">{hint}</span> : null}
    </label>
  )
}
