import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export function Textarea({ error, hint, label, ...rest }: TextareaProps) {
  return (
    <label className="ds-input-field">
      {label ? <span className="ds-input-field__label">{label}</span> : null}
      <span className={`ds-input-wrap ${error ? 'ds-input-wrap--error' : ''}`}>
        <textarea className="ds-textarea" {...rest} />
      </span>
      {error ? <span className="ds-input-field__error">{error}</span> : null}
      {!error && hint ? <span className="ds-input-field__hint">{hint}</span> : null}
    </label>
  )
}
