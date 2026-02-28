import { Avatar } from '../primitives/Avatar'
import { Badge } from '../primitives/Badge'

interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface ProfileBlocksProps {
  userName: string
  rating: string
  completion: number
  checklist: ChecklistItem[]
}

export function ProfileBlocks({ checklist, completion, rating, userName }: ProfileBlocksProps) {
  const safeCompletion = Math.max(0, Math.min(completion, 100))

  return (
    <section className="ds-cabinet-profile-blocks" aria-label="Profile blocks">
      <article className="ds-cabinet-profile-card">
        <div className="ds-cabinet-profile-card__header">
          <Avatar name={userName} size="lg" online />
          <div>
            <p className="ds-cabinet-profile-card__name">{userName}</p>
            <p className="ds-cabinet-profile-card__meta">Рейтинг: {rating}</p>
          </div>
          <Badge variant="success">Профиль проверен</Badge>
        </div>

        <div className="ds-cabinet-profile-card__progress">
          <p className="ds-cabinet-profile-card__meta">Заполнение профиля</p>
          <div className="ds-cabinet-profile-card__track">
            <span className="ds-cabinet-profile-card__bar" style={{ width: `${safeCompletion}%` }} />
          </div>
          <p className="ds-cabinet-profile-card__meta">{safeCompletion}%</p>
        </div>
      </article>

      <article className="ds-cabinet-checklist">
        <p className="ds-cabinet-checklist__title">Чек-лист доверия</p>
        {checklist.map((item) => (
          <div key={item.id} className="ds-cabinet-checklist__item">
            <span className={`ds-cabinet-checklist__marker ${item.done ? 'ds-cabinet-checklist__marker--done' : ''}`}>
              {item.done ? '✓' : '•'}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </article>
    </section>
  )
}
