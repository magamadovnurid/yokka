import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionMenu, ContextMenuSurface, DropdownMenu, PopoverCard } from '../design-system/menus/DropdownMenu'

const meta = {
  title: 'Core/Menus',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const InteractiveMenus: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState('—')

    return (
      <div className="ds-stack" style={{ minWidth: 860 }}>
        <div className="ds-row">
          <DropdownMenu
            label="Действия объявления"
            items={[
              { id: 'edit', label: 'Редактировать' },
              { id: 'bump', label: 'Поднять в поиске', meta: '+14%' },
              { id: 'archive', label: 'Архивировать' },
              { id: 'delete', label: 'Удалить', danger: true },
            ]}
            onSelect={setLastAction}
          />

          <ActionMenu onAction={setLastAction} />

          <PopoverCard
            cta="Перейти к настройке"
            description="Покажи быстрые действия в меню, чтобы сократить путь к целевому действию продавца."
            onCtaClick={() => setLastAction('popover-cta')}
            title="Рекомендация по меню"
          />
        </div>

        <ContextMenuSurface
          onSelect={setLastAction}
          options={[
            { id: 'copy', label: 'Копировать ссылку' },
            { id: 'pin', label: 'Закрепить' },
            { id: 'mute', label: 'Отключить уведомления' },
          ]}
        />

        <p className="ds-playground__meta">
          Последнее действие: <strong>{lastAction}</strong>
        </p>
      </div>
    )
  },
}
