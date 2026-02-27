import type { Meta, StoryObj } from '@storybook/react-vite'

const palette = [
  { name: 'canvas', variable: '--ui-color-canvas' },
  { name: 'surface', variable: '--ui-color-surface' },
  { name: 'surface-soft', variable: '--ui-color-surface-soft' },
  { name: 'surface-strong', variable: '--ui-color-surface-strong' },
  { name: 'border', variable: '--ui-color-border' },
  { name: 'border-strong', variable: '--ui-color-border-strong' },
  { name: 'text', variable: '--ui-color-text' },
  { name: 'text-muted', variable: '--ui-color-text-muted' },
  { name: 'primary', variable: '--ui-color-primary' },
  { name: 'danger', variable: '--ui-color-danger' },
  { name: 'warning', variable: '--ui-color-warning' },
  { name: 'success', variable: '--ui-color-success' },
]

const spacing = ['--ui-space-1', '--ui-space-2', '--ui-space-3', '--ui-space-4', '--ui-space-5', '--ui-space-6', '--ui-space-8']
const radii = ['--ui-radius-2xs', '--ui-radius-xs', '--ui-radius-sm', '--ui-radius-md', '--ui-radius-lg']

const meta = {
  title: 'Core/Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ColorPalette: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 860 }}>
      <h3 style={{ margin: 0 }}>Color Tokens</h3>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {palette.map((color) => (
          <div key={color.variable} className="ds-card" style={{ gap: 8, padding: 10 }}>
            <div style={{ background: `var(${color.variable})`, border: '1px solid #cfd8d5', borderRadius: 6, height: 54 }} />
            <div style={{ fontSize: 12, fontWeight: 800 }}>{color.name}</div>
            <code style={{ color: '#59706b', fontSize: 11 }}>{color.variable}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SpacingAndRadii: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 640 }}>
      <h3 style={{ margin: 0 }}>Spacing</h3>
      {spacing.map((token) => (
        <div key={token} className="ds-row">
          <code style={{ minWidth: 130 }}>{token}</code>
          <div style={{ background: '#0a6e55', borderRadius: 4, height: 12, width: `var(${token})` }} />
        </div>
      ))}
      <h3 style={{ margin: '8px 0 0' }}>Corner Radius</h3>
      <div className="ds-row">
        {radii.map((token) => (
          <div key={token} className="ds-card" style={{ gap: 8, padding: 10, width: 110 }}>
            <div style={{ background: '#e7efec', border: '1px solid #ced8d4', borderRadius: `var(${token})`, height: 40 }} />
            <code style={{ fontSize: 11 }}>{token}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}
