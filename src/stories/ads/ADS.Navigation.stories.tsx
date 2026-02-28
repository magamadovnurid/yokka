import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavMenu } from '../../design-system/ads/navigation/Menu'
import { StepsLine } from '../../design-system/ads/navigation/Steps'
import { Breadcrumbs } from '../../design-system/navigation/Breadcrumbs'
import { Pagination } from '../../design-system/navigation/Pagination'
import { Tabs } from '../../design-system/navigation/Tabs'

const meta = {
  title: '02-ADS/Navigation',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const FullNavigationSet: Story = {
  render: () => {
    const [activeMenu, setActiveMenu] = useState('dashboard')
    const [activeTab, setActiveTab] = useState('all')
    const [page, setPage] = useState(1)

    return (
      <div className="ds-ads-section">
        <div className="ds-ads-panel">
          <Breadcrumbs
            items={[
              { label: 'Design System', href: '#' },
              { label: 'ADS', href: '#' },
              { label: 'Navigation' },
            ]}
          />
          <Tabs
            activeId={activeTab}
            items={[
              { id: 'all', label: 'All', count: 48 },
              { id: 'draft', label: 'Draft', count: 10 },
              { id: 'published', label: 'Published', count: 33 },
            ]}
            onChange={setActiveTab}
          />
          <Pagination currentPage={page} onChange={setPage} totalPages={8} />
        </div>

        <div className="ds-ads-grid">
          <div className="ds-ads-panel">
            <h3 style={{ margin: 0 }}>Menu</h3>
            <NavMenu
              activeId={activeMenu}
              items={[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'catalog', label: 'Catalog', count: 24 },
                { id: 'orders', label: 'Orders', count: 3 },
                { id: 'settings', label: 'Settings' },
              ]}
              onChange={setActiveMenu}
            />
          </div>

          <div className="ds-ads-panel">
            <h3 style={{ margin: 0 }}>Steps</h3>
            <StepsLine
              items={[
                { id: '1', label: 'Create listing', description: 'Fill title and category', status: 'finish' },
                { id: '2', label: 'Upload media', description: 'Photo/video assets', status: 'process' },
                { id: '3', label: 'Publish', description: 'Review and go live', status: 'wait' },
              ]}
            />
          </div>
        </div>
      </div>
    )
  },
}
