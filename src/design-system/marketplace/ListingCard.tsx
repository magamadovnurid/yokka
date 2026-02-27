import { Button } from '../primitives/Button'
import { Icon } from '../primitives/Icon'
import { Tag } from '../primitives/Tag'

export interface ListingCardProps {
  title: string
  price: string
  meta: string
  status: string
  favorite?: boolean
  onToggleFavorite?: () => void
  onMessageClick?: () => void
}

export function ListingCard({ favorite = false, meta, onMessageClick, onToggleFavorite, price, status, title }: ListingCardProps) {
  return (
    <article className="ds-market-listing">
      <div className="ds-market-listing__preview">
        <Tag variant="accent">{status}</Tag>
        <button
          aria-label={`Сохранить ${title}`}
          aria-pressed={favorite}
          className={`ds-btn ds-btn--ghost ds-btn--sm ${favorite ? 'ds-market-listing__favorite--active' : ''}`}
          onClick={onToggleFavorite}
          type="button"
        >
          <Icon name="heart" size={14} />
        </button>
      </div>

      <div className="ds-market-listing__body">
        <p className="ds-market-listing__price">{price}</p>
        <h3 className="ds-market-listing__title">{title}</h3>
        <p className="ds-market-listing__meta">{meta}</p>
        <Button icon={<Icon name="message" size={14} />} onClick={onMessageClick} size="sm" variant="secondary">
          Написать продавцу
        </Button>
      </div>
    </article>
  )
}
