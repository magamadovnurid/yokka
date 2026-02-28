import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from '../design-system/navigation/Breadcrumbs'
import { Pagination } from '../design-system/navigation/Pagination'
import { Tabs } from '../design-system/navigation/Tabs'

const meta = {
  title: '01-Avito/Foundation/Navigation',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Patterns: Story = {
  render: () => {
    const [tab, setTab] = useState('all')
    const [page, setPage] = useState(2)

    return (
      <div className="ds-stack" style={{ minWidth: 760 }}>
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '#' },
            { label: 'Автомобили', href: '#' },
            { label: 'Li Auto L9 2024' },
          ]}
        />

        <Tabs
          activeId={tab}
          items={[
            { id: 'all', label: 'Все', count: 72 },
            { id: 'auto', label: 'Автомобили', count: 25 },
            { id: 'realty', label: 'Квартиры', count: 7 },
            { id: 'services', label: 'Услуги', count: 4 },
          ]}
          onChange={setTab}
        />

        <Pagination currentPage={page} onChange={setPage} totalPages={5} />
      </div>
    )
  },
}
