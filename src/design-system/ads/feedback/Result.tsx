import type { ReactNode } from 'react'

type ResultStatus = 'success' | 'warning' | 'error' | 'info'

interface ResultProps {
  status: ResultStatus
  title: string
  subtitle: string
  extra?: ReactNode
}

const iconByStatus: Record<ResultStatus, string> = {
  success: '✓',
  warning: '!',
  error: '×',
  info: 'i',
}

export function Result({ extra, status, subtitle, title }: ResultProps) {
  return (
    <section className={`ds-ads-result ds-ads-result--${status}`}>
      <span className="ds-ads-result__icon">{iconByStatus[status]}</span>
      <h3 className="ds-ads-result__title">{title}</h3>
      <p className="ds-ads-result__subtitle">{subtitle}</p>
      {extra ? <div className="ds-ads-result__extra">{extra}</div> : null}
    </section>
  )
}
