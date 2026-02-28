import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapse } from '../../design-system/ads/data-display/Collapse'
import { DataTable } from '../../design-system/ads/data-display/Table'
import { Avatar } from '../../design-system/primitives/Avatar'
import { Badge } from '../../design-system/primitives/Badge'
import { Tag } from '../../design-system/primitives/Tag'

const meta = {
  title: '02-ADS/Data Display',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TablesListsAndPanels: Story = {
  render: () => {
    const [open, setOpen] = useState('rules')

    return (
      <div className="ds-ads-section">
        <div className="ds-ads-panel">
          <DataTable
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'status', title: 'Status' },
              { key: 'price', title: 'Price' },
            ]}
            rows={[
              { id: '1', name: 'MacBook Air M3', status: 'Published', price: '139 000 ₽' },
              { id: '2', name: 'iPhone 15 Pro', status: 'Draft', price: '82 000 ₽' },
              { id: '3', name: 'Sony A7 IV', status: 'Archived', price: '149 000 ₽' },
            ]}
          />
        </div>

        <div className="ds-ads-grid">
          <div className="ds-ads-panel">
            <h3 style={{ margin: 0 }}>Collapse / Accordion</h3>
            <Collapse
              items={[
                { id: 'rules', label: 'Publishing rules', content: 'Follow moderation policy and category requirements.' },
                { id: 'limits', label: 'Limits', content: 'Paid plans increase publication limits and media slots.' },
                { id: 'fees', label: 'Fees', content: 'Commission applies only to completed secure deals.' },
              ]}
              onToggle={setOpen}
              openId={open}
            />
          </div>

          <div className="ds-ads-panel">
            <h3 style={{ margin: 0 }}>Badges / Avatars / Tags</h3>
            <div className="ds-row">
              <Avatar name="Yokka Seller" online />
              <Badge variant="accent">Verified</Badge>
              <Badge variant="success">Top rated</Badge>
              <Tag variant="info">Escrow</Tag>
              <Tag variant="warning">Limited offer</Tag>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
