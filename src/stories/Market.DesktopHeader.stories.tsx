import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DesktopHeader } from '../design-system/marketplace/DesktopHeader'

const meta = {
  title: 'Market/Desktop Header',
  component: DesktopHeader,
  args: {
    city: 'Москва',
    query: '',
    userName: 'Пользователь',
    actions: [
      { id: 'favorites', label: 'Избранное', icon: 'heart', count: 8 },
      { id: 'messages', label: 'Сообщения', icon: 'message', count: 3 },
      { id: 'alerts', label: 'Уведомления', icon: 'bell', count: 2 },
    ],
  },
} satisfies Meta<typeof DesktopHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [query, setQuery] = useState(args.query)
    const [city, setCity] = useState(args.city)

    return (
      <div className="ds-playground" style={{ minWidth: 980 }}>
        <DesktopHeader
          {...args}
          city={city}
          onAction={(actionId) => {
            if (actionId === 'alerts') {
              setCity((current) => (current === 'Москва' ? 'Санкт-Петербург' : 'Москва'))
            }
          }}
          onCityClick={() => setCity((current) => (current === 'Москва' ? 'Казань' : 'Москва'))}
          onQueryChange={setQuery}
          query={query}
        />
      </div>
    )
  },
}
