import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageThread } from '../design-system/cabinet/MessageThread'
import { Icon } from '../design-system/primitives/Icon'
import { Input } from '../design-system/primitives/Input'
import { Button } from '../design-system/primitives/Button'

const meta = {
  title: '01-Avito/Cabinet/Chat Thread',
  component: MessageThread,
  args: {
    messages: [
      { id: '1', from: 'other', text: 'Здравствуйте! Подскажите, пробег реальный?', time: '12:30' },
      { id: '2', from: 'me', text: 'Да, пробег подтверждён. Есть отчёт и сервисная история.', time: '12:32' },
      { id: '3', from: 'other', text: 'Отлично, когда можно посмотреть машину?', time: '12:34' },
    ],
  },
} satisfies Meta<typeof MessageThread>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [messages, setMessages] = useState([...args.messages])
    const [draft, setDraft] = useState('')

    const sendMessage = () => {
      const value = draft.trim()
      if (!value) {
        return
      }

      setMessages((current) => [...current, { id: `local-${Date.now()}`, from: 'me', text: value, time: 'сейчас' }])
      setDraft('')

      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          { id: `reply-${Date.now()}`, from: 'other', text: 'Спасибо, сообщение получил. Продолжим в чате.', time: 'сейчас' },
        ])
      }, 450)
    }

    return (
      <div className="ds-playground" style={{ minWidth: 620 }}>
        <MessageThread messages={messages} />
        <div className="ds-row" style={{ alignItems: 'end' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <Input aria-label="Сообщение" onChange={(event) => setDraft(event.target.value)} placeholder="Напишите сообщение..." value={draft} />
          </div>
          <Button icon={<Icon name="message" size={14} />} onClick={sendMessage} type="button">
            Отправить
          </Button>
        </div>
      </div>
    )
  },
}
