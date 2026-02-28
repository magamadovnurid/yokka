import fs from 'node:fs/promises'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { chromium } from 'playwright'

const AUTH_STATE_PATH = path.resolve(process.env.AVITO_AUTH_STATE ?? '.auth/avito-user.json')
const START_URL = process.env.AVITO_START_URL ?? 'https://www.avito.ru/'
const AUTH_LABEL = process.env.AVITO_AUTH_LABEL ?? 'user'

await fs.mkdir(path.dirname(AUTH_STATE_PATH), { recursive: true })

const browser = await chromium.launch({
  headless: false,
  channel: process.env.AVITO_BROWSER_CHANNEL ?? 'chrome',
  slowMo: 50,
})

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: 'ru-RU',
})

const page = await context.newPage()
await page.goto(START_URL, { waitUntil: 'domcontentloaded', timeout: 90_000 })

console.log(`\n=== Avito Auth Capture (${AUTH_LABEL}) ===`)
console.log('1) В открывшемся окне войдите в ваш аккаунт Avito (если нужно).')
console.log('2) Пройдите в кабинет/сообщения, чтобы убедиться, что сессия авторизована.')
console.log('3) Вернитесь в терминал и нажмите Enter — я сохраню storageState.')

const rl = readline.createInterface({ input, output })
await rl.question('\nНажмите Enter после завершения авторизации: ')
rl.close()

await context.storageState({ path: AUTH_STATE_PATH })
await browser.close()

console.log(`\nГотово: storageState сохранён в ${AUTH_STATE_PATH}`)
if (AUTH_LABEL === 'seller' || AUTH_LABEL === 'buyer') {
  console.log(`Дальше запустите аудит роли: npm run avito:audit:${AUTH_LABEL}`)
} else {
  console.log('Дальше запустите: npm run avito:audit')
}
