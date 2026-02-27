interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  return <div className="ds-divider">{label ? <span className="ds-divider__label">{label}</span> : null}</div>
}
