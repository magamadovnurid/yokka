import type { Preview } from '@storybook/react-vite'
import '../src/design-system/global.css'

const paletteAttribute = 'data-theme'

function applyPalette(palette: string | undefined) {
  const maybeDocument = globalThis as {
    document?: { documentElement?: { setAttribute: (name: string, value: string) => void } }
  }
  maybeDocument.document?.documentElement?.setAttribute(paletteAttribute, palette ?? 'avito')
}

const preview: Preview = {
  globalTypes: {
    palette: {
      name: 'Palette',
      description: 'Переключение цветовой гаммы UI',
      defaultValue: 'avito',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'avito', title: 'Avito Green' },
          { value: 'ocean', title: 'Ocean Blue' },
          { value: 'graphite', title: 'Graphite Mono' },
          { value: 'sunset', title: 'Sunset Orange' },
          { value: 'plum', title: 'Plum Violet' },
          { value: 'sand', title: 'Sand Amber' },
          { value: 'mint', title: 'Mint Teal' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      applyPalette(context.globals.palette)
      return Story()
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          'Core',
          ['Tokens', 'Primitives', 'Forms', 'Controls', 'Menus', 'Overlays', 'Icons', 'Indicators', 'Surface Patterns', 'Navigation', 'Feedback'],
          'Market',
          ['Desktop Header', 'Category Strip', 'Search & Filters', 'Filter Bar', 'Listing Card', 'Media', 'Seller & Trust', 'Desktop Widgets'],
          'Cabinet',
          ['Navigation', 'Listing States', 'Dashboard Widgets', 'Profile Blocks', 'Inbox', 'Chat Thread', 'Notifications'],
          'Meta',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'var(--ui-color-canvas)' },
        { name: 'surface', value: 'var(--ui-color-surface)' },
        { name: 'soft', value: 'var(--ui-color-surface-soft)' },
      ],
    },
  },
}

export default preview
