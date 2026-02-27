import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    const basePath = process.env.STORYBOOK_BASE_PATH
    if (!basePath) {
      return config
    }

    const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`
    return {
      ...config,
      base: normalizedBasePath,
    }
  },
}

export default config
