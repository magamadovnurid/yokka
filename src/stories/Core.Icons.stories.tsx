import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, type IconName } from '../design-system/primitives/Icon'

const names: IconName[] = [
  'search',
  'location',
  'message',
  'heart',
  'bell',
  'user',
  'check',
  'warning',
  'info',
  'error',
  'chevron-left',
  'chevron-right',
  'chevron-down',
  'settings',
  'wallet',
  'box',
  'filter',
  'home',
  'grid',
  'chat',
]

const meta = {
  title: '01-Avito/Foundation/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Library: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', minWidth: 720 }}>
      {names.map((name) => (
        <div key={name} className="ds-card" style={{ alignItems: 'center', gap: 6, padding: 10 }}>
          <Icon name={name} size={18} />
          <code style={{ fontSize: 11 }}>{name}</code>
        </div>
      ))}
    </div>
  ),
}
