import { useMemo, useState } from 'react'
import { EmptyState } from '../design-system/feedback/EmptyState'
import { CategoryStrip } from '../design-system/marketplace/CategoryStrip'
import { DesktopHeader } from '../design-system/marketplace/DesktopHeader'
import { DesktopWidgets } from '../design-system/marketplace/DesktopWidgets'
import { FilterBar } from '../design-system/marketplace/FilterBar'
import { ListingCard } from '../design-system/marketplace/ListingCard'
import { SearchPanel } from '../design-system/marketplace/SearchPanel'
import { Pagination } from '../design-system/navigation/Pagination'
import type { UiScreenPayload, UiWidgetEnvelope } from '../ui'
import { marketSearchResultsPayload } from './marketSearchResults.payload'

interface HeaderData {
  city?: string
  query?: string
  user?: string
  notifications?: number
}

interface CategoryDataItem {
  id: string
  label: string
  count?: number
}

interface CategoryData {
  items?: CategoryDataItem[]
  active_id?: string
}

interface SearchPanelData {
  query?: string
  city?: string
  chips?: string[]
}

interface FilterBarData {
  filters?: string[]
  chips?: string[]
  sort?: string
}

interface ListingCardData {
  id?: string
  title?: string
  price?: string
  meta?: string
  status?: string
  favorite?: boolean
  category?: string
  delivery?: boolean
}

interface DesktopWidgetsBundle {
  highlights?: Array<{ id: string; title: string; value: string; note: string }>
  mini_rows?: Array<{ id: string; title: string; price: string; meta: string; status: 'success' | 'warning' | 'danger' | 'muted' }>
  miniRows?: Array<{ id: string; title: string; price: string; meta: string; status: 'success' | 'warning' | 'danger' | 'muted' }>
}

interface DesktopWidgetsData {
  widgets?: DesktopWidgetsBundle
}

interface PaginationData {
  current_page?: number
  total_pages?: number
}

interface EmptyStateData {
  title?: string
  description?: string
  cta?: string
}

interface ListingViewModel {
  id: string
  title: string
  price: string
  meta: string
  status: string
  category: string
  delivery: boolean
  favorite: boolean
}

function firstWidget(payload: UiScreenPayload, widgetType: string): UiWidgetEnvelope | undefined {
  return payload.widgets.find((widget) => widget.widget_type === widgetType)
}

function widgetsByType(payload: UiScreenPayload, widgetType: string): UiWidgetEnvelope[] {
  return payload.widgets.filter((widget) => widget.widget_type === widgetType)
}

function readData<T>(widget: UiWidgetEnvelope | undefined): Partial<T> {
  if (!widget || typeof widget.data !== 'object' || widget.data === null) {
    return {}
  }
  return widget.data as Partial<T>
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter((item): item is string => typeof item === 'string')
}

function parsePrice(value: string): number {
  const digits = value.replace(/[^\d]/g, '')
  return Number.parseInt(digits || '0', 10)
}

export interface MarketSearchResultsScreenProps {
  payload?: UiScreenPayload
}

export function MarketSearchResultsScreen({ payload = marketSearchResultsPayload }: MarketSearchResultsScreenProps) {
  const headerData = {
    city: 'Москва',
    query: '',
    user: 'Покупатель',
    notifications: 0,
    ...readData<HeaderData>(firstWidget(payload, 'market.desktop_header')),
  }

  const categoryData = readData<CategoryData>(firstWidget(payload, 'market.category_strip'))
  const categoryItems = (categoryData.items?.length ? categoryData.items : [{ id: 'all', label: 'Все категории' }]).map((item) => ({
    id: item.id,
    label: item.label,
    count: item.count,
  }))

  const searchData = readData<SearchPanelData>(firstWidget(payload, 'market.search_panel'))
  const filterData = readData<FilterBarData>(firstWidget(payload, 'market.filter_bar'))
  const paginationData = readData<PaginationData>(firstWidget(payload, 'core.navigation.pagination'))
  const emptyData = {
    title: 'Ничего не найдено',
    description: 'Попробуйте изменить запрос или сбросить фильтры.',
    cta: 'Сбросить фильтры',
    ...readData<EmptyStateData>(firstWidget(payload, 'core.feedback.empty_state')),
  }

  const sourceListings = useMemo<ListingViewModel[]>(
    () =>
      widgetsByType(payload, 'market.listing_card').map((widget, index) => {
        const data = readData<ListingCardData>(widget)
        return {
          id: data.id ?? `listing-${index + 1}`,
          title: data.title ?? 'Без названия',
          price: data.price ?? '0 ₽',
          meta: data.meta ?? 'Без описания',
          status: data.status ?? 'Проверено',
          category: data.category ?? 'all',
          delivery: Boolean(data.delivery),
          favorite: Boolean(data.favorite),
        }
      }),
    [payload],
  )

  const [query, setQuery] = useState(searchData.query ?? headerData.query ?? '')
  const [city, setCity] = useState(searchData.city ?? headerData.city ?? 'Москва')
  const [sort, setSort] = useState(filterData.sort ?? 'new')
  const [chips, setChips] = useState(() => {
    const fromWidget = toStringArray(filterData.chips)
    return fromWidget.length > 0 ? fromWidget : ['С доставкой', 'Проверенный продавец', 'Только избранное']
  })
  const [quickFilters, setQuickFilters] = useState(() => {
    const fromWidget = toStringArray(searchData.chips)
    return fromWidget.length > 0 ? fromWidget : ['Новые', 'С доставкой', 'Проверенные']
  })
  const [activeCategory, setActiveCategory] = useState(categoryData.active_id ?? categoryItems[0]?.id ?? 'all')
  const [currentPage, setCurrentPage] = useState(Math.max(1, paginationData.current_page ?? 1))
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const seeded = sourceListings.filter((listing) => listing.favorite).map((listing) => listing.id)
    return new Set(seeded)
  })

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>()
    map.set('all', sourceListings.length)
    for (const listing of sourceListings) {
      map.set(listing.category, (map.get(listing.category) ?? 0) + 1)
    }
    return map
  }, [sourceListings])

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const onlyFavorites = chips.includes('Только избранное')
    const onlyDelivery = chips.includes('С доставкой')

    const base = sourceListings.filter((listing) => {
      const inQuery =
        normalizedQuery.length === 0 ||
        listing.title.toLowerCase().includes(normalizedQuery) ||
        listing.meta.toLowerCase().includes(normalizedQuery)
      const inCategory = activeCategory === 'all' || listing.category === activeCategory
      const inFavorites = !onlyFavorites || favoriteIds.has(listing.id)
      const inDelivery = !onlyDelivery || listing.delivery
      return inQuery && inCategory && inFavorites && inDelivery
    })

    const sorted = [...base]
    if (sort === 'cheap') {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sort === 'expensive') {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }
    return sorted
  }, [activeCategory, chips, favoriteIds, query, sort, sourceListings])

  const pageSize = 6
  const computedTotalPages = Math.max(1, Math.ceil(filteredListings.length / pageSize))
  const totalPages = Math.max(computedTotalPages, Math.max(1, paginationData.total_pages ?? 1))

  const activePage = Math.min(Math.max(1, currentPage), totalPages)
  const visibleListings = filteredListings.slice((activePage - 1) * pageSize, activePage * pageSize)

  const desktopWidgetsData = readData<DesktopWidgetsData>(firstWidget(payload, 'market.desktop_widgets'))
  const desktopWidgetsBundle = desktopWidgetsData.widgets
  const highlights =
    desktopWidgetsBundle?.highlights ?? [
      { id: 'new_today', title: 'Новых за сутки', value: '0', note: 'нет данных' },
      { id: 'trusted', title: 'Проверенных продавцов', value: '0%', note: 'нет данных' },
      { id: 'delivery', title: 'С доставкой', value: '0%', note: 'нет данных' },
    ]
  const miniRows =
    desktopWidgetsBundle?.mini_rows ??
    desktopWidgetsBundle?.miniRows ?? [
      { id: 'placeholder', title: 'Виджеты не заданы', price: '—', meta: 'Добавьте market.desktop_widgets', status: 'muted' as const },
    ]

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery)
    setCurrentPage(1)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
  }

  const toggleFavorite = (listingId: string) => {
    setFavoriteIds((previous) => {
      const next = new Set(previous)
      if (next.has(listingId)) {
        next.delete(listingId)
      } else {
        next.add(listingId)
      }
      return next
    })
  }

  const handleHeaderAction = (actionId: string) => {
    if (actionId === 'favorites' && !chips.includes('Только избранное')) {
      setChips((previous) => [...previous, 'Только избранное'])
      setCurrentPage(1)
    }
  }

  const resetFilters = () => {
    setQuery('')
    setSort('new')
    setActiveCategory('all')
    setChips(toStringArray(filterData.chips))
    setQuickFilters(toStringArray(searchData.chips))
    setCurrentPage(1)
  }

  return (
    <main className="ds-market-screen" aria-label="Экран market.search.results">
      <DesktopHeader
        actions={[
          { id: 'favorites', label: 'Избранное', icon: 'heart', count: favoriteIds.size },
          { id: 'messages', label: 'Сообщения', icon: 'chat', count: 2 },
          { id: 'notifications', label: 'Уведомления', icon: 'bell', count: headerData.notifications },
        ]}
        city={city}
        onAction={handleHeaderAction}
        onQueryChange={handleQueryChange}
        query={query}
        userName={headerData.user}
      />

      <CategoryStrip
        activeId={activeCategory}
        items={categoryItems.map((item) => ({
          ...item,
          count: categoryCounts.get(item.id) ?? item.count,
        }))}
        onChange={handleCategoryChange}
      />

      <SearchPanel
        location={city}
        onFilterClick={(filter) => setQuickFilters((previous) => previous.filter((item) => item !== filter))}
        onLocationChange={setCity}
        onQueryChange={handleQueryChange}
        onSearch={() => setCurrentPage(1)}
        popularFilters={quickFilters}
        query={query}
        subtitle="Контрактный экран: backend управляет составом виджетов через payload."
        title="Найдите товар или услугу"
      />

      <FilterBar
        chips={chips}
        onChipRemove={(chip) => {
          setChips((previous) => previous.filter((item) => item !== chip))
          setCurrentPage(1)
        }}
        onQueryChange={handleQueryChange}
        onReset={resetFilters}
        onSortChange={(value) => {
          setSort(value)
          setCurrentPage(1)
        }}
        query={query}
        resultCount={filteredListings.length}
        sort={sort}
      />

      <section className="ds-market-screen__content">
        <div className="ds-market-screen__results" aria-live="polite">
          {visibleListings.length > 0 ? (
            visibleListings.map((listing) => (
              <ListingCard
                key={listing.id}
                favorite={favoriteIds.has(listing.id)}
                meta={listing.meta}
                onMessageClick={() => null}
                onToggleFavorite={() => toggleFavorite(listing.id)}
                price={listing.price}
                status={listing.status}
                title={listing.title}
              />
            ))
          ) : (
            <div className="ds-market-screen__empty">
              <EmptyState actionText={emptyData.cta} description={emptyData.description} title={emptyData.title} />
            </div>
          )}
        </div>

        <aside className="ds-market-screen__sidebar">
          <DesktopWidgets highlights={highlights} miniRows={miniRows} />
        </aside>
      </section>

      <div className="ds-market-screen__footer">
        <Pagination currentPage={activePage} onChange={(page) => setCurrentPage(Math.min(Math.max(1, page), totalPages))} totalPages={totalPages} />
      </div>

      <p className="ds-market-screen__meta">
        Screen: <code>{payload.screen}</code> · version: <code>{payload.screen_version}</code> · role: <code>{payload.role ?? 'guest'}</code>
      </p>
    </main>
  )
}
