import type { SVGProps } from 'react'

export type IconName =
  | 'search'
  | 'location'
  | 'message'
  | 'heart'
  | 'bell'
  | 'user'
  | 'check'
  | 'warning'
  | 'info'
  | 'error'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'settings'
  | 'wallet'
  | 'box'
  | 'filter'
  | 'home'
  | 'grid'
  | 'chat'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

function Path({ name }: { name: IconName }) {
  switch (name) {
    case 'search':
      return (
        <>
          <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M20 20L16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )
    case 'location':
      return (
        <>
          <path d="M12 20s5-4.8 5-9a5 5 0 1 0-10 0c0 4.2 5 9 5 9z" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="11" r="1.7" fill="currentColor" />
        </>
      )
    case 'message':
      return <path d="M5 6h14v9H9l-4 3V6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    case 'heart':
      return <path d="M12 20s-7-4.5-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.5 12 20 12 20z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    case 'bell':
      return <path d="M12 4a4 4 0 0 1 4 4v3.5L18 14H6l2-2.5V8a4 4 0 0 1 4-4zm-1.8 12.5a1.8 1.8 0 0 0 3.6 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    case 'user':
      return (
        <>
          <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M5.5 19a6.5 6.5 0 0 1 13 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )
    case 'check':
      return <path d="M5 12.5l4.5 4L19 7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    case 'warning':
      return (
        <>
          <path d="M12 4l8 15H4L12 4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 9v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="15.8" r="1" fill="currentColor" />
        </>
      )
    case 'info':
      return (
        <>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 11v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </>
      )
    case 'error':
      return (
        <>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )
    case 'chevron-right':
      return <path d="M9 5l6 7-6 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    case 'chevron-left':
      return <path d="M15 5l-6 7 6 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    case 'chevron-down':
      return <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    case 'settings':
      return (
        <>
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 4v2.1M12 17.9V20M4 12h2.1M17.9 12H20M6.5 6.5l1.5 1.5M16 16l1.5 1.5M17.5 6.5L16 8M8 16l-1.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )
    case 'wallet':
      return <path d="M4.5 7h15v10h-15zM14 11h5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    case 'box':
      return (
        <>
          <path d="M12 4l7 4-7 4-7-4 7-4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M5 8v8l7 4 7-4V8" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 12v8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </>
      )
    case 'filter':
      return <path d="M4 6h16l-6 7v5l-4-2v-3L4 6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    case 'home':
      return <path d="M4 11l8-6 8 6v9h-5v-5H9v5H4v-9z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    case 'grid':
      return <path d="M5 5h6v6H5zm8 0h6v6h-6zM5 13h6v6H5zm8 0h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    case 'chat':
      return (
        <>
          <path d="M4 6h16v9H8l-4 3V6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )
    default:
      return null
  }
}

export function Icon({ className, name, size = 16, ...rest }: IconProps) {
  return (
    <span className={['ds-icon', className].filter(Boolean).join(' ')}>
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
        <Path name={name} />
      </svg>
    </span>
  )
}
