import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../design-system/primitives/Button'
import { Drawer, Modal } from '../design-system/overlays/Modal'
import { RichTooltip, Tooltip } from '../design-system/overlays/Tooltip'

const meta = {
  title: 'Core/Overlays',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TooltipModalDrawer: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
      <div className="ds-stack" style={{ minWidth: 860 }}>
        <div className="ds-row">
          <Tooltip content="Быстрый просмотр статистики кликов">
            <span>CTR виджет</span>
          </Tooltip>

          <RichTooltip
            actionLabel="Открыть чеклист"
            description="Сценарий показывает rich-tooltip с кнопкой действия и многострочным описанием."
            title="Подсказка по публикации"
          />
        </div>

        <div className="ds-row">
          <Button onClick={() => setModalOpen(true)}>Открыть Modal</Button>
          <Button onClick={() => setDrawerOpen(true)} variant="secondary">
            Открыть Drawer
          </Button>
        </div>

        <Modal
          actions={
            <>
              <Button onClick={() => setModalOpen(false)} variant="ghost">
                Отмена
              </Button>
              <Button onClick={() => setModalOpen(false)}>Подтвердить</Button>
            </>
          }
          description="Проверяем стандартный диалог подтверждения для действий с объявлениями и оплатой."
          onClose={() => setModalOpen(false)}
          open={modalOpen}
          title="Подтвердите действие"
        >
          <p className="ds-playground__meta">После подтверждения объявление будет перемещено в архив.</p>
        </Modal>

        <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen} title="Фильтры покупателя">
          <p className="ds-playground__meta">В Drawer удобно размещать фильтры заказов, доставок и споров.</p>
        </Drawer>
      </div>
    )
  },
}
