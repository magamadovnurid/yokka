interface SkeletonProps {
  lines?: number
}

export function Skeleton({ lines = 4 }: SkeletonProps) {
  return (
    <div className="ds-skeleton" aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} className="ds-skeleton__line" style={{ width: `${96 - index * 9}%` }} />
      ))}
    </div>
  )
}
