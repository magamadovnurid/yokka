import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../design-system/primitives/Checkbox'
import { Input } from '../design-system/primitives/Input'
import { RadioGroup } from '../design-system/primitives/RadioGroup'
import { Select } from '../design-system/primitives/Select'
import { Switch } from '../design-system/primitives/Switch'
import { Textarea } from '../design-system/primitives/Textarea'

const meta = {
  title: '01-Avito/Foundation/Forms',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Fields: Story = {
  render: () => {
    const [channel, setChannel] = useState('chat')
    const [enabled, setEnabled] = useState(true)

    return (
      <div className="ds-stack" style={{ minWidth: 700 }}>
        <Input label="Название объявления" placeholder="Li Auto L9 2024" />
        <Select
          label="Категория"
          options={[
            { value: 'auto', label: 'Автомобили' },
            { value: 'realty', label: 'Недвижимость' },
            { value: 'services', label: 'Услуги' },
          ]}
        />
        <Textarea label="Описание" placeholder="Опишите состояние, комплектацию, историю обслуживания..." />

        <div className="ds-row" style={{ alignItems: 'flex-start' }}>
          <Checkbox label="Доступна доставка" description="Показывать в поиске с фильтром " defaultChecked />
          <Switch checked={enabled} label="Публиковать автоматически" onChange={setEnabled} />
        </div>

        <RadioGroup
          label="Предпочтительный канал связи"
          name="channel"
          onChange={setChannel}
          options={[
            { value: 'chat', label: 'Чат', description: 'Покупатели пишут в мессенджер' },
            { value: 'phone', label: 'Звонки', description: 'Показывать кнопку звонка' },
          ]}
          value={channel}
        />
      </div>
    )
  },
}
