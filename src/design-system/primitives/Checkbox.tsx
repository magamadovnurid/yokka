import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
}

export function Checkbox({ description, label, ...rest }: CheckboxProps) {
  return (
    <label className="ds-check">
      <input type="checkbox" {...rest} />
      <span className="ds-check__label">
        <span className="ds-check__title">{label}</span>
        {description ? <span className="ds-check__desc">{description}</span> : null}
      </span>
    </label>
  )
}
