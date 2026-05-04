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
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `${color}22`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {showIcon ? (
        <TagIcon color={color} />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {description}
    </span>
  )
}
