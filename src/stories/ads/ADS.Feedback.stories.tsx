import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressLine } from '../../design-system/ads/feedback/Progress'
import { Result } from '../../design-system/ads/feedback/Result'
import { Alert } from '../../design-system/feedback/Alert'
import { EmptyState } from '../../design-system/feedback/EmptyState'
import { Toast } from '../../design-system/feedback/Toast'
import { Button } from '../../design-system/primitives/Button'

const meta = {
  title: '02-ADS/Feedback',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const SystemStates: Story = {
  render: () => {
    const [percent, setPercent] = useState(42)
    const [showToast, setShowToast] = useState(false)

    const increase = () => {
      setPercent((value) => (value >= 100 ? 0 : value + 14))
      setShowToast(true)
      window.setTimeout(() => setShowToast(false), 1200)
    }

    return (
      <div className="ds-ads-section">
        <div className="ds-ads-grid">
          <div className="ds-ads-panel">
            <Alert title="Moderation" description="Listing was sent for review" variant="info" />
            <ProgressLine percent={percent} status={percent === 100 ? 'success' : 'normal'} />
            <Button onClick={increase} type="button" variant="secondary">
              Update status
            </Button>
            {showToast ? <Toast title="Updated" message="Progress value has been changed" /> : null}
          </div>

          <div className="ds-ads-panel">
            <Result
              status="success"
              subtitle="All required fields are valid and ready for publishing."
              title="Validation passed"
              extra={<Button size="sm">Publish now</Button>}
            />
          </div>
        </div>

        <div className="ds-ads-panel">
          <EmptyState title="No notifications" description="You are all caught up. New events will appear here." actionText="Refresh" />
        </div>
      </div>
    )
  },
}
