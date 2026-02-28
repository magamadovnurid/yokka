import type { Meta, StoryObj } from '@storybook/react-vite'
import { DesktopWidgets } from '../design-system/marketplace/DesktopWidgets'

const meta = {
  title: 'Market/Desktop Widgets',
  component: DesktopWidgets,
  args: {
    highlights: [
      { id: 'h1', title: 'Просмотры за день', value: '12 840', note: '+18% к вчера' },
      { id: 'h2', title: 'Переходы в чат', value: '219', note: '+6 новых диалогов' },
      { id: 'h3', title: 'Сохранений', value: '84', note: 'В избранном у покупателей' },
    ],
    miniRows: [
      { id: 'r1', title: 'Li Auto L9 2024', price: '4 890 000 ₽', meta: 'Авто · сегодня', status: 'success' },
      { id: 'r2', title: 'MacBook Air M3', price: '139 000 ₽', meta: 'Электроника · 2 часа назад', status: 'warning' },
      { id: 'r3', title: 'Квартира 31 м²', price: '8 300 000 ₽', meta: 'Недвижимость · вчера', status: 'muted' },
    ],
  },
} satisfies Meta<typeof DesktopWidgets>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
