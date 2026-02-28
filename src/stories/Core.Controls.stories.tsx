import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriceRange, RangeSlider } from '../design-system/controls/RangeSlider'

const meta = {
  title: 'Core/Controls',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const RangeAndPrice: Story = {
  render: () => {
    const [radius, setRadius] = useState(25)
    const [price, setPrice] = useState({ minValue: 120_000, maxValue: 420_000 })

    return (
      <div className="ds-stack" style={{ minWidth: 860 }}>
        <RangeSlider label="Радиус доставки (км)" max={100} min={0} onChange={setRadius} value={radius} />

        <PriceRange
          maxLimit={1_000_000}
          maxValue={price.maxValue}
          minLimit={0}
          minValue={price.minValue}
          onChange={setPrice}
        />

        <p className="ds-playground__meta">
          Выбрано: <strong>{price.minValue.toLocaleString('ru-RU')} ₽</strong> —{' '}
          <strong>{price.maxValue.toLocaleString('ru-RU')} ₽</strong>, радиус <strong>{radius} км</strong>
        </p>
      </div>
    )
  },
}
