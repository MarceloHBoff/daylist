import { Metadata } from 'next'

import TicketTags from '@/pages/TicketTags'

export const metadata: Metadata = {
  title: 'Ticket by Tag | Day List'
}

export default function TicketTagsPage() {
  return <TicketTags />
}
