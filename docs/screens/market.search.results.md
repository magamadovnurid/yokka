# Screen Spec: `market.search.results`

## Purpose

Базовый шаблон поисковой выдачи маркетплейса в стиле Avito для дальнейшего масштабирования UI Yokka.

## Sources

- Runtime screen component: [`src/screens/MarketSearchResultsScreen.tsx`](/Users/mns/Desktop/yokka/src/screens/MarketSearchResultsScreen.tsx)
- Storybook screen story: [`src/stories/Screens.MarketSearchResults.stories.tsx`](/Users/mns/Desktop/yokka/src/stories/Screens.MarketSearchResults.stories.tsx)
- Contract payload (TS): [`src/screens/marketSearchResults.payload.ts`](/Users/mns/Desktop/yokka/src/screens/marketSearchResults.payload.ts)
- Contract payload (JSON): [`contracts/examples/market.search.results.screen.json`](/Users/mns/Desktop/yokka/contracts/examples/market.search.results.screen.json)

## Slot Map

| Slot | Widget types |
| --- | --- |
| `screen.header` | `market.desktop_header` |
| `market.search.header` | `market.category_strip`, `market.search_panel` |
| `market.search.filters` | `market.filter_bar` |
| `market.results.grid` | `market.listing_card` |
| `market.results.sidebar` | `market.desktop_widgets` |
| `list.footer` | `core.navigation.pagination` |
| `list.body` | `core.feedback.empty_state` (empty state only) |

## Supported States

- `default`: стандартная выдача с карточками
- `empty`: нет результатов, рендерится `core.feedback.empty_state`

## DoD for this screen

1. Все виджеты приходят из контрактного payload.
2. Поиск, фильтры, категории, пагинация и избранное интерактивны.
3. Storybook и runtime используют один и тот же payload-источник.
4. Payload проходит валидацию через `npm run contracts:validate-payload -- contracts/examples/market.search.results.screen.json`.
