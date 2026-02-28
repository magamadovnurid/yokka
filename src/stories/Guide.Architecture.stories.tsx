import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: '00-Guide/Architecture',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Structure: Story = {
  render: () => (
    <div className="ds-stack" style={{ minWidth: 860 }}>
      <h2 style={{ margin: 0 }}>Yokka UI Structure</h2>
      <div className="ds-card" style={{ gap: 10 }}>
        <p style={{ margin: 0 }}>
          <strong>01-Avito</strong> — текущий production-стандарт (наследуемая ветка интерфейса).
        </p>
        <p style={{ margin: 0 }}>
          <strong>02-ADS</strong> — перспективный стандарт по категориям Ant Design (General / Layout / Navigation / Data Entry / Data Display / Feedback / Other).
        </p>
        <p style={{ color: 'var(--ui-color-text-muted)', margin: 0 }}>
          В левом меню Storybook разделы намеренно разведены в отдельные папки, чтобы не смешивать действующий стиль и будущий дизайн-язык.
        </p>
      </div>
    </div>
  ),
}
