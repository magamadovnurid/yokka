import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListingStateTabs } from '../design-system/cabinet/ListingStateTabs'

const states = [
  { id: 'action', label: 'Ждут действий', count: 1 },
  { id: 'active', label: 'Активные', count: 2 },
  { id: 'draft', label: 'Черновики', count: 1 },
  { id: 'archive', label: 'Архив', count: 9 },
]

const meta = {
  title: '01-Avito/Cabinet/Listing States',
  component: ListingStateTabs,
  args: {
    activeId: 'action',
    states,
  },
} satisfies Meta<typeof ListingStateTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ActiveTab: Story = {
  args: {
    activeId: 'active',
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState(args.activeId)

    return (
      <div className="ds-playground" style={{ minWidth: 860 }}>
        <ListingStateTabs {...args} activeId={activeId} onChange={setActiveId} />
        <p className="ds-playground__meta">
          Сейчас выбран статус: <strong>{activeId}</strong>
        </p>
      </div>
    )
  },
}
