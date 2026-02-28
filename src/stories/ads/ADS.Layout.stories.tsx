import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid24 } from '../../design-system/ads/layout/Grid'
import { Card } from '../../design-system/primitives/Card'
import { Divider } from '../../design-system/primitives/Divider'

const meta = {
  title: '02-ADS/Layout',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const GridAndSurfaces: Story = {
  render: () => (
    <div className="ds-ads-section">
      <Card title="24-Column Grid" subtitle="Базовый layout-контур для страницы">
        <Grid24
          items={[
            { id: 'a', label: 'Header', span: 24 },
            { id: 'b', label: 'Sidebar', span: 6 },
            { id: 'c', label: 'Content', span: 18 },
            { id: 'd', label: 'Filters', span: 8 },
            { id: 'e', label: 'Cards', span: 8 },
            { id: 'f', label: 'Stats', span: 8 },
          ]}
        />
      </Card>

      <div className="ds-ads-grid">
        <Card title="Container" subtitle="Primary surface with border">
          <p className="ds-playground__meta">Используем как page block/container.</p>
          <Divider label="section" />
          <p className="ds-playground__meta">Padding / radius / border — токенизированы.</p>
        </Card>
        <Card title="Nested Area" subtitle="Secondary surface">
          <div className="ds-ads-panel" style={{ padding: 12 }}>
            <p className="ds-playground__meta">Вложенный слой для grouping элементов.</p>
          </div>
        </Card>
      </div>
    </div>
  ),
}
