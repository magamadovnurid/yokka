import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterBar } from '../design-system/marketplace/FilterBar'

const defaultChips = ['Цена до 5 млн', 'Только с фото', 'Проверенный продавец']

const meta = {
  title: '01-Avito/Marketplace/Filter Bar',
  component: FilterBar,
  args: {
    query: 'Li Auto',
    resultCount: 1243,
    chips: defaultChips,
  },
} satisfies Meta<typeof FilterBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [query, setQuery] = useState(args.query)
    const [sort, setSort] = useState('new')
    const [chips, setChips] = useState([...args.chips])

    const reset = () => {
      setQuery('')
      setSort('new')
      setChips(defaultChips)
    }

    const resultCount = Math.max(args.resultCount - chips.length * 90 - (query ? 0 : 220), 17)

    return (
      <div className="ds-playground" style={{ minWidth: 920 }}>
        <FilterBar
          chips={chips}
          onChipRemove={(chip) => setChips((items) => items.filter((item) => item !== chip))}
          onQueryChange={setQuery}
          onReset={reset}
          onSortChange={setSort}
          query={query}
          resultCount={resultCount}
          sort={sort}
        />
        <p className="ds-playground__meta">Снимайте chip-фильтры, меняйте сортировку и вводите запрос: блок полностью интерактивный.</p>
      </div>
    )
  },
}
