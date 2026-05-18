import TagIcon from '@/components/TagIcon'

type TagBadgeProps = {
  color: string
  description: string
  showIcon?: boolean
}

export default function TagBadge({
  color,
  description,
  showIcon = false,
}: TagBadgeProps) {
  if (showIcon) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium"
        style={{
          backgroundColor: `${color}22`,
          color,
          border: `1px solid ${color}44`,
        }}
      >
        <TagIcon color={color} />
        {description}
      </span>
    )
  }

  return (
    <span
      className="inline-flex h-5 items-center gap-1.5 rounded-md px-1.5 text-[11px] font-medium uppercase tracking-wide"
      style={{
        backgroundColor: `${color}1f`,
        color,
        border: `1px solid ${color}33`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {description}
    </span>
  )
}
