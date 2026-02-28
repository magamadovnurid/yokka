import type { Preview } from '@storybook/react-vite'
import '../src/design-system/global.css'

const preview: Preview = {
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
