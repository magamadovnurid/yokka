import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationList, type NotificationItem } from '../design-system/cabinet/NotificationList'

const meta = {
  title: 'Cabinet/Notifications',
  component: NotificationList,
  args: {
    items: [
      { id: 'n1', title: 'Объявление прошло проверку', text: 'Li Auto L9 опубликовано в поиске', time: 'Сегодня, 10:04', type: 'system', unread: true },
      { id: 'n2', title: 'Новый отклик в чате', text: 'Покупатель написал по вашему объявлению', time: 'Сегодня, 09:52', type: 'message' },
      { id: 'n3', title: 'Заказ оформлен', text: 'Товар перешёл в статус «Ожидает отправки»', time: 'Вчера, 22:11', type: 'order' },
    ],
  },
} satisfies Meta<typeof NotificationList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [items, setItems] = useState<NotificationItem[]>([...args.items])

    return (
      <div className="ds-playground">
        <NotificationList
          items={items}
          onItemClick={(clicked) => {
            setItems((current) =>
              current.map((item) =>
                item.id === clicked.id
                  ? {
                      ...item,
                      unread: false,
                    }
                  : item,
              ),
            )
          }}
        />
        <p className="ds-playground__meta">Клик по уведомлению помечает его как прочитанное.</p>
      </div>
    )
  },
}
