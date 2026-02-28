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
  { name: 'text-subtle', variable: '--ui-color-text-subtle' },
  { name: 'primary', variable: '--ui-color-primary' },
  { name: 'primary-hover', variable: '--ui-color-primary-hover' },
  { name: 'primary-soft-bg', variable: '--ui-color-primary-soft-bg' },
  { name: 'active-surface', variable: '--ui-color-active-surface' },
  { name: 'danger', variable: '--ui-color-danger' },
  { name: 'warning', variable: '--ui-color-warning' },
  { name: 'success', variable: '--ui-color-success' },
  { name: 'info', variable: '--ui-color-info' },
  { name: 'toast-bg', variable: '--ui-color-toast-bg' },
  { name: 'listing-grad-start', variable: '--ui-color-listing-grad-start' },
  { name: 'listing-grad-end', variable: '--ui-color-listing-grad-end' },
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
            <div
              style={{
                background: `var(${color.variable})`,
                border: '1px solid var(--ui-color-border)',
                borderRadius: 'var(--ui-radius-xs)',
                height: 54,
              }}
            />
            <div style={{ fontSize: 12, fontWeight: 800 }}>{color.name}</div>
            <code style={{ color: 'var(--ui-color-text-subtle)', fontSize: 11 }}>{color.variable}</code>
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
          <div
            style={{
              background: 'var(--ui-color-primary)',
              borderRadius: 'var(--ui-radius-2xs)',
              height: 12,
              width: `var(${token})`,
            }}
          />
        </div>
      ))}
      <h3 style={{ margin: '8px 0 0' }}>Corner Radius</h3>
      <div className="ds-row">
        {radii.map((token) => (
          <div key={token} className="ds-card" style={{ gap: 8, padding: 10, width: 110 }}>
            <div
              style={{
                background: 'var(--ui-color-progress-track)',
                border: '1px solid var(--ui-color-border)',
                borderRadius: `var(${token})`,
                height: 40,
              }}
            />
            <code style={{ fontSize: 11 }}>{token}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}
