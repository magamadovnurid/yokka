import { Avatar } from '../primitives/Avatar'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { Icon } from '../primitives/Icon'
import { Tag } from '../primitives/Tag'

export interface SellerTrustProps {
  sellerName: string
  rating: string
  reviewCount: number
  responseTime: string
  badges: string[]
}

export function SellerTrust({ badges, rating, responseTime, reviewCount, sellerName }: SellerTrustProps) {
  return (
    <Card title="Продавец" subtitle="Блок доверия карточки объявления">
      <div className="ds-market-trust">
        <div className="ds-market-trust__seller">
          <Avatar name={sellerName} online />
          <div className="ds-stack" style={{ gap: '4px' }}>
            <p className="ds-market-trust__name">{sellerName}</p>
            <p className="ds-market-trust__rating">
              ⭐ {rating} · {reviewCount} отзывов
            </p>
          </div>
        </div>

        <div className="ds-market-trust__badges">
          {badges.map((badge) => (
            <Tag key={badge} variant="success">
              {badge}
            </Tag>
          ))}
        </div>

        <Tag variant="info">Отвечает за {responseTime}</Tag>
        <Button variant="secondary" icon={<Icon name="message" size={14} />}>
          Написать сообщение
        </Button>
      </div>
    </Card>
  )
}
