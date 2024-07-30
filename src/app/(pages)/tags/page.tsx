import { Metadata } from 'next'

import Tags from '@/pages/Tags'

export const metadata: Metadata = {
  title: 'Tags | Day List'
}

export default function TagsPage() {
  return <Tags />
}
