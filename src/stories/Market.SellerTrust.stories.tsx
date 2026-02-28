import type { Meta, StoryObj } from '@storybook/react-vite'
import { SellerTrust } from '../design-system/marketplace/SellerTrust'

const meta = {
  title: '01-Avito/Marketplace/Seller & Trust',
  component: SellerTrust,
  args: {
    sellerName: 'Пользователь',
    rating: '5.0',
    reviewCount: 3,
    responseTime: 'несколько минут',
    badges: ['Документы проверены', 'Надёжный продавец'],
  },
} satisfies Meta<typeof SellerTrust>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BusinessProfile: Story = {
  args: {
    sellerName: 'Автоцентр Восток',
    rating: '4.8',
    reviewCount: 196,
    responseTime: '15 минут',
    badges: ['Компания проверена', 'Официальный дилер'],
  },
}
