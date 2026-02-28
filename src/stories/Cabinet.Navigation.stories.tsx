import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarNav } from '../design-system/cabinet/SidebarNav'

const items = [
  { id: 'messages', label: 'Сообщения', count: 3 },
  { id: 'listings', label: 'Мои объявления', count: 12 },
  { id: 'orders', label: 'Заказы', count: 4 },
  { id: 'favorites', label: 'Избранное', count: 72 },
  { id: 'wallet', label: 'Кошелёк' },
  { id: 'safety', label: 'Защита профиля' },
  { id: 'settings', label: 'Настройки' },
]

const meta = {
  title: '01-Avito/Cabinet/Navigation',
  component: SidebarNav,
  args: {
    title: 'Личный кабинет',
    activeId: 'listings',
    items,
  },
} satisfies Meta<typeof SidebarNav>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MessagesActive: Story = {
  args: {
    activeId: 'messages',
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="ds-playground">
        <SidebarNav {...args} activeId={activeId} onChange={setActiveId} />
        <p className="ds-playground__meta">
          Активный раздел: <strong>{activeId}</strong>
        </p>
      </div>
    )
  },
}
