interface GridItem {
  id: string
  label: string
  span: number
}

interface GridProps {
  items: GridItem[]
}

export function Grid24({ items }: GridProps) {
  return (
    <div className="ds-ads-grid24" aria-label="24-column grid">
      {items.map((item) => (
        <div key={item.id} className="ds-ads-grid24__cell" style={{ gridColumn: `span ${Math.max(1, Math.min(item.span, 24))}` }}>
          <span>{item.label}</span>
          <span className="ds-ads-grid24__meta">{item.span}/24</span>
        </div>
      ))}
    </div>
  )
}
