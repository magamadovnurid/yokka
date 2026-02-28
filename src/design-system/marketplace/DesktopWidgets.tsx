import { StatusDot } from '../primitives/StatusDot'

interface HighlightItem {
  id: string
  title: string
  value: string
  note: string
}

interface MiniRowItem {
  id: string
  title: string
  price: string
  meta: string
  status: 'success' | 'warning' | 'danger' | 'muted'
}

export interface DesktopWidgetsProps {
  highlights: HighlightItem[]
  miniRows: MiniRowItem[]
}

export function DesktopWidgets({ highlights, miniRows }: DesktopWidgetsProps) {
  return (
    <section className="ds-market-widget-board" aria-label="Desktop widgets">
      <div className="ds-market-widget-board__highlights">
        {highlights.map((item) => (
          <article key={item.id} className="ds-market-widget-card">
            <p className="ds-market-widget-card__title">{item.title}</p>
            <p className="ds-market-widget-card__value">{item.value}</p>
            <p className="ds-market-widget-card__note">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="ds-market-widget-board__rows">
        {miniRows.map((row) => (
          <article key={row.id} className="ds-market-mini-row">
            <div>
              <p className="ds-market-mini-row__title">{row.title}</p>
              <p className="ds-market-mini-row__meta">{row.meta}</p>
            </div>
            <div className="ds-market-mini-row__aside">
              <p className="ds-market-mini-row__price">{row.price}</p>
              <StatusDot
                label={
                  row.status === 'success'
                    ? 'Активно'
                    : row.status === 'warning'
                      ? 'Требует внимания'
                      : row.status === 'danger'
                        ? 'Приостановлено'
                        : 'Черновик'
                }
                tone={row.status === 'muted' ? 'muted' : row.status}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
