import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rate } from '../../design-system/ads/data-entry/Rate'
import { Slider } from '../../design-system/ads/data-entry/Slider'
import { Checkbox } from '../../design-system/primitives/Checkbox'
import { Input } from '../../design-system/primitives/Input'
import { RadioGroup } from '../../design-system/primitives/RadioGroup'
import { Select } from '../../design-system/primitives/Select'
import { Switch } from '../../design-system/primitives/Switch'
import { Textarea } from '../../design-system/primitives/Textarea'

const meta = {
  title: '02-ADS/Data Entry',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const FormControls: Story = {
  render: () => {
    const [quality, setQuality] = useState(70)
    const [rating, setRating] = useState(4)
    const [channel, setChannel] = useState('chat')
    const [autoPublish, setAutoPublish] = useState(true)

    return (
      <div className="ds-ads-section">
        <div className="ds-ads-grid">
          <div className="ds-ads-panel">
            <Input label="Title" placeholder="MacBook Air M3" />
            <Select
              label="Category"
              options={[
                { value: 'electronics', label: 'Electronics' },
                { value: 'auto', label: 'Cars' },
                { value: 'services', label: 'Services' },
              ]}
            />
            <Textarea label="Description" placeholder="Listing details..." />
            <Checkbox label="Enable delivery" description="Show in delivery filter" defaultChecked />
            <Switch checked={autoPublish} label="Auto publish" onChange={setAutoPublish} />
          </div>

          <div className="ds-ads-panel">
            <RadioGroup
              label="Preferred channel"
              name="channel"
              onChange={setChannel}
              options={[
                { value: 'chat', label: 'Chat', description: 'Text messages' },
                { value: 'phone', label: 'Phone', description: 'Call requests' },
              ]}
              value={channel}
            />
            <label className="ds-input-field">
              <span className="ds-input-field__label">Image quality</span>
              <Slider onChange={setQuality} value={quality} />
            </label>
            <label className="ds-input-field">
              <span className="ds-input-field__label">Seller rate</span>
              <Rate onChange={setRating} value={rating} />
            </label>
          </div>
        </div>
      </div>
    )
  },
}
