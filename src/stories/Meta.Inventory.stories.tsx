import type { Meta, StoryObj } from '@storybook/react-vite'

const inventory = [
  {
    domain: 'Core Foundation',
    elements: [
      'Color tokens',
      'Spacing/radius/shadows',
      'Icons',
      'Buttons',
      'Inputs',
      'Select',
      'Textarea',
      'Checkbox',
      'Radio',
      'Switch',
      'Tag',
      'Badge',
      'Avatar',
      'Card',
      'Divider',
    ],
  },
  {
    domain: 'Core Extensions',
    elements: [
      'Indicators',
      'Mini progress',
      'Surface toolbar',
      'Surface blocks',
      'Dropdown menu',
      'Context menu',
      'Action menu',
      'Popover',
      'Tooltip',
      'Rich tooltip',
      'Modal',
      'Drawer',
      'Range slider',
      'Price range',
    ],
  },
  {
    domain: 'Marketplace Base',
    elements: ['Search panel', 'Filter bar', 'Listing card', 'Seller trust'],
  },
  {
    domain: 'Marketplace Desktop',
    elements: ['Desktop header', 'Category strip', 'Widget highlights', 'Compact listing rows', 'Media gallery', 'Lightbox preview'],
  },
  {
    domain: 'Cabinet Base',
    elements: ['Sidebar nav', 'Inbox list', 'Chat thread', 'Notifications', 'Listing states'],
  },
  {
    domain: 'Cabinet Desktop',
    elements: ['Balance card', 'KPI widgets', 'Quick actions', 'Profile completion', 'Trust checklist'],
  },
]

const meta = {
  title: 'Meta/UI Inventory',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const CoverageMatrix: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 900 }}>
      <h3 style={{ margin: 0 }}>Inventory Coverage (Avito Desktop Expanded)</h3>
      <p style={{ color: 'var(--ui-color-text-muted)', margin: 0 }}>
        Расширенная Avito-карта компонентов: базовые элементы + desktop-микроэлементы + P0 категории (menus, overlays, controls, media).
      </p>
      <div className="ds-card" style={{ padding: 0 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: 'var(--ui-color-surface-strong)' }}>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Domain</th>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Elements</th>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((group) => (
              <tr key={group.domain}>
                <td style={{ borderBottom: '1px solid var(--ui-color-border)', fontWeight: 800, padding: 10, verticalAlign: 'top' }}>{group.domain}</td>
                <td style={{ borderBottom: '1px solid var(--ui-color-border)', color: 'var(--ui-color-text-muted)', fontSize: 13, padding: 10 }}>
                  {group.elements.join(' · ')}
                </td>
                <td style={{ borderBottom: '1px solid var(--ui-color-border)', fontWeight: 700, padding: 10 }}>{group.elements.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}
