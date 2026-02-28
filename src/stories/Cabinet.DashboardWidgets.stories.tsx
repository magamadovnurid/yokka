import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardWidgets } from '../design-system/cabinet/DashboardWidgets'

const meta = {
  title: 'Cabinet/Dashboard Widgets',
  component: DashboardWidgets,
  args: {
    balance: '128 450 ₽',
    hold: '23 400 ₽',
    kpis: [
      { id: 'k1', label: 'Активные объявления', value: '12', delta: '+2 за неделю' },
      { id: 'k2', label: 'Новые сообщения', value: '9', delta: '+3 сегодня' },
      { id: 'k3', label: 'Оформленные сделки', value: '4', delta: '+1 за 24 ч' },
    ],
    actions: [
      { id: 'new-listing', label: 'Разместить объявление' },
      { id: 'promote', label: 'Продвинуть объявления' },
      { id: 'reports', label: 'Открыть отчёты' },
    ],
  },
} satisfies Meta<typeof DashboardWidgets>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [balance, setBalance] = useState(args.balance)

    return (
      <div className="ds-playground" style={{ minWidth: 920 }}>
        <DashboardWidgets
          {...args}
          balance={balance}
          onAction={(id) => {
            if (id === 'new-listing') {
              setBalance((current) => {
                const amount = Number(current.replace(/[^\d]/g, ''))
                return `${(amount + 5000).toLocaleString('ru-RU')} ₽`
              })
            }
          }}
        />
      </div>
    )
  },
}
