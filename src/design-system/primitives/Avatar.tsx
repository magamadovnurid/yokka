type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  name: string
  size?: AvatarSize
  online?: boolean
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ name, online = false, size = 'md' }: AvatarProps) {
  return (
    <span className={`ds-avatar ds-avatar--${size}`} title={name}>
      {getInitials(name)}
      {online ? <span className="ds-avatar__status" /> : null}
    </span>
  )
}
