import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from '../../design-system/ads/other/Timeline'
import { Skeleton } from '../../design-system/feedback/Skeleton'

const meta = {
  title: '02-ADS/Other',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const MiscElements: Story = {
  render: () => (
    <div className="ds-ads-section">
      <div className="ds-ads-grid">
        <div className="ds-ads-panel">
          <h3 style={{ margin: 0 }}>Timeline</h3>
          <Timeline
            items={[
              { id: '1', title: 'Draft created', time: '09:11', text: 'Author started filling the listing', tone: 'neutral' },
              { id: '2', title: 'Moderation passed', time: '10:40', text: 'Content is approved and visible', tone: 'success' },
              { id: '3', title: 'Price updated', time: '12:03', text: 'Seller changed the listed price', tone: 'warning' },
            ]}
          />
        </div>

        <div className="ds-ads-panel">
          <h3 style={{ margin: 0 }}>Skeleton placeholders</h3>
          <Skeleton lines={6} />
        </div>
      </div>
    </div>
  ),
}
