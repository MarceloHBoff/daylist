import Select from '@/components/Form/Select'
import { useTags } from '@/hooks/tags'

export default function TagSelect() {
  const { data: tags } = useTags()

  if (!tags?.length) {
    return null
  }

  return <Select name="tagId" options={tags} />
}
