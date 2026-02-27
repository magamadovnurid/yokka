interface SwitchProps {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Switch({ checked, disabled = false, label, onChange }: SwitchProps) {
  return (
    <label className={`ds-switch ${checked ? 'ds-switch--checked' : ''}`}>
      <input
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        style={{ display: 'none' }}
        type="checkbox"
      />
      <span className="ds-switch__track" />
      <span className="ds-switch__label">{label}</span>
    </label>
  )
}
