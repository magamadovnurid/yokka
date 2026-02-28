import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Segmented } from '../../design-system/ads/general/Segmented'
import { TypographyParagraph, TypographyText, TypographyTitle } from '../../design-system/ads/general/Typography'
import { Badge } from '../../design-system/primitives/Badge'
import { Button } from '../../design-system/primitives/Button'
import { Icon } from '../../design-system/primitives/Icon'
import { Tag } from '../../design-system/primitives/Tag'

const meta = {
  title: '02-ADS/General',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => {
    const [view, setView] = useState('list')

    return (
      <div className="ds-ads-section">
        <div className="ds-ads-panel">
          <TypographyTitle level={2}>General Elements</TypographyTitle>
          <TypographyParagraph>
            Базовый слой элементов: typography, buttons, tags, segmented controls и icon language.
          </TypographyParagraph>
          <div className="ds-row">
            <Button icon={<Icon name="search" size={14} />}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Tag variant="accent">New</Tag>
            <Badge variant="success">Stable</Badge>
          </div>
          <Segmented
            items={[
              { value: 'list', label: 'List' },
              { value: 'board', label: 'Board' },
              { value: 'analytics', label: 'Analytics' },
            ]}
            onChange={setView}
            value={view}
          />
          <TypographyText type="secondary">Current mode: {view}</TypographyText>
        </div>

        <div className="ds-ads-panel">
          <TypographyTitle level={3}>Typography Scale</TypographyTitle>
          <TypographyTitle level={1}>H1 Title</TypographyTitle>
          <TypographyTitle level={3}>H3 Title</TypographyTitle>
          <div className="ds-row">
            <TypographyText>Default text</TypographyText>
            <TypographyText type="success">Success</TypographyText>
            <TypographyText type="warning">Warning</TypographyText>
            <TypographyText type="danger">Danger</TypographyText>
            <TypographyText code>token.colorPrimary</TypographyText>
          </div>
        </div>
      </div>
    )
  },
}
