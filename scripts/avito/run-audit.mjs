import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { chromium, devices } from 'playwright'

const AUTH_STATE_PATH = path.resolve(process.env.AVITO_AUTH_STATE ?? '.auth/avito-user.json')
const OUTPUT_DIR = path.resolve(process.env.AVITO_OUTPUT_DIR ?? 'reports/avito-audit')
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots')
const STATE_SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'state-screenshots')
const MAX_PAGES = Math.max(1, Number.parseInt(process.env.AVITO_MAX_PAGES ?? '60', 10))
const MAX_DEPTH = Math.max(0, Number.parseInt(process.env.AVITO_MAX_DEPTH ?? '2', 10))
const MOBILE_SAMPLE_LIMIT = Math.max(1, Number.parseInt(process.env.AVITO_MOBILE_SAMPLE_LIMIT ?? '14', 10))
const REQUIRE_AUTH = process.env.AVITO_REQUIRE_AUTH !== '0'
const ROLE = (process.env.AVITO_ROLE ?? 'generic').toLowerCase()
const MANUAL_SCENARIOS_ENABLED = process.env.AVITO_MANUAL_SCENARIOS !== '0'

const STORYBOOK_STORIES_DIR = path.resolve('src/stories')
const DESIGN_SYSTEM_DIR = path.resolve('src/design-system')

const BASE_SEED_URLS = [
  'https://www.avito.ru/',
  'https://www.avito.ru/all',
  'https://www.avito.ru/profile',
  'https://www.avito.ru/profile/settings',
  'https://www.avito.ru/favorites',
  'https://www.avito.ru/moskva/transport',
  'https://www.avito.ru/moskva/kvartiry',
  'https://www.avito.ru/moskva/uslugi',
  'https://www.avito.ru/moskva/vakansii',
  'https://www.avito.ru/moskva/telefony',
]

const ROLE_SEED_URLS = {
  seller: [
    'https://www.avito.ru/profile/items',
    'https://www.avito.ru/profile/messenger',
    'https://www.avito.ru/profile/notifications',
    'https://www.avito.ru/additem',
    'https://www.avito.ru/paid-services/listing-fees',
    'https://www.avito.ru/profile/campaigns',
    'https://www.avito.ru/business',
    'https://www.avito.ru/profile/rating',
    'https://www.avito.ru/profile/contacts',
    'https://www.avito.ru/reputation',
  ],
  buyer: [
    'https://www.avito.ru/orders',
    'https://www.avito.ru/order/cart',
    'https://www.avito.ru/favorites',
    'https://www.avito.ru/profile/messenger',
    'https://www.avito.ru/profile/notifications',
    'https://www.avito.ru/profile/settings/delivery',
    'https://www.avito.ru/profile/address',
    'https://www.avito.ru/garage',
    'https://www.avito.ru/account',
  ],
}

const COMMON_SCENARIOS = [
  {
    id: 'hover-primary-card',
    action: 'hover',
    selectors: ['[data-marker*="item-photo"]', '[data-marker*="story-previewer/block-preview"]', '[class*="card"]'],
  },
  {
    id: 'focus-search-input',
    action: 'focus',
    selectors: ['input[type="search"]', 'input[name*="query"]', 'input[placeholder*="иск"]', 'input'],
  },
  {
    id: 'open-more-actions',
    action: 'click',
    selectors: ['[data-marker="more-action-tooltip/button"]', '[data-marker="moreIconButton"]', 'button[aria-haspopup="menu"]'],
  },
  {
    id: 'open-filters',
    action: 'click',
    selectors: ['[data-marker*="filter"] button', 'button[aria-controls*="filter"]', '[data-marker*="catalog-filter"]'],
  },
  {
    id: 'open-contact',
    action: 'click',
    selectors: ['[data-marker="item-phone-button/undefined"]', '[data-marker="messenger-button/button"]', 'button:has-text("Написать")'],
  },
  {
    id: 'open-stories-preview',
    action: 'click',
    selectors: ['[data-marker*="stories/previewer/preview"]', '[data-marker*="story-previewer/block-preview"]'],
  },
]

const ROLE_SCENARIOS = {
  seller: [
    {
      id: 'seller-open-services-menu',
      action: 'click',
      selectors: ['[data-marker*="paid-services"] button', '[data-marker*="campaign"] button', '[data-marker*="listing"] button'],
    },
    {
      id: 'seller-open-item-actions',
      action: 'click',
      selectors: ['[data-marker*="item"] [data-marker*="more"]', '[data-marker*="favoriteButtonGrid"]'],
    },
  ],
  buyer: [
    {
      id: 'buyer-open-order-filter',
      action: 'click',
      selectors: ['[data-marker*="order"] button', '[data-marker*="status"] button', '[data-marker*="delivery"] button'],
    },
    {
      id: 'buyer-open-cart-actions',
      action: 'click',
      selectors: ['[data-marker*="cart"] button', '[data-marker*="checkout"] button', '[data-marker*="basket"] button'],
    },
  ],
}

function resolveSeedUrls(role) {
  const roleUrls = ROLE_SEED_URLS[role] ?? []
  return [...new Set([...BASE_SEED_URLS, ...roleUrls])]
}

function roleLabel(role) {
  if (role === 'seller') {
    return 'seller'
  }
  if (role === 'buyer') {
    return 'buyer'
  }
  return 'generic'
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

function normalizeUrl(rawUrl, baseUrl) {
  try {
    const parsed = baseUrl ? new URL(rawUrl, baseUrl) : new URL(rawUrl)
    if (!parsed.hostname.endsWith('avito.ru')) {
      return null
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null
    }

    parsed.hash = ''
    parsed.search = ''
    parsed.pathname = parsed.pathname.replace(/\/+$|^$/g, (match) => (match === '' ? '/' : ''))
    if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.slice(0, -1)
    }

    const blockedPathPrefixes = ['/api', '/web/1', '/static', '/services']
    if (blockedPathPrefixes.some((prefix) => parsed.pathname.startsWith(prefix))) {
      return null
    }

    return parsed.toString()
  } catch {
    return null
  }
}

function stringifyCsvCell(value) {
  const stringified = String(value ?? '')
  if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n')) {
    return `"${stringified.replace(/"/g, '""')}"`
  }
  return stringified
}

function toCsv(rows) {
  if (rows.length === 0) {
    return ''
  }
  const header = Object.keys(rows[0])
  const lines = [header.join(',')]
  for (const row of rows) {
    lines.push(header.map((key) => stringifyCsvCell(row[key])).join(','))
  }
  return `${lines.join('\n')}\n`
}

function sumCounts(target, source) {
  const output = { ...target }
  for (const [key, value] of Object.entries(source)) {
    output[key] = (output[key] ?? 0) + value
  }
  return output
}

function maxCounts(left, right) {
  const output = { ...left }
  for (const [key, value] of Object.entries(right)) {
    const existing = output[key] ?? 0
    output[key] = Math.max(existing, value)
  }
  return output
}

async function walkFiles(rootDir, extension) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath, extension)))
      continue
    }
    if (entry.isFile() && fullPath.endsWith(extension)) {
      files.push(fullPath)
    }
  }

  return files
}

async function collectStorybookInventory() {
  const storyFiles = await walkFiles(STORYBOOK_STORIES_DIR, '.stories.tsx')
  const titles = []

  for (const file of storyFiles) {
    const source = await fs.readFile(file, 'utf8')
    const titleMatch = source.match(/title:\s*['"`]([^'"`]+)['"`]/)
    if (titleMatch) {
      titles.push(titleMatch[1])
    }
  }

  const componentFiles = await walkFiles(DESIGN_SYSTEM_DIR, '.tsx')
  const componentNames = componentFiles.map((file) => path.basename(file, '.tsx'))

  return { titles: titles.sort(), componentNames: componentNames.sort() }
}

function coverageHasKeyword(inventory, keywords) {
  const lowerTitles = inventory.titles.map((item) => item.toLowerCase())
  const lowerComponents = inventory.componentNames.map((item) => item.toLowerCase())
  return keywords.some((keyword) => {
    const value = keyword.toLowerCase()
    return lowerTitles.some((title) => title.includes(value)) || lowerComponents.some((name) => name.includes(value))
  })
}

async function capturePageSnapshot(page) {
  await page.waitForTimeout(700)
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const points = [0.25, 0.5, 0.75, 1]
    const maxY = Math.max(0, document.body.scrollHeight - window.innerHeight)

    for (const point of points) {
      window.scrollTo({ top: maxY * point, behavior: 'instant' })
      await delay(200)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    await delay(180)
  })

  return page.evaluate(() => {
    const count = (selector) => document.querySelectorAll(selector).length
    const normalizeText = (value) => (value ?? '').replace(/\s+/g, ' ').trim().slice(0, 90)

    const interactiveSamples = Array.from(
      document.querySelectorAll(
        'button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"], [role="menuitem"], [role="switch"], [role="checkbox"], [role="radio"]',
      ),
    )
      .slice(0, 320)
      .map((element) => {
        const className = typeof element.className === 'string' ? element.className : ''
        const classHint = className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .join('.')
        return {
          tag: element.tagName.toLowerCase(),
          role: element.getAttribute('role') ?? '',
          type: element.getAttribute('type') ?? '',
          marker: element.getAttribute('data-marker') ?? element.getAttribute('data-testid') ?? '',
          text: normalizeText(element.getAttribute('aria-label') ?? element.textContent ?? ''),
          classHint,
        }
      })

    const markerCounts = new Map()
    const markerNodes = Array.from(document.querySelectorAll('[data-marker]')).slice(0, 900)
    for (const node of markerNodes) {
      const marker = node.getAttribute('data-marker')
      if (!marker) {
        continue
      }
      markerCounts.set(marker, (markerCounts.get(marker) ?? 0) + 1)
    }

    const topMarkers = Array.from(markerCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([name, value]) => ({ name, value }))

    const headingsH1 = Array.from(document.querySelectorAll('h1'))
      .slice(0, 4)
      .map((heading) => normalizeText(heading.textContent))
      .filter(Boolean)

    const headingsH2 = Array.from(document.querySelectorAll('h2'))
      .slice(0, 8)
      .map((heading) => normalizeText(heading.textContent))
      .filter(Boolean)

    const links = Array.from(document.querySelectorAll('a[href]'))
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => Boolean(href))
      .slice(0, 650)

    return {
      title: normalizeText(document.title),
      h1: headingsH1,
      h2: headingsH2,
      uiCounts: {
        buttons: count('button, [role="button"], input[type="button"], input[type="submit"]'),
        links: count('a[href]'),
        inputs: count('input:not([type="hidden"])'),
        selects: count('select'),
        textareas: count('textarea'),
        checkboxes: count('input[type="checkbox"], [role="checkbox"]'),
        radios: count('input[type="radio"], [role="radio"]'),
        switches: count('[role="switch"]'),
        tabs: count('[role="tab"], [class*="tab"]'),
        chips: count('[class*="chip"], [class*="tag"], [class*="badge"]'),
        cards: count('article, [class*="card"], [data-marker*="item"], [class*="snippet"]'),
        dialogs: count('[role="dialog"], [aria-modal="true"], [class*="modal"], [class*="popup"]'),
        menus: count('[role="menu"], [class*="menu"], [class*="dropdown"]'),
        tooltips: count('[role="tooltip"], [class*="tooltip"]'),
        tables: count('table, [role="table"], [class*="table"]'),
        pagination: count('[class*="pagination"], [data-marker*="pagination"]'),
        breadcrumbs: count('[class*="breadcrumb"], [data-marker*="breadcrumbs"]'),
        banners: count('[class*="banner"], [class*="promo"], [data-marker*="banner"]'),
        sliders: count('input[type="range"], [class*="slider"], [data-marker*="slider"]'),
        datePickers: count('input[type="date"], [class*="datepicker"], [class*="calendar"]'),
        uploaders: count('input[type="file"], [class*="upload"]'),
        favorites: count('[data-marker*="favorite"], [class*="favorite"]'),
        maps: count('[class*="map"], [data-marker*="map"]'),
        galleries: count('[class*="gallery"], [class*="carousel"], [class*="swiper"], [data-marker*="gallery"]'),
      },
      structures: {
        headers: count('header, [role="banner"]'),
        navs: count('nav, [role="navigation"]'),
        asides: count('aside, [role="complementary"]'),
        mains: count('main, [role="main"]'),
        footers: count('footer, [role="contentinfo"]'),
      },
      interactiveSamples,
      topMarkers,
      internalLinks: links,
    }
  })
}

function mergeSnapshots(baseSnapshot, postSnapshot) {
  if (!postSnapshot) {
    return baseSnapshot
  }

  const markerTotals = new Map()
  for (const marker of baseSnapshot.topMarkers) {
    markerTotals.set(marker.name, (markerTotals.get(marker.name) ?? 0) + marker.value)
  }
  for (const marker of postSnapshot.topMarkers) {
    markerTotals.set(marker.name, (markerTotals.get(marker.name) ?? 0) + marker.value)
  }

  const sampleMap = new Map()
  for (const sample of [...baseSnapshot.interactiveSamples, ...postSnapshot.interactiveSamples]) {
    const signature = [sample.tag, sample.role, sample.type, sample.marker || sample.classHint || 'n/a'].join('|')
    if (!sampleMap.has(signature)) {
      sampleMap.set(signature, sample)
    }
  }

  return {
    title: postSnapshot.title || baseSnapshot.title,
    h1: [...new Set([...(baseSnapshot.h1 ?? []), ...(postSnapshot.h1 ?? [])])].slice(0, 6),
    h2: [...new Set([...(baseSnapshot.h2 ?? []), ...(postSnapshot.h2 ?? [])])].slice(0, 10),
    uiCounts: maxCounts(baseSnapshot.uiCounts, postSnapshot.uiCounts),
    structures: maxCounts(baseSnapshot.structures, postSnapshot.structures),
    interactiveSamples: Array.from(sampleMap.values()).slice(0, 320),
    topMarkers: Array.from(markerTotals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([name, value]) => ({ name, value })),
    internalLinks: [...new Set([...(baseSnapshot.internalLinks ?? []), ...(postSnapshot.internalLinks ?? [])])].slice(0, 700),
  }
}

async function findFirstVisibleTarget(page, selectors) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first()
    const count = await locator.count().catch(() => 0)
    if (count === 0) {
      continue
    }
    const visible = await locator.isVisible().catch(() => false)
    if (!visible) {
      continue
    }
    return { locator, selector }
  }
  return null
}

async function runActionOnTarget(target, action) {
  await target.locator.scrollIntoViewIfNeeded().catch(() => null)
  if (action === 'hover') {
    await target.locator.hover({ timeout: 2_500 })
    return
  }
  if (action === 'focus') {
    await target.locator.focus({ timeout: 2_500 })
    return
  }
  await target.locator.click({ timeout: 2_500 })
}

async function runManualScenarios({ page, modeName, pageNumber, pageSlug, role }) {
  const roleSpecific = ROLE_SCENARIOS[role] ?? []
  const scenarios = [...COMMON_SCENARIOS, ...roleSpecific]
  const results = []

  for (const scenario of scenarios) {
    const target = await findFirstVisibleTarget(page, scenario.selectors)
    if (!target) {
      results.push({
        id: scenario.id,
        action: scenario.action,
        status: 'skip',
        selector: '',
        beforeUrl: page.url(),
        afterUrl: page.url(),
        error: '',
      })
      continue
    }

    const beforeUrl = page.url()
    let status = 'ok'
    let error = ''

    try {
      await runActionOnTarget(target, scenario.action)
      await page.waitForTimeout(320)

      const stateShotName = `${modeName}-${String(pageNumber).padStart(3, '0')}-${pageSlug}-state-${scenario.id}.png`
      await page.screenshot({ path: path.join(STATE_SCREENSHOT_DIR, stateShotName), fullPage: false })
    } catch (caughtError) {
      status = 'error'
      error = String(caughtError)
    }

    const afterUrl = page.url()
    if (afterUrl !== beforeUrl) {
      await page.goBack({ waitUntil: 'domcontentloaded', timeout: 8_000 }).catch(() => null)
      await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => null)
    }

    results.push({
      id: scenario.id,
      action: scenario.action,
      status,
      selector: target.selector,
      beforeUrl,
      afterUrl,
      error,
    })
  }

  return results
}

function manualStatsFromScenarios(results) {
  const total = results.length
  const success = results.filter((row) => row.status === 'ok').length
  const skipped = results.filter((row) => row.status === 'skip').length
  const errors = results.filter((row) => row.status === 'error').length
  return { total, success, skipped, errors }
}

async function crawlMode({ browser, modeName, contextOptions, seedUrls, maxPages, maxDepth, followLinks, role }) {
  const context = await browser.newContext(contextOptions)

  const queue = []
  const queued = new Set()
  const visited = new Set()
  const pages = []

  for (const url of seedUrls) {
    const normalized = normalizeUrl(url)
    if (!normalized || queued.has(normalized)) {
      continue
    }
    queue.push({ url: normalized, depth: 0 })
    queued.add(normalized)
  }

  while (queue.length > 0 && pages.length < maxPages) {
    const current = queue.shift()
    if (!current || visited.has(current.url)) {
      continue
    }

    const page = await context.newPage()
    let snapshot = null
    let status = null
    let finalUrl = current.url
    let error = null
    let manualScenarios = []
    let manualScenarioStats = { total: 0, success: 0, skipped: 0, errors: 0 }

    try {
      const response = await page.goto(current.url, { waitUntil: 'domcontentloaded', timeout: 75_000 })
      status = response?.status() ?? null
      await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => null)

      const normalizedFinalUrl = normalizeUrl(page.url())
      if (normalizedFinalUrl) {
        finalUrl = normalizedFinalUrl
      }

      const pageSlug = slugify(finalUrl)
      const baseSnapshot = await capturePageSnapshot(page)

      if (MANUAL_SCENARIOS_ENABLED) {
        manualScenarios = await runManualScenarios({
          page,
          modeName,
          pageNumber: pages.length + 1,
          pageSlug,
          role,
        })
        manualScenarioStats = manualStatsFromScenarios(manualScenarios)
      }

      const postSnapshot = MANUAL_SCENARIOS_ENABLED ? await capturePageSnapshot(page) : null
      snapshot = mergeSnapshots(baseSnapshot, postSnapshot)

      const screenshotName = `${modeName}-${String(pages.length + 1).padStart(3, '0')}-${pageSlug}.png`
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, screenshotName), fullPage: false })

      if (followLinks && current.depth < maxDepth) {
        for (const link of snapshot.internalLinks) {
          const normalizedLink = normalizeUrl(link, finalUrl)
          if (!normalizedLink || visited.has(normalizedLink) || queued.has(normalizedLink)) {
            continue
          }
          queue.push({ url: normalizedLink, depth: current.depth + 1 })
          queued.add(normalizedLink)
        }
      }
    } catch (caughtError) {
      error = String(caughtError)
    } finally {
      await page.close()
    }

    visited.add(current.url)
    if (finalUrl) {
      visited.add(finalUrl)
    }

    pages.push({
      mode: modeName,
      role,
      url: finalUrl,
      sourceUrl: current.url,
      depth: current.depth,
      status,
      error,
      snapshot,
      manualScenarios,
      manualScenarioStats,
    })

    process.stdout.write(`\r[${role}/${modeName}] scanned: ${pages.length}/${maxPages}`)
  }

  process.stdout.write('\n')
  await context.close()
  return pages
}

function aggregateUiStats(pages) {
  const totals = {}
  const structureTotals = {}
  const markerTotals = new Map()
  const sampleSignatures = new Map()
  const manualTotals = { total: 0, success: 0, skipped: 0, errors: 0 }

  for (const page of pages) {
    manualTotals.total += page.manualScenarioStats?.total ?? 0
    manualTotals.success += page.manualScenarioStats?.success ?? 0
    manualTotals.skipped += page.manualScenarioStats?.skipped ?? 0
    manualTotals.errors += page.manualScenarioStats?.errors ?? 0

    if (!page.snapshot) {
      continue
    }

    for (const [key, value] of Object.entries(page.snapshot.uiCounts)) {
      totals[key] = (totals[key] ?? 0) + value
    }

    for (const [key, value] of Object.entries(page.snapshot.structures)) {
      structureTotals[key] = (structureTotals[key] ?? 0) + value
    }

    for (const marker of page.snapshot.topMarkers) {
      markerTotals.set(marker.name, (markerTotals.get(marker.name) ?? 0) + marker.value)
    }

    for (const sample of page.snapshot.interactiveSamples) {
      const signature = [sample.tag, sample.role, sample.type, sample.marker || sample.classHint || 'n/a'].join('|')
      if (!sampleSignatures.has(signature)) {
        sampleSignatures.set(signature, sample)
      }
    }
  }

  const topMarkers = Array.from(markerTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 60)
    .map(([name, value]) => ({ name, value }))

  return {
    totals,
    structureTotals,
    topMarkers,
    manualTotals,
    uniqueInteractiveSamples: Array.from(sampleSignatures.values()).slice(0, 180),
  }
}

function buildCoverageReport(aggregated, storybookInventory) {
  const families = [
    {
      key: 'dialogs',
      title: 'Modal / Dialog / Popup',
      signal: aggregated.totals.dialogs ?? 0,
      requiredKeywords: ['modal', 'dialog', 'drawer', 'popup', 'sheet'],
      recommendation: 'Добавить `Core/Overlays`: Modal, Drawer, BottomSheet, ConfirmDialog.',
    },
    {
      key: 'menus',
      title: 'Dropdown / Menu / Context actions',
      signal: aggregated.totals.menus ?? 0,
      requiredKeywords: ['dropdown', 'menu', 'popover', 'context'],
      recommendation: 'Добавить `Core/Menus`: Dropdown, ContextMenu, ActionMenu, Popover.',
    },
    {
      key: 'tooltips',
      title: 'Tooltip / Helper hints',
      signal: aggregated.totals.tooltips ?? 0,
      requiredKeywords: ['tooltip', 'hint'],
      recommendation: 'Добавить `Core/Overlays`: Tooltip и RichTooltip.',
    },
    {
      key: 'tables',
      title: 'Table / Data grid',
      signal: aggregated.totals.tables ?? 0,
      requiredKeywords: ['table', 'grid'],
      recommendation: 'Добавить `Core/Data Display`: Table, Row actions, Empty/Loading row states.',
    },
    {
      key: 'datePickers',
      title: 'Date / Calendar controls',
      signal: aggregated.totals.datePickers ?? 0,
      requiredKeywords: ['date', 'calendar'],
      recommendation: 'Добавить `Core/Date & Time`: DatePicker, DateRange, InlineCalendar.',
    },
    {
      key: 'sliders',
      title: 'Range / Slider controls',
      signal: aggregated.totals.sliders ?? 0,
      requiredKeywords: ['slider', 'range'],
      recommendation: 'Добавить `Core/Controls`: RangeSlider и PriceRange.',
    },
    {
      key: 'uploaders',
      title: 'File upload',
      signal: aggregated.totals.uploaders ?? 0,
      requiredKeywords: ['upload', 'file'],
      recommendation: 'Добавить `Core/Forms`: FileUpload, PhotoUploader, DragAndDropUpload.',
    },
    {
      key: 'galleries',
      title: 'Gallery / Carousel',
      signal: aggregated.totals.galleries ?? 0,
      requiredKeywords: ['gallery', 'carousel', 'swiper'],
      recommendation: 'Добавить `Market/Media`: ImageGallery, ThumbnailRail, ZoomViewer.',
    },
    {
      key: 'maps',
      title: 'Map / Geo widgets',
      signal: aggregated.totals.maps ?? 0,
      requiredKeywords: ['map', 'geo'],
      recommendation: 'Добавить `Market/Geo`: MapBlock, GeoPin, RadiusFilter.',
    },
    {
      key: 'footers',
      title: 'Footer surface blocks',
      signal: aggregated.structureTotals.footers ?? 0,
      requiredKeywords: ['footer'],
      recommendation: 'Добавить `Core/Layout`: Footer, LinkColumns, Legal strip.',
    },
  ]

  return families
    .filter((family) => family.signal > 0)
    .map((family) => {
      const hasCoverage = coverageHasKeyword(storybookInventory, family.requiredKeywords)
      return {
        ...family,
        status: hasCoverage ? 'covered' : 'missing',
      }
    })
}

async function writeReports({ pages, aggregated, coverageRows, storybookInventory, role }) {
  const csvRows = pages.map((page) => {
    const counts = page.snapshot?.uiCounts ?? {}
    return {
      role,
      mode: page.mode,
      url: page.url,
      status: page.status ?? '',
      error: page.error ?? '',
      title: page.snapshot?.title ?? '',
      h1: (page.snapshot?.h1 ?? []).join(' | '),
      buttons: counts.buttons ?? 0,
      links: counts.links ?? 0,
      inputs: counts.inputs ?? 0,
      selects: counts.selects ?? 0,
      textareas: counts.textareas ?? 0,
      checkboxes: counts.checkboxes ?? 0,
      radios: counts.radios ?? 0,
      switches: counts.switches ?? 0,
      tabs: counts.tabs ?? 0,
      chips: counts.chips ?? 0,
      cards: counts.cards ?? 0,
      dialogs: counts.dialogs ?? 0,
      menus: counts.menus ?? 0,
      tooltips: counts.tooltips ?? 0,
      tables: counts.tables ?? 0,
      pagination: counts.pagination ?? 0,
      breadcrumbs: counts.breadcrumbs ?? 0,
      banners: counts.banners ?? 0,
      sliders: counts.sliders ?? 0,
      datePickers: counts.datePickers ?? 0,
      uploaders: counts.uploaders ?? 0,
      favorites: counts.favorites ?? 0,
      maps: counts.maps ?? 0,
      galleries: counts.galleries ?? 0,
      manualScenariosTotal: page.manualScenarioStats?.total ?? 0,
      manualScenariosSuccess: page.manualScenarioStats?.success ?? 0,
      manualScenariosSkipped: page.manualScenarioStats?.skipped ?? 0,
      manualScenariosErrors: page.manualScenarioStats?.errors ?? 0,
    }
  })

  const inventoryCsvPath = path.join(OUTPUT_DIR, 'avito-ui-inventory.csv')
  await fs.writeFile(inventoryCsvPath, toCsv(csvRows), 'utf8')

  const rawJsonPath = path.join(OUTPUT_DIR, 'avito-pages.json')
  await fs.writeFile(rawJsonPath, JSON.stringify(pages, null, 2), 'utf8')

  const summaryJsonPath = path.join(OUTPUT_DIR, 'avito-summary.json')
  await fs.writeFile(
    summaryJsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        role,
        pagesScanned: pages.length,
        totals: aggregated.totals,
        structures: aggregated.structureTotals,
        topMarkers: aggregated.topMarkers,
        manualScenarios: aggregated.manualTotals,
        storybookTitles: storybookInventory.titles,
        coverageRows,
      },
      null,
      2,
    ),
    'utf8',
  )

  const missingRows = coverageRows.filter((row) => row.status === 'missing')
  const failedPages = pages.filter((page) => page.error)
  const topRichPages = [...pages]
    .filter((page) => page.snapshot)
    .sort((a, b) => {
      const aScore = Object.values(a.snapshot.uiCounts).reduce((sum, value) => sum + value, 0)
      const bScore = Object.values(b.snapshot.uiCounts).reduce((sum, value) => sum + value, 0)
      return bScore - aScore
    })
    .slice(0, 12)

  const markdown = [
    '# Avito UI Gap Analysis',
    '',
    `- Role: **${role}**`,
    `- Generated: ${new Date().toISOString()}`,
    `- Pages scanned: **${pages.length}**`,
    `- Failed pages: **${failedPages.length}**`,
    `- Manual scenarios enabled: **${MANUAL_SCENARIOS_ENABLED ? 'yes' : 'no'}**`,
    `- Manual scenarios success: **${aggregated.manualTotals.success}/${aggregated.manualTotals.total}**`,
    `- Desktop/mobile screenshots: **${SCREENSHOT_DIR}**`,
    `- State screenshots (click/hover/focus): **${STATE_SCREENSHOT_DIR}**`,
    '',
    '## Current Storybook Coverage (source)',
    '',
    ...storybookInventory.titles.map((title) => `- ${title}`),
    '',
    '## Aggregated Avito UI Signals',
    '',
    ...Object.entries(aggregated.totals)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => `- ${key}: **${value}**`),
    '',
    '## Most UI-dense Pages',
    '',
    ...topRichPages.map((page) => `- ${page.mode}: ${page.url}`),
    '',
    '## Coverage Decision',
    '',
    ...coverageRows.map((row) => `- ${row.status.toUpperCase()}: ${row.title} (signal=${row.signal})`),
    '',
    '## Missing Categories To Add Next',
    '',
    ...(missingRows.length > 0 ? missingRows.map((row) => `- ${row.recommendation}`) : ['- По текущему crawl критичных пробелов не найдено.']),
    '',
    '## Top data-marker References',
    '',
    ...aggregated.topMarkers.map((item) => `- ${item.name}: ${item.value}`),
    '',
    '## Failed URLs',
    '',
    ...(failedPages.length > 0
      ? failedPages.map((page) => `- ${page.mode}: ${page.sourceUrl} -> ${page.error}`)
      : ['- Нет ошибок при обходе.']),
    '',
  ].join('\n')

  const reportPath = path.join(OUTPUT_DIR, 'storybook-gap-report.md')
  await fs.writeFile(reportPath, markdown, 'utf8')

  return {
    inventoryCsvPath,
    rawJsonPath,
    summaryJsonPath,
    reportPath,
  }
}

async function main() {
  if (REQUIRE_AUTH && !fsSync.existsSync(AUTH_STATE_PATH)) {
    throw new Error(`Auth state not found: ${AUTH_STATE_PATH}\nСначала выполните: npm run avito:auth:${roleLabel(ROLE)}`)
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true })
  if (MANUAL_SCENARIOS_ENABLED) {
    await fs.mkdir(STATE_SCREENSHOT_DIR, { recursive: true })
  }

  const storybookInventory = await collectStorybookInventory()

  const browser = await chromium.launch({
    headless: process.env.AVITO_HEADLESS !== '0',
    channel: process.env.AVITO_BROWSER_CHANNEL ?? 'chrome',
  })

  const seedUrls = resolveSeedUrls(ROLE)

  const desktopPages = await crawlMode({
    browser,
    role: roleLabel(ROLE),
    modeName: 'desktop',
    contextOptions: {
      viewport: { width: 1440, height: 920 },
      locale: 'ru-RU',
      storageState: fsSync.existsSync(AUTH_STATE_PATH) ? AUTH_STATE_PATH : undefined,
    },
    seedUrls,
    maxPages: MAX_PAGES,
    maxDepth: MAX_DEPTH,
    followLinks: true,
  })

  const desktopUrls = desktopPages
    .filter((page) => page.status && page.status < 500)
    .map((page) => page.url)
    .slice(0, MOBILE_SAMPLE_LIMIT)

  const mobilePages = await crawlMode({
    browser,
    role: roleLabel(ROLE),
    modeName: 'mobile',
    contextOptions: {
      ...devices['iPhone 13'],
      locale: 'ru-RU',
      storageState: fsSync.existsSync(AUTH_STATE_PATH) ? AUTH_STATE_PATH : undefined,
    },
    seedUrls: desktopUrls.length > 0 ? desktopUrls : seedUrls,
    maxPages: MOBILE_SAMPLE_LIMIT,
    maxDepth: 0,
    followLinks: false,
  })

  await browser.close()

  const allPages = [...desktopPages, ...mobilePages]
  const aggregated = aggregateUiStats(allPages)
  const coverageRows = buildCoverageReport(aggregated, storybookInventory)
  const reportFiles = await writeReports({
    pages: allPages,
    aggregated,
    coverageRows,
    storybookInventory,
    role: roleLabel(ROLE),
  })

  console.log('\nAudit complete. Reports:')
  console.log(`- CSV: ${reportFiles.inventoryCsvPath}`)
  console.log(`- Raw pages: ${reportFiles.rawJsonPath}`)
  console.log(`- Summary: ${reportFiles.summaryJsonPath}`)
  console.log(`- Gap report: ${reportFiles.reportPath}`)
}

await main()
