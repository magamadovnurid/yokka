import type { PropsWithChildren } from 'react'

type TitleLevel = 1 | 2 | 3 | 4

type TextType = 'default' | 'secondary' | 'success' | 'warning' | 'danger'

interface TitleProps extends PropsWithChildren {
  level?: TitleLevel
}

interface TextProps extends PropsWithChildren {
  type?: TextType
  strong?: boolean
  code?: boolean
}

export function TypographyTitle({ children, level = 2 }: TitleProps) {
  const Tag = `h${level}` as const
  return <Tag className={`ds-ads-typography__title ds-ads-typography__title--h${level}`}>{children}</Tag>
}

export function TypographyText({ children, code = false, strong = false, type = 'default' }: TextProps) {
  return (
    <span className={`ds-ads-typography__text ds-ads-typography__text--${type} ${strong ? 'ds-ads-typography__text--strong' : ''} ${code ? 'ds-ads-typography__text--code' : ''}`}>
      {children}
    </span>
  )
}

export function TypographyParagraph({ children }: PropsWithChildren) {
  return <p className="ds-ads-typography__paragraph">{children}</p>
}
