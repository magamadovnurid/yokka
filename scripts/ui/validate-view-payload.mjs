import fs from 'node:fs/promises'
import path from 'node:path'

const PROJECT_ROOT = path.resolve('.')
const CATALOG_PATH = path.join(PROJECT_ROOT, 'contracts/ui-catalog.json')

const payloadArg = process.argv[2]
if (!payloadArg) {
  console.error('Usage: npm run contracts:validate-payload -- <path-to-payload.json>')
  process.exit(1)
}

const payloadPath = path.resolve(payloadArg)

function fail(errors) {
  console.error('Payload validation failed:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

async function main() {
  const catalog = JSON.parse(await fs.readFile(CATALOG_PATH, 'utf8'))
  const payload = JSON.parse(await fs.readFile(payloadPath, 'utf8'))

  const widgetMap = new Map(catalog.widgets.map((widget) => [widget.widget_type, widget]))
  const errors = []

  if (typeof payload.screen !== 'string' || payload.screen.length === 0) {
    errors.push('screen must be a non-empty string')
  }

  if (typeof payload.screen_version !== 'string' || payload.screen_version.length === 0) {
    errors.push('screen_version must be a non-empty string')
  }

  if (!Array.isArray(payload.widgets)) {
    errors.push('widgets must be an array')
    fail(errors)
  }

  for (const [index, widget] of payload.widgets.entries()) {
    const prefix = `widgets[${index}]`
    const spec = widgetMap.get(widget.widget_type)

    if (!spec) {
      errors.push(`${prefix}: unknown widget_type ${widget.widget_type}`)
      continue
    }

    if (!spec.slots.includes(widget.slot)) {
      errors.push(`${prefix}: slot ${widget.slot} is not allowed for ${widget.widget_type}`)
    }

    if (!spec.states.includes(widget.state)) {
      errors.push(`${prefix}: state ${widget.state} is not allowed for ${widget.widget_type}`)
    }

    if (typeof widget.data !== 'object' || widget.data === null || Array.isArray(widget.data)) {
      errors.push(`${prefix}: data must be an object`)
      continue
    }

    for (const requiredField of spec.data_fields.required) {
      if (!(requiredField in widget.data)) {
        errors.push(`${prefix}: missing required data field ${requiredField}`)
      }
    }

    if (Array.isArray(widget.actions)) {
      for (const [actionIndex, action] of widget.actions.entries()) {
        if (!spec.action_types.includes(action.type)) {
          errors.push(
            `${prefix}.actions[${actionIndex}]: action type ${action.type} is not allowed for ${widget.widget_type}`,
          )
        }
      }
    }
  }

  if (errors.length > 0) {
    fail(errors)
  }

  console.log(`Payload is valid: ${path.relative(PROJECT_ROOT, payloadPath)}`)
}

await main()
