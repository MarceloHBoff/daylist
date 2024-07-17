import { Metadata } from 'next'

import PageWrapper from '@/pages/PageWrapper'
import TicketTags from '@/pages/TicketTags'

export const metadata: Metadata = {
  title: 'Ticket by Tag | Day List'
}

export default function TicketTagsPage() {
  return (
    <PageWrapper>
      <TicketTags />
    </PageWrapper>
  )
}
