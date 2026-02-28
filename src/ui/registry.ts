import rawCatalog from './catalog.json'
import type { UiCatalog, UiScreenPayload, UiWidgetEnvelope } from './contracts'

const catalog = rawCatalog as UiCatalog

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function storyIdFromParts(title: string, storyExport: string): string {
  const titleSlug = slugify(title.replace(/\//g, '-'))
  const storySlug = slugify(storyExport.replace(/([a-z0-9])([A-Z])/g, '$1-$2'))
  return `${titleSlug}--${storySlug}`
}

const widgetMap = new Map(catalog.widgets.map((widget) => [widget.widget_type, widget]))

export const UI_CATALOG = catalog

export const UI_WIDGET_TYPES = catalog.widgets.map((widget) => widget.widget_type)

export function getWidgetSpec(widgetType: string) {
  return widgetMap.get(widgetType)
}

export function getStorybookPath(widgetType: string): string | null {
  const spec = getWidgetSpec(widgetType)
  if (!spec) {
    return null
  }
  const storyId = spec.storybook.story_id ?? storyIdFromParts(spec.storybook.title, spec.storybook.story_export)
  return `?path=/story/${storyId}`
}

export function getStorybookUrl(widgetType: string): string | null {
  const path = getStorybookPath(widgetType)
  if (!path) {
    return null
  }
  return `${catalog.storybook_public_base_url}${path}`
}

export function listWidgetTypesForSlot(slot: string): string[] {
  return catalog.widgets.filter((widget) => widget.slots.includes(slot)).map((widget) => widget.widget_type)
}

export function validateWidgetEnvelope(widget: UiWidgetEnvelope): string[] {
  const errors: string[] = []
  const spec = getWidgetSpec(widget.widget_type)

  if (!spec) {
    errors.push(`Unknown widget_type: ${widget.widget_type}`)
    return errors
  }

  if (!spec.slots.includes(widget.slot)) {
    errors.push(`Widget ${widget.widget_type} cannot be used in slot ${widget.slot}`)
  }

  if (!spec.states.includes(widget.state)) {
    errors.push(`State ${widget.state} is not allowed for ${widget.widget_type}`)
  }

  for (const requiredField of spec.data_fields.required) {
    if (!(requiredField in widget.data)) {
      errors.push(`Widget ${widget.widget_type} is missing required data field: ${requiredField}`)
    }
  }

  for (const action of widget.actions ?? []) {
    if (!spec.action_types.includes(action.type)) {
      errors.push(`Action type ${action.type} is not allowed for ${widget.widget_type}`)
    }
  }

  return errors
}

export function validateScreenPayload(payload: UiScreenPayload): string[] {
  const errors: string[] = []

  if (!payload.screen || typeof payload.screen !== 'string') {
    errors.push('screen must be a non-empty string')
  }

  if (!payload.screen_version || typeof payload.screen_version !== 'string') {
    errors.push('screen_version must be a non-empty string')
  }

  if (!Array.isArray(payload.widgets)) {
    errors.push('widgets must be an array')
    return errors
  }

  payload.widgets.forEach((widget, index) => {
    const widgetErrors = validateWidgetEnvelope(widget)
    for (const error of widgetErrors) {
      errors.push(`widgets[${index}]: ${error}`)
    }
  })

  return errors
}
