# UI Contracts: Backend ↔ Frontend

## 1. Принцип

Backend не отправляет "какой React-компонент рендерить" напрямую.
Backend отправляет **намерение** через `widget_type`, `slot`, `state`, `data`, `actions`.

Frontend рендерит это через UI Registry и дизайн-систему.

## 2. Источники правды

- Каталог UI-виджетов: [`src/ui/catalog.json`](/Users/mns/Desktop/yokka/src/ui/catalog.json)
- Экспорт для backend/интеграций: [`contracts/ui-catalog.json`](/Users/mns/Desktop/yokka/contracts/ui-catalog.json)
- JSON Schema payload: [`contracts/ui-view.schema.json`](/Users/mns/Desktop/yokka/contracts/ui-view.schema.json)
- Матрица slot->widget_type: [`contracts/ui-slot-matrix.json`](/Users/mns/Desktop/yokka/contracts/ui-slot-matrix.json)

## 3. Формат payload

```json
{
  "screen": "market.search.results",
  "screen_version": "v1",
  "role": "buyer",
  "widgets": [
    {
      "widget_type": "market.listing_card",
      "schema_version": "v1",
      "slot": "market.results.grid",
      "state": "default",
      "data": {
        "id": "123",
        "title": "iPhone 15 Pro",
        "price": "89 000 ₽"
      },
      "actions": [
        { "id": "listing.open", "type": "navigate", "target": "/item/123" },
        { "id": "favorite.toggle", "type": "command" }
      ]
    }
  ]
}
```

## 4. Как backend понимает "что где применять"

1. Выбирает `screen`.
2. Берёт разрешённые `slot` из `ui-slot-matrix`.
3. В каждый `slot` кладёт только допустимые `widget_type`.
4. Для виджета заполняет `data` по `data_fields.required`.
5. Использует только разрешённые `action_types`.

## 5. Как ссылаться на Storybook

Для каждого `widget_type` есть Storybook-ссылка в `contracts/ui-catalog.json`:

- `storybook.story_id`
- `storybook.path`
- `storybook.url`

Это позволяет backend/аналитикам/QA открыть эталон UI по конкретному `widget_type`.

## 6. Как Codex/агенты должны работать с UI

При генерации/изменении экранов агент обязан:

1. читать `contracts/ui-catalog.json`;
2. использовать только зарегистрированные `widget_type`;
3. соблюдать `slot`, `state`, `action_types`, `data_fields.required`;
4. указывать Storybook URL из каталога как визуальный референс;
5. валидировать payload перед отправкой.

## 7. Команды

```bash
npm run contracts:build
npm run contracts:check
npm run contracts:validate-payload -- contracts/examples/market.search.results.json
```

## 8. Примеры payload

- [`contracts/examples/market.search.results.json`](/Users/mns/Desktop/yokka/contracts/examples/market.search.results.json)
- [`contracts/examples/cabinet.dashboard.home.json`](/Users/mns/Desktop/yokka/contracts/examples/cabinet.dashboard.home.json)
