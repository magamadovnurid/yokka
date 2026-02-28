import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProfileBlocks } from '../design-system/cabinet/ProfileBlocks'

const checklist = [
  { id: 'c1', label: 'Подтверждён телефон', done: true },
  { id: 'c2', label: 'Загружены документы', done: true },
  { id: 'c3', label: 'Заполнено описание профиля', done: false },
  { id: 'c4', label: 'Добавлен второй контакт', done: false },
]

const meta = {
  title: 'Cabinet/Profile Blocks',
  component: ProfileBlocks,
  args: {
    userName: 'Пользователь',
    rating: '5.0',
    completion: 62,
    checklist,
  },
} satisfies Meta<typeof ProfileBlocks>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [completion, setCompletion] = useState(args.completion)

    return (
      <div className="ds-playground" style={{ minWidth: 860 }}>
        <ProfileBlocks
          {...args}
          completion={completion}
          checklist={args.checklist.map((item, index) => ({
            ...item,
            done: index < Math.floor(completion / 25),
          }))}
        />

        <div className="ds-row">
          <button className="ds-btn ds-btn--secondary ds-btn--sm" onClick={() => setCompletion((value) => Math.min(100, value + 13))} type="button">
            Повысить заполнение
          </button>
          <button className="ds-btn ds-btn--ghost ds-btn--sm" onClick={() => setCompletion((value) => Math.max(0, value - 13))} type="button">
            Уменьшить
          </button>
        </div>
      </div>
    )
  },
}
