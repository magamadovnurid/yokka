import type { Preview } from '@storybook/react-vite'
import '../src/design-system/global.css'

const preview: Preview = {
  parameters: {
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
