import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const PROJECT_ROOT = path.resolve('.')
const REPORTS_ROOT = path.resolve('reports/avito-audit/roles')

const roles = [
  {
    id: 'seller',
    authState: path.resolve('.auth/avito-seller.json'),
    outputDir: path.resolve('reports/avito-audit/roles/seller'),
  },
  {
    id: 'buyer',
    authState: path.resolve('.auth/avito-buyer.json'),
    outputDir: path.resolve('reports/avito-audit/roles/buyer'),
  },
]

function runRoleAudit(role) {
  const env = {
    ...process.env,
    AVITO_ROLE: role.id,
    AVITO_AUTH_STATE: role.authState,
    AVITO_OUTPUT_DIR: role.outputDir,
  }

  const result = spawnSync('node', ['scripts/avito/run-audit.mjs'], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
    env,
  })

  if (result.status !== 0) {
    throw new Error(`Role audit failed for ${role.id}`)
  }
}

function sumTotals(left, right) {
  const output = { ...left }
  for (const [key, value] of Object.entries(right)) {
    output[key] = (output[key] ?? 0) + value
  }
  return output
}

function toMarkdownList(items) {
  if (items.length === 0) {
    return ['- нет']
  }
  return items.map((item) => `- ${item}`)
}

async function main() {
  await fsPromises.mkdir(REPORTS_ROOT, { recursive: true })

  for (const role of roles) {
    if (!fs.existsSync(role.authState)) {
      throw new Error(`Auth state not found for ${role.id}: ${role.authState}\nСначала выполните: npm run avito:auth:${role.id}`)
    }
  }

  for (const role of roles) {
    console.log(`\n=== Running role audit: ${role.id} ===`)
    runRoleAudit(role)
  }

  const summaries = {}
  for (const role of roles) {
    const summaryPath = path.join(role.outputDir, 'avito-summary.json')
    summaries[role.id] = JSON.parse(await fsPromises.readFile(summaryPath, 'utf8'))
  }

  const sellerMissing = summaries.seller.coverageRows.filter((row) => row.status === 'missing').map((row) => row.title)
  const buyerMissing = summaries.buyer.coverageRows.filter((row) => row.status === 'missing').map((row) => row.title)

  const unionMissing = [...new Set([...sellerMissing, ...buyerMissing])]
  const sellerOnlyMissing = sellerMissing.filter((item) => !buyerMissing.includes(item))
  const buyerOnlyMissing = buyerMissing.filter((item) => !sellerMissing.includes(item))
  const bothMissing = sellerMissing.filter((item) => buyerMissing.includes(item))

  const mergedTotals = sumTotals(summaries.seller.totals, summaries.buyer.totals)
  const mergedManual = sumTotals(summaries.seller.manualScenarios, summaries.buyer.manualScenarios)

  const comparison = {
    generatedAt: new Date().toISOString(),
    seller: {
      pagesScanned: summaries.seller.pagesScanned,
      missing: sellerMissing,
      totals: summaries.seller.totals,
      manualScenarios: summaries.seller.manualScenarios,
    },
    buyer: {
      pagesScanned: summaries.buyer.pagesScanned,
      missing: buyerMissing,
      totals: summaries.buyer.totals,
      manualScenarios: summaries.buyer.manualScenarios,
    },
    merged: {
      totals: mergedTotals,
      manualScenarios: mergedManual,
      missingUnion: unionMissing,
      missingBoth: bothMissing,
      missingSellerOnly: sellerOnlyMissing,
      missingBuyerOnly: buyerOnlyMissing,
    },
  }

  const jsonPath = path.join(REPORTS_ROOT, 'role-gap-comparison.json')
  await fsPromises.writeFile(jsonPath, JSON.stringify(comparison, null, 2), 'utf8')

  const markdown = [
    '# Avito Role Comparison (Seller vs Buyer)',
    '',
    `- Generated: ${comparison.generatedAt}`,
    `- Seller pages scanned: **${comparison.seller.pagesScanned}**`,
    `- Buyer pages scanned: **${comparison.buyer.pagesScanned}**`,
    `- Manual scenarios success (merged): **${comparison.merged.manualScenarios.success}/${comparison.merged.manualScenarios.total}**`,
    '',
    '## Missing In Both Roles',
    '',
    ...toMarkdownList(comparison.merged.missingBoth),
    '',
    '## Seller-only Missing',
    '',
    ...toMarkdownList(comparison.merged.missingSellerOnly),
    '',
    '## Buyer-only Missing',
    '',
    ...toMarkdownList(comparison.merged.missingBuyerOnly),
    '',
    '## Union Missing (P0 candidates)',
    '',
    ...toMarkdownList(comparison.merged.missingUnion),
    '',
    '## Merged UI Signals',
    '',
    ...Object.entries(comparison.merged.totals)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => `- ${key}: **${value}**`),
    '',
  ].join('\n')

  const markdownPath = path.join(REPORTS_ROOT, 'role-gap-comparison.md')
  await fsPromises.writeFile(markdownPath, markdown, 'utf8')

  console.log('\nRole audits completed:')
  console.log(`- ${jsonPath}`)
  console.log(`- ${markdownPath}`)
}

await main()
