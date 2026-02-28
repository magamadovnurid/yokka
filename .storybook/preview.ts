import type { Preview } from '@storybook/react-vite'
import '../src/design-system/global.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          '00-Guide',
          '01-Avito',
          ['Foundation', 'Marketplace', 'Cabinet'],
          '02-ADS',
          ['General', 'Layout', 'Navigation', 'Data Entry', 'Data Display', 'Feedback', 'Other'],
          '99-Meta',
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
