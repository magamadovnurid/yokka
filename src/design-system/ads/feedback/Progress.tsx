interface ProgressProps {
  percent: number
  status?: 'normal' | 'success' | 'exception'
}

export function ProgressLine({ percent, status = 'normal' }: ProgressProps) {
  const safePercent = Math.max(0, Math.min(percent, 100))

  return (
    <div className="ds-ads-progress">
      <div className="ds-ads-progress__track" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safePercent} role="progressbar">
        <span className={`ds-ads-progress__bar ds-ads-progress__bar--${status}`} style={{ width: `${safePercent}%` }} />
      </div>
      <span className="ds-ads-progress__meta">{safePercent}%</span>
    </div>
  )
}
