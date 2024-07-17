import { Metadata } from 'next'

import PageWrapper from '@/pages/PageWrapper'
import Tags from '@/pages/Tags'

export const metadata: Metadata = {
  title: 'Tags | Day List'
}

export default function TagsPage() {
  return (
    <PageWrapper>
      <Tags />
    </PageWrapper>
  )
}
