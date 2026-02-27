import './App.css'
import { InboxList } from './design-system/cabinet/InboxList'
import { ListingStateTabs } from './design-system/cabinet/ListingStateTabs'
import { NotificationList } from './design-system/cabinet/NotificationList'
import { SidebarNav } from './design-system/cabinet/SidebarNav'
import { FilterBar } from './design-system/marketplace/FilterBar'
import { ListingCard } from './design-system/marketplace/ListingCard'
import { SearchPanel } from './design-system/marketplace/SearchPanel'
import { SellerTrust } from './design-system/marketplace/SellerTrust'
import { Breadcrumbs } from './design-system/navigation/Breadcrumbs'

const sidebarItems = [
  { id: 'messages', label: 'Сообщения', count: 3 },
  { id: 'listings', label: 'Мои объявления', count: 12 },
  { id: 'orders', label: 'Заказы', count: 4 },
  { id: 'favorites', label: 'Избранное', count: 72 },
  { id: 'wallet', label: 'Кошелёк' },
]

const listingStates = [
  { id: 'action', label: 'Ждут действий', count: 1 },
  { id: 'active', label: 'Активные', count: 2 },
  { id: 'draft', label: 'Черновики', count: 1 },
  { id: 'archive', label: 'Архив', count: 9 },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Breadcrumbs
          items={[
            { label: 'UI Encyclopedia', href: '#' },
            { label: 'Marketplace Design System' },
          ]}
        />
        <h1>Yokka UI Inventory</h1>
        <p>
          Расширенный набор элементов для marketplace и кабинета пользователя. Полная документация компонентов: <code>npm run storybook</code>
        </p>
      </header>

      <main className="app-grid">
        <SearchPanel
          title="Найдите товар или услугу"
          subtitle="Минималистичный блок поиска с фильтрами"
          popularFilters={['Новые', 'С доставкой', 'Проверенные', 'Без посредников']}
        />
        <FilterBar chips={['Цена до 5 млн', 'Только с фото', 'Проверенный продавец']} query="Li Auto" resultCount={1243} />

        <ListingCard title="Li Auto L9 1.5 AT, 2024" price="4 890 000 ₽" meta="Аргун · сегодня" status="Проверено" />
        <SellerTrust
          sellerName="Пользователь"
          rating="5.0"
          reviewCount={3}
          responseTime="несколько минут"
          badges={['Документы проверены', 'Надёжный продавец']}
        />

        <SidebarNav title="Личный кабинет" items={sidebarItems} activeId="listings" />
        <ListingStateTabs states={listingStates} activeId="action" />

        <InboxList
          activeId="1"
          items={[
            { id: '1', title: 'Li Auto L9 2024', text: 'Добрый день, авто еще в продаже?', time: '12:34', unread: 2 },
            { id: '2', title: 'MacBook Air M3', text: 'Отправка через доставку возможна', time: '11:10' },
          ]}
        />

        <NotificationList
          items={[
            { id: 'n1', title: 'Объявление прошло проверку', text: 'Li Auto L9 опубликовано в поиске', time: 'Сегодня, 10:04', type: 'system', unread: true },
            { id: 'n2', title: 'Новый отклик в чате', text: 'Покупатель написал по вашему объявлению', time: 'Сегодня, 09:52', type: 'message' },
          ]}
        />
      </main>
    </div>
  )
}

export default App
