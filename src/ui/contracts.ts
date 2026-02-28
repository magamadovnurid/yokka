export type UiRole = 'guest' | 'buyer' | 'seller'

export type UiWidgetState =
  | 'default'
  | 'loading'
  | 'empty'
  | 'error'
  | 'disabled'
  | 'active'
  | 'hover'
  | 'focus'

export type UiActionType = 'navigate' | 'command' | 'dialog' | 'submit' | 'toggle' | 'open_url'

export interface UiAction {
  id: string
  type: UiActionType
  label?: string
  target?: string
  payload?: Record<string, unknown>
}

export interface UiWidgetEnvelope {
  widget_type: string
  schema_version: string
  slot: string
  state: UiWidgetState
  data: Record<string, unknown>
  actions?: UiAction[]
  tracking?: Record<string, unknown>
}

export interface UiScreenPayload {
  screen: string
  screen_version: string
  role?: UiRole
  widgets: UiWidgetEnvelope[]
}

export interface UiCatalogDataFields {
  required: string[]
  optional: string[]
}

export interface UiCatalogStoryRef {
  title: string
  story_export: string
  story_id?: string
  path?: string
  url?: string
}

export interface UiCatalogWidget {
  widget_type: string
  domain: 'Core' | 'Market' | 'Cabinet'
  component: string
  source: string
  storybook: UiCatalogStoryRef
  slots: string[]
  states: UiWidgetState[]
  roles: UiRole[]
  action_types: UiActionType[]
  data_fields: UiCatalogDataFields
  description: string
}

export interface UiCatalog {
  catalog_version: string
  updated_at: string
  storybook_public_base_url: string
  widgets: UiCatalogWidget[]
}
