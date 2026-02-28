import type { Meta, StoryObj } from '@storybook/react-vite'

const inventory = [
  {
    standard: '01-Avito',
    domain: 'Foundation',
    elements: ['Color tokens', 'Spacing/radius/shadows', 'Icons', 'Buttons', 'Inputs', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Tag', 'Badge', 'Avatar', 'Card', 'Divider'],
  },
  {
    standard: '01-Avito',
    domain: 'Marketplace',
    elements: ['Search panel', 'Filter bar', 'Listing card', 'Seller trust'],
  },
  {
    standard: '01-Avito',
    domain: 'Cabinet',
    elements: ['Sidebar nav', 'Inbox list', 'Chat thread', 'Notifications', 'Listing states'],
  },
  {
    standard: '02-ADS',
    domain: 'General',
    elements: ['Typography', 'Segmented', 'Buttons', 'Tags/Badges'],
  },
  {
    standard: '02-ADS',
    domain: 'Layout',
    elements: ['24-grid', 'Containers', 'Panels', 'Divider'],
  },
  {
    standard: '02-ADS',
    domain: 'Navigation',
    elements: ['Menu', 'Breadcrumbs', 'Tabs', 'Pagination', 'Steps'],
  },
  {
    standard: '02-ADS',
    domain: 'Data Entry',
    elements: ['Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Slider', 'Rate'],
  },
  {
    standard: '02-ADS',
    domain: 'Data Display',
    elements: ['Table', 'Collapse', 'Avatar', 'Badge', 'Tag'],
  },
  {
    standard: '02-ADS',
    domain: 'Feedback',
    elements: ['Alert', 'Progress', 'Result', 'Toast', 'Empty'],
  },
  {
    standard: '02-ADS',
    domain: 'Other',
    elements: ['Timeline', 'Skeleton'],
  },
]

const meta = {
  title: '99-Meta/UI Inventory',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const CoverageMatrix: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 900 }}>
      <h3 style={{ margin: 0 }}>Inventory Coverage (Avito + ADS)</h3>
      <p style={{ color: 'var(--ui-color-text-muted)', margin: 0 }}>
        Матрица разделена по двум стандартам: текущий Avito-подобный UI и отдельный перспективный ADS-слой по категориям Ant Design.
      </p>
      <div className="ds-card" style={{ padding: 0 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: 'var(--ui-color-surface-strong)' }}>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Standard</th>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Domain</th>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Elements</th>
              <th style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, textAlign: 'left' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((group) => (
              <tr key={`${group.standard}-${group.domain}`}>
                <td style={{ borderBottom: '1px solid var(--ui-color-border)', padding: 10, verticalAlign: 'top' }}>
                  <strong>{group.standard}</strong>
                </td>
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
