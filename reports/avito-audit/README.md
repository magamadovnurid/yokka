# Avito UI Audit

## Быстрый старт

### 1) Сохранить сессии для ролей

```bash
npm run avito:auth:seller
npm run avito:auth:buyer
```

Во время каждого запуска откроется Chrome. Войдите в нужный аккаунт (роль) и нажмите Enter в терминале.

### 2) Запустить отдельные аудиты по ролям

```bash
npm run avito:audit:seller
npm run avito:audit:buyer
```

### 3) Запустить общий comparison-отчёт

```bash
npm run avito:audit:roles
```

## Что генерируется

### По каждой роли

- `reports/avito-audit/<role>/avito-ui-inventory.csv` — инвентарь UI-сигналов по страницам
- `reports/avito-audit/<role>/avito-pages.json` — сырой снимок страниц
- `reports/avito-audit/<role>/avito-summary.json` — агрегированная статистика
- `reports/avito-audit/<role>/storybook-gap-report.md` — gap-анализ против Storybook
- `reports/avito-audit/<role>/screenshots/*` — базовые скриншоты страниц
- `reports/avito-audit/<role>/state-screenshots/*` — скриншоты hidden states после ручных сценариев (click/hover/focus)

### Сводка seller vs buyer

- `reports/avito-audit/roles/role-gap-comparison.json`
- `reports/avito-audit/roles/role-gap-comparison.md`

## Ручные сценарии hidden states

`run-audit.mjs` автоматически пытается активировать скрытые состояния:

- hover по карточкам
- focus на поля ввода
- click по кнопкам действий/фильтров/контактов/меню/сторис

Чтобы отключить:

```bash
AVITO_MANUAL_SCENARIOS=0 npm run avito:audit:seller
```

## Полезные env-параметры

- `AVITO_AUTH_STATE` — путь к storageState
- `AVITO_OUTPUT_DIR` — директория отчётов
- `AVITO_ROLE` — `seller` / `buyer` / `generic`
- `AVITO_MAX_PAGES` — лимит desktop-страниц (по умолчанию `60`)
- `AVITO_MAX_DEPTH` — глубина обхода ссылок (по умолчанию `2`)
- `AVITO_MOBILE_SAMPLE_LIMIT` — лимит mobile-страниц (по умолчанию `14`)
- `AVITO_REQUIRE_AUTH=0` — разрешить аудит без авторизации
- `AVITO_HEADLESS=0` — запуск браузера в видимом режиме
- `AVITO_MANUAL_SCENARIOS=0` — отключить сценарии скрытых состояний
