import fs from 'node:fs/promises'
import path from 'node:path'

const PROJECT_ROOT = path.resolve('.')
const CATALOG_SOURCE_PATH = path.join(PROJECT_ROOT, 'src/ui/catalog.json')
const STORIES_DIR = path.join(PROJECT_ROOT, 'src/stories')

const CONTRACTS_DIR = path.join(PROJECT_ROOT, 'contracts')
const CATALOG_OUTPUT_PATH = path.join(CONTRACTS_DIR, 'ui-catalog.json')
const SCHEMA_OUTPUT_PATH = path.join(CONTRACTS_DIR, 'ui-view.schema.json')
const SLOT_MATRIX_OUTPUT_PATH = path.join(CONTRACTS_DIR, 'ui-slot-matrix.json')
const EXAMPLES_DIR = path.join(CONTRACTS_DIR, 'examples')
const EXAMPLE_MARKET_PATH = path.join(EXAMPLES_DIR, 'market.search.results.json')
const EXAMPLE_CABINET_PATH = path.join(EXAMPLES_DIR, 'cabinet.dashboard.home.json')

const CHECK_MODE = process.argv.includes('--check')

function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toStoryId(title, storyExport) {
  const titleSlug = slugify(title.replace(/\//g, '-'))
  const storySlug = slugify(storyExport.replace(/([a-z0-9])([A-Z])/g, '$1-$2'))
  return `${titleSlug}--${storySlug}`
}

async function parseStories() {
  const files = await fs.readdir(STORIES_DIR)
  const storyFiles = files.filter((file) => file.endsWith('.stories.tsx'))

  const map = new Map()

  for (const file of storyFiles) {
    const fullPath = path.join(STORIES_DIR, file)
    const source = await fs.readFile(fullPath, 'utf8')

    const titleMatch = source.match(/title:\s*['"`]([^'"`]+)['"`]/)
    if (!titleMatch) {
      continue
    }

    const title = titleMatch[1]
    const exports = [...source.matchAll(/export const\s+([A-Za-z0-9_]+)\s*:/g)].map((match) => match[1])

    map.set(title, {
      file: path.relative(PROJECT_ROOT, fullPath),
      exports,
    })
  }

  return map
}

function unique(values) {
  return [...new Set(values)]
}

function buildSchema(compiledCatalog) {
  const widgetTypes = compiledCatalog.widgets.map((item) => item.widget_type)
  const slots = unique(compiledCatalog.widgets.flatMap((item) => item.slots)).sort()
  const states = unique(compiledCatalog.widgets.flatMap((item) => item.states)).sort()
  const actionTypes = unique(compiledCatalog.widgets.flatMap((item) => item.action_types)).sort()

  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://yokka/contracts/ui-view.schema.json',
    title: 'Yokka UI View Payload',
    type: 'object',
    additionalProperties: false,
    required: ['screen', 'screen_version', 'widgets'],
    properties: {
      screen: { type: 'string', minLength: 1 },
      screen_version: { type: 'string', minLength: 1 },
      role: { type: 'string', enum: ['guest', 'buyer', 'seller'] },
      widgets: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['widget_type', 'schema_version', 'slot', 'state', 'data'],
          properties: {
            widget_type: { type: 'string', enum: widgetTypes },
            schema_version: { type: 'string', minLength: 1 },
            slot: { type: 'string', enum: slots },
            state: { type: 'string', enum: states },
            data: {
              type: 'object',
              additionalProperties: true,
            },
            actions: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: true,
                required: ['id', 'type'],
                properties: {
                  id: { type: 'string', minLength: 1 },
                  type: { type: 'string', enum: actionTypes },
                  label: { type: 'string' },
                  target: { type: 'string' },
                  payload: { type: 'object', additionalProperties: true },
                },
              },
            },
            tracking: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
    },
  }
}

function buildSlotMatrix(compiledCatalog) {
  const slotMap = new Map()

  for (const widget of compiledCatalog.widgets) {
    for (const slot of widget.slots) {
      if (!slotMap.has(slot)) {
        slotMap.set(slot, [])
      }
      slotMap.get(slot).push(widget.widget_type)
    }
  }

  return {
    catalog_version: compiledCatalog.catalog_version,
    updated_at: compiledCatalog.updated_at,
    slots: [...slotMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([slot, widgetTypes]) => ({
        slot,
        widget_types: widgetTypes.sort(),
      })),
  }
}

function buildExamples() {
  return {
    market: {
      screen: 'market.search.results',
      screen_version: 'v1',
      role: 'buyer',
      widgets: [
        {
          widget_type: 'market.search_panel',
          schema_version: 'v1',
          slot: 'market.search.header',
          state: 'default',
          data: {
            query: 'iPhone 15',
            city: 'Москва',
          },
          actions: [
            {
              id: 'search.submit',
              type: 'submit',
              label: 'Найти',
            },
          ],
        },
        {
          widget_type: 'market.filter_bar',
          schema_version: 'v1',
          slot: 'market.search.filters',
          state: 'default',
          data: {
            filters: ['Состояние', 'Доставка', 'Цена'],
            sort: 'price_asc',
          },
          actions: [
            {
              id: 'filters.open',
              type: 'dialog',
              label: 'Открыть фильтры',
            },
          ],
        },
        {
          widget_type: 'market.listing_card',
          schema_version: 'v1',
          slot: 'market.results.grid',
          state: 'default',
          data: {
            id: '123',
            title: 'iPhone 15 Pro 256GB',
            price: '89 000 ₽',
            meta: 'Москва · сегодня',
          },
          actions: [
            {
              id: 'listing.open',
              type: 'navigate',
              target: '/item/123',
            },
            {
              id: 'favorite.toggle',
              type: 'command',
            },
          ],
        },
      ],
    },
    cabinet: {
      screen: 'cabinet.dashboard.home',
      screen_version: 'v1',
      role: 'seller',
      widgets: [
        {
          widget_type: 'cabinet.sidebar_nav',
          schema_version: 'v1',
          slot: 'cabinet.sidebar',
          state: 'default',
          data: {
            sections: ['Объявления', 'Сообщения', 'Статистика'],
            active_id: 'items',
          },
          actions: [
            {
              id: 'nav.open',
              type: 'navigate',
            },
          ],
        },
        {
          widget_type: 'cabinet.dashboard_widgets',
          schema_version: 'v1',
          slot: 'cabinet.dashboard.main',
          state: 'default',
          data: {
            kpis: [
              { id: 'views', value: 1204 },
              { id: 'contacts', value: 93 },
            ],
          },
          actions: [
            {
              id: 'dashboard.open_analytics',
              type: 'navigate',
              target: '/profile/analytics',
            },
          ],
        },
      ],
    },
  }
}

async function ensureMatches(pathname, nextContent) {
  let current = null
  try {
    current = await fs.readFile(pathname, 'utf8')
  } catch {
    current = null
  }

  if (current !== nextContent) {
    throw new Error(`Contract artifact is out of date: ${path.relative(PROJECT_ROOT, pathname)}\nRun: npm run contracts:build`)
  }
}

async function writeOrCheck(pathname, content) {
  if (CHECK_MODE) {
    await ensureMatches(pathname, content)
    return
  }

  await fs.mkdir(path.dirname(pathname), { recursive: true })
  await fs.writeFile(pathname, content, 'utf8')
}

async function main() {
  const sourceCatalog = JSON.parse(await fs.readFile(CATALOG_SOURCE_PATH, 'utf8'))
  const storyMap = await parseStories()

  const widgetTypes = sourceCatalog.widgets.map((item) => item.widget_type)
  if (unique(widgetTypes).length !== widgetTypes.length) {
    throw new Error('Duplicate widget_type found in src/ui/catalog.json')
  }

  const compiledWidgets = sourceCatalog.widgets.map((widget) => {
    const storyRef = storyMap.get(widget.storybook.title)
    if (!storyRef) {
      throw new Error(`Story title not found: ${widget.storybook.title}`)
    }

    if (!storyRef.exports.includes(widget.storybook.story_export)) {
      throw new Error(
        `Story export ${widget.storybook.story_export} not found for title ${widget.storybook.title} in ${storyRef.file}`,
      )
    }

    const storyId = toStoryId(widget.storybook.title, widget.storybook.story_export)
    const storyPath = `?path=/story/${storyId}`

    return {
      ...widget,
      storybook: {
        ...widget.storybook,
        story_id: storyId,
        path: storyPath,
        url: `${sourceCatalog.storybook_public_base_url}${storyPath}`,
      },
    }
  })

  const compiledCatalog = {
    ...sourceCatalog,
    widgets: compiledWidgets,
  }

  const schema = buildSchema(compiledCatalog)
  const slotMatrix = buildSlotMatrix(compiledCatalog)
  const examples = buildExamples()

  await writeOrCheck(CATALOG_OUTPUT_PATH, stableStringify(compiledCatalog))
  await writeOrCheck(SCHEMA_OUTPUT_PATH, stableStringify(schema))
  await writeOrCheck(SLOT_MATRIX_OUTPUT_PATH, stableStringify(slotMatrix))
  await writeOrCheck(EXAMPLE_MARKET_PATH, stableStringify(examples.market))
  await writeOrCheck(EXAMPLE_CABINET_PATH, stableStringify(examples.cabinet))

  console.log(CHECK_MODE ? 'Contracts check passed' : 'Contracts built')
}

await main()
