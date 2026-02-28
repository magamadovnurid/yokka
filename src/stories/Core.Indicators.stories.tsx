import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../design-system/primitives/Badge'
import { StatusDot } from '../design-system/primitives/StatusDot'
import { Tag } from '../design-system/primitives/Tag'
import { Button } from '../design-system/primitives/Button'

const meta = {
  title: 'Core/Indicators',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const StatusAndCounters: Story = {
  render: () => {
    const [progress, setProgress] = useState(36)

    const next = () => {
      setProgress((value) => (value >= 100 ? 8 : value + 16))
    }

    return (
      <div className="ds-playground" style={{ minWidth: 760 }}>
        <div className="ds-surface-block">
          <div className="ds-row">
            <StatusDot label="В сети" tone="success" />
            <StatusDot label="Модерация" tone="info" />
            <StatusDot label="Ожидает действия" tone="warning" />
            <StatusDot label="Приостановлено" tone="danger" />
            <StatusDot label="Черновик" tone="muted" />
          </div>

          <div className="ds-row">
            <Badge variant="accent">12</Badge>
            <Badge variant="success">Доставок: 4</Badge>
            <Badge variant="warning">1 спор</Badge>
            <Tag variant="info">Escrow</Tag>
            <Tag variant="accent">Pro seller</Tag>
          </div>
        </div>

        <div className="ds-surface-block">
          <div className="ds-row" style={{ justifyContent: 'space-between' }}>
            <p className="ds-playground__meta">Прогресс заполнения карточки</p>
            <Button onClick={next} size="sm" variant="secondary">
              Обновить
            </Button>
          </div>
          <div className="ds-mini-progress">
            <span className="ds-mini-progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="ds-playground__meta">{progress}%</p>
        </div>
      </div>
    )
  },
}
