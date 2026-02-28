import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CategoryStrip } from '../design-system/marketplace/CategoryStrip'

const categories = [
  { id: 'all', label: 'Все категории', count: 3260 },
  { id: 'auto', label: 'Авто', count: 340 },
  { id: 'realty', label: 'Недвижимость', count: 151 },
  { id: 'services', label: 'Услуги', count: 84 },
  { id: 'electronics', label: 'Электроника', count: 623 },
  { id: 'kids', label: 'Детям', count: 46 },
]

const meta = {
  title: 'Market/Category Strip',
  component: CategoryStrip,
  args: {
    items: categories,
    activeId: 'all',
  },
} satisfies Meta<typeof CategoryStrip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="ds-playground" style={{ minWidth: 980 }}>
        <CategoryStrip {...args} activeId={activeId} onChange={setActiveId} />
      </div>
    )
  },
}
