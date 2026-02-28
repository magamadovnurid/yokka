interface KpiItem {
  id: string
  label: string
  value: string
  delta: string
}

interface QuickAction {
  id: string
  label: string
}

export interface DashboardWidgetsProps {
  balance: string
  hold: string
  kpis: KpiItem[]
  actions: QuickAction[]
  onAction?: (id: string) => void
}

export function DashboardWidgets({ actions, balance, hold, kpis, onAction }: DashboardWidgetsProps) {
  return (
    <section className="ds-cabinet-dashboard-widgets" aria-label="Dashboard widgets">
      <article className="ds-cabinet-balance-card">
        <p className="ds-cabinet-balance-card__label">Баланс кабинета</p>
        <p className="ds-cabinet-balance-card__value">{balance}</p>
        <p className="ds-cabinet-balance-card__meta">В холде: {hold}</p>
      </article>

      <div className="ds-cabinet-kpis">
        {kpis.map((item) => (
          <article key={item.id} className="ds-cabinet-kpi">
            <p className="ds-cabinet-kpi__label">{item.label}</p>
            <p className="ds-cabinet-kpi__value">{item.value}</p>
            <p className="ds-cabinet-kpi__delta">{item.delta}</p>
          </article>
        ))}
      </div>

      <div className="ds-cabinet-quick-actions">
        {actions.map((action) => (
          <button key={action.id} className="ds-cabinet-quick-actions__item" onClick={() => onAction?.(action.id)} type="button">
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}
