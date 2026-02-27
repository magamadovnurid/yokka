import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '../design-system/primitives/Avatar'
import { Badge } from '../design-system/primitives/Badge'
import { Button } from '../design-system/primitives/Button'
import { Card } from '../design-system/primitives/Card'
import { Divider } from '../design-system/primitives/Divider'
import { Icon } from '../design-system/primitives/Icon'
import { Input } from '../design-system/primitives/Input'
import { Tag } from '../design-system/primitives/Tag'

const meta = {
  title: 'Core/Primitives',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ButtonsAndInputs: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 760 }}>
      <div className="ds-row">
        <Button variant="primary" icon={<Icon name="search" size={14} />}>
          Найти
        </Button>
        <Button variant="secondary">Сохранить</Button>
        <Button variant="ghost">Подробнее</Button>
        <Button variant="danger">Удалить</Button>
      </div>
      <Input label="Поиск" hint="Пример: iPhone 15 Pro" placeholder="Введите запрос" startAdornment={<Icon name="search" size={14} />} />
    </div>
  ),
}

export const TagsBadgesAvatars: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 640 }}>
      <div className="ds-row">
        <Tag>neutral</Tag>
        <Tag variant="success">verified</Tag>
        <Tag variant="warning">warning</Tag>
        <Tag variant="info">info</Tag>
        <Tag variant="accent">accent</Tag>
      </div>
      <div className="ds-row">
        <Badge>Система</Badge>
        <Badge variant="accent">Непрочитано</Badge>
        <Badge variant="success">Доставка</Badge>
      </div>
      <div className="ds-row">
        <Avatar name="Пользователь" online />
        <Avatar name="Автоцентр Восток" size="lg" />
      </div>
      <Divider label="surface" />
      <Card title="Базовая карточка" subtitle="Универсальная surface-рамка">
        <p style={{ color: 'var(--ui-color-text-muted)', margin: 0 }}>Используется в листингах, inbox, уведомлениях и настройках профиля.</p>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [favorite, setFavorite] = useState(false)
    const [query, setQuery] = useState('Ноутбук')
    const [views, setViews] = useState(12)

    return (
      <div className="ds-playground">
        <div className="ds-row">
          <Button
            icon={<Icon name="heart" size={14} />}
            onClick={() => setFavorite((value) => !value)}
            variant={favorite ? 'danger' : 'secondary'}
          >
            {favorite ? 'В избранном' : 'Добавить в избранное'}
          </Button>
          <Button icon={<Icon name="message" size={14} />} onClick={() => setViews((value) => value + 1)}>
            Увеличить просмотры
          </Button>
        </div>

        <Input label="Поисковый запрос" onChange={(event) => setQuery(event.target.value)} value={query} />

        <Card title="Live Preview" subtitle="Кликайте по элементам и проверяйте состояния">
          <p className="ds-playground__meta">
            Запрос: <strong>{query || '—'}</strong> · Просмотры: <strong>{views}</strong>
          </p>
        </Card>
      </div>
    )
  },
}
