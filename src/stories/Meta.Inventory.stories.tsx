import type { Meta, StoryObj } from '@storybook/react-vite'

const inventory = [
  {
    domain: 'Core',
    elements: ['Color tokens', 'Spacing/radius/shadows', 'Icons', 'Buttons', 'Inputs', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Tag', 'Badge', 'Avatar', 'Card', 'Divider'],
  },
  {
    domain: 'Navigation',
    elements: ['Breadcrumbs', 'Tabs', 'Pagination', 'State tabs'],
  },
  {
    domain: 'Feedback',
    elements: ['Alert', 'Empty state', 'Skeleton', 'Toast'],
  },
  {
    domain: 'Marketplace',
    elements: ['Search panel', 'Filter bar', 'Listing card', 'Seller trust'],
  },
  {
    domain: 'Cabinet',
    elements: ['Sidebar nav', 'Inbox list', 'Chat thread', 'Notifications', 'Listing states'],
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
      <h3 style={{ margin: 0 }}>Inventory Coverage (v1 expanded)</h3>
      <p style={{ color: 'var(--ui-color-text-muted)', margin: 0 }}>
        Матрица компонентов для приближения по полноте к marketplace-паттернам уровня Avito. Включены базовые UI-объекты,
        кабинетные сценарии и ключевые объекты выдачи/сделки.
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
