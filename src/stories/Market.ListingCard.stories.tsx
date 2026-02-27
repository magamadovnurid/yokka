import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListingCard } from '../design-system/marketplace/ListingCard'

const meta = {
  title: 'Market/Listing Card',
  component: ListingCard,
  args: {
    title: 'Li Auto L9 1.5 AT, 2024',
    price: '4 890 000 ₽',
    meta: 'Аргун · сегодня',
    status: 'Проверено',
  },
} satisfies Meta<typeof ListingCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DeliveryEnabled: Story = {
  args: {
    status: 'Есть доставка',
    title: 'MacBook Air M3 16/512',
    price: '139 000 ₽',
    meta: 'Москва · 2 часа назад',
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [favorite, setFavorite] = useState(false)
    const [messages, setMessages] = useState(0)

    return (
      <div className="ds-playground">
        <ListingCard
          {...args}
          favorite={favorite}
          onMessageClick={() => setMessages((count) => count + 1)}
          onToggleFavorite={() => setFavorite((value) => !value)}
        />
        <p className="ds-playground__meta">
          Избранное: <strong>{favorite ? 'да' : 'нет'}</strong> · Клики «Написать продавцу»: <strong>{messages}</strong>
        </p>
      </div>
    )
  },
}
