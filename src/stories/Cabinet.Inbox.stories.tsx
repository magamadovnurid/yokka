import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InboxList } from '../design-system/cabinet/InboxList'

const meta = {
  title: 'Cabinet/Inbox',
  component: InboxList,
  args: {
    activeId: '1',
    items: [
      { id: '1', title: 'Li Auto L9 2024', text: 'Добрый день, авто еще в продаже?', time: '12:34', unread: 2 },
      { id: '2', title: 'MacBook Air M3', text: 'Отправка через доставку возможна', time: '11:10' },
      { id: '3', title: 'Квартира-студия 31 м²', text: 'Можно посмотреть сегодня?', time: 'вчера' },
    ],
  },
} satisfies Meta<typeof InboxList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="ds-playground">
        <InboxList {...args} activeId={activeId} onSelect={setActiveId} />
        <p className="ds-playground__meta">
          Открытый диалог: <strong>{activeId}</strong>
        </p>
      </div>
    )
  },
}
