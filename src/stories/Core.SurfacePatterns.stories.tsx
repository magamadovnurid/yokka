import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../design-system/primitives/Button'
import { Icon } from '../design-system/primitives/Icon'
import { Input } from '../design-system/primitives/Input'
import { Tag } from '../design-system/primitives/Tag'
import { Divider } from '../design-system/primitives/Divider'

const meta = {
  title: 'Core/Surface Patterns',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const ToolbarsAndPanels: Story = {
  render: () => (
    <div className="ds-playground" style={{ minWidth: 860 }}>
      <div className="ds-surface-toolbar">
        <div className="ds-surface-toolbar__group">
          <Button icon={<Icon name="filter" size={14} />} size="sm" variant="secondary">
            Фильтры
          </Button>
          <Button size="sm" variant="ghost">
            Массовые действия
          </Button>
        </div>
        <div className="ds-surface-toolbar__group">
          <Tag variant="neutral">24 объявления</Tag>
          <Tag variant="success">5 активных</Tag>
        </div>
      </div>

      <div className="ds-surface-block">
        <Input label="Быстрый поиск" placeholder="ID, название, телефон" startAdornment={<Icon name="search" size={14} />} />
        <Divider label="мета" />
        <div className="ds-row">
          <p className="ds-playground__meta">Эта surface-схема подходит для карточек, панелей фильтров, блоков кабинета и desktop-виджетов.</p>
        </div>
      </div>
    </div>
  ),
}
