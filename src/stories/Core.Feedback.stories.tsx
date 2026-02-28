import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '../design-system/feedback/Alert'
import { EmptyState } from '../design-system/feedback/EmptyState'
import { Skeleton } from '../design-system/feedback/Skeleton'
import { Toast } from '../design-system/feedback/Toast'
import { Button } from '../design-system/primitives/Button'

const meta = {
  title: '01-Avito/Foundation/Feedback',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AlertsAndStates: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 760 }}>
      <div className="ds-stack" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Alert title="Информация" description="Объявление отправлено на проверку" variant="info" />
        <Alert title="Успешно" description="Изменения сохранены" variant="success" />
        <Alert title="Проверьте данные" description="Не заполнено поле цены" variant="warning" />
        <Alert title="Ошибка" description="Не удалось отправить сообщение" variant="error" />
      </div>

      <div className="ds-row" style={{ alignItems: 'flex-start' }}>
        <div style={{ width: 340 }}>
          <EmptyState title="Нет объявлений" description="Создайте первое объявление, чтобы начать продажи" actionText="Разместить" />
        </div>
        <div className="ds-card" style={{ minWidth: 280 }}>
          <Skeleton lines={5} />
          <Toast title="Черновик сохранён" message="Можно вернуться к редактированию позже" />
        </div>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const handleSave = () => {
      setLoading(true)
      window.setTimeout(() => {
        setLoading(false)
        setShowToast(true)
      }, 650)
      window.setTimeout(() => {
        setShowToast(false)
      }, 2200)
    }

    return (
      <div className="ds-playground" style={{ minWidth: 720 }}>
        <div className="ds-row">
          <Button loading={loading} onClick={handleSave} variant="primary">
            Сохранить изменения
          </Button>
          <p className="ds-playground__meta">Кликни кнопку, чтобы увидеть анимацию загрузки и появления toast.</p>
        </div>

        <div className="ds-playground__split">
          <div className="ds-playground__surface">{loading ? <Skeleton lines={5} /> : <Alert title="Данные актуальны" description="Профиль синхронизирован с сервером" variant="success" />}</div>
          <div className="ds-playground__surface" style={{ alignContent: 'start', minHeight: 132 }}>
            {showToast ? <Toast title="Сохранено" message="Изменения применены без перезагрузки страницы" /> : <Alert title="Ожидание действия" description="Toast появится после клика по кнопке" variant="info" />}
          </div>
        </div>
      </div>
    )
  },
}
