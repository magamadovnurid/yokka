import type { Preview } from '@storybook/react-vite'
import '../src/design-system/global.css'

const paletteAttribute = 'data-theme'

function applyPalette(palette: string | undefined) {
  const maybeDocument = globalThis as { document?: { documentElement?: { setAttribute: (name: string, value: string) => void } } }
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
          ['Tokens', 'Primitives', 'Forms', 'Icons', 'Indicators', 'Surface Patterns', 'Navigation', 'Feedback'],
          'Market',
          ['Desktop Header', 'Category Strip', 'Search & Filters', 'Filter Bar', 'Listing Card', 'Seller & Trust', 'Desktop Widgets'],
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
        { name: 'canvas', value: '#f3f5f3' },
        { name: 'panel', value: '#ffffff' },
        { name: 'contrast', value: '#112f2b' },
      ],
    },
  },
}

export default preview
