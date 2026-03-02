import type { Meta, StoryObj } from '@storybook/react-vite'
import { MarketSearchResultsScreen } from '../screens/MarketSearchResultsScreen'
import { marketSearchResultsEmptyPayload, marketSearchResultsPayload } from '../screens/marketSearchResults.payload'

const meta = {
  title: 'Screens/Market Search Results',
  component: MarketSearchResultsScreen,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof MarketSearchResultsScreen>

export default meta

type Story = StoryObj<typeof meta>

export const BuyerDefault: Story = {
  args: {
    payload: marketSearchResultsPayload,
  },
}

export const EmptyResults: Story = {
  args: {
    payload: marketSearchResultsEmptyPayload,
  },
}
