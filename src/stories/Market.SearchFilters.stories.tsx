import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchPanel } from '../design-system/marketplace/SearchPanel'

const meta = {
  title: '01-Avito/Marketplace/Search & Filters',
  component: SearchPanel,
  args: {
    title: 'Найдите товар или услугу',
    subtitle: 'Базовая связка поиска + гео + chip-фильтров для выдачи',
    popularFilters: ['Новые', 'С доставкой', 'Проверенные', 'Без посредников'],
  },
} satisfies Meta<typeof SearchPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('Москва')
    const [chips, setChips] = useState([...args.popularFilters])
    const [lastSearch, setLastSearch] = useState('Пока не выполнен')

    return (
      <div className="ds-playground" style={{ minWidth: 820 }}>
        <SearchPanel
          {...args}
          location={location}
          onFilterClick={(filter) => setChips((items) => items.filter((item) => item !== filter))}
          onLocationChange={setLocation}
          onQueryChange={setQuery}
          onSearch={() => setLastSearch(`"${query || 'все'}" в городе ${location || 'любой'}`)}
          popularFilters={chips}
          query={query}
        />
        <p className="ds-playground__meta">
          Последний поиск: <strong>{lastSearch}</strong>. Клик по chip удаляет его из набора.
        </p>
      </div>
    )
  },
}
