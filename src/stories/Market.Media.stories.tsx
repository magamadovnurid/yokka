import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaGallery } from '../design-system/marketplace/MediaGallery'

const meta = {
  title: 'Market/Media',
  component: MediaGallery,
  args: {
    slides: [
      {
        id: 'front',
        title: 'Вид спереди',
        subtitle: 'Основной кадр',
        toneStart: 'color-mix(in srgb, var(--ui-color-info) 55%, var(--ui-color-surface))',
        toneEnd: 'var(--ui-color-info)',
      },
      {
        id: 'interior',
        title: 'Интерьер',
        subtitle: 'Салон и мультимедиа',
        toneStart: 'color-mix(in srgb, var(--ui-color-success) 55%, var(--ui-color-surface))',
        toneEnd: 'var(--ui-color-success)',
      },
      {
        id: 'wheel',
        title: 'Деталь',
        subtitle: 'Колёса и подвеска',
        toneStart: 'color-mix(in srgb, var(--ui-color-warning) 55%, var(--ui-color-surface))',
        toneEnd: 'var(--ui-color-warning)',
      },
      {
        id: 'documents',
        title: 'Документы',
        subtitle: 'ПТС и сервис',
        toneStart: 'color-mix(in srgb, var(--ui-color-primary) 45%, var(--ui-color-surface))',
        toneEnd: 'var(--ui-color-primary)',
      },
    ],
  },
} satisfies Meta<typeof MediaGallery>

export default meta

type Story = StoryObj<typeof meta>

export const Gallery: Story = {}
