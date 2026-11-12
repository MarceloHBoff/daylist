import assert from 'node:assert/strict'
import { test } from 'node:test'

import { parseTicketDate, zonedDayRange } from './timezone.ts'

test('datetime-local after 21h stays on the same day (the -3h bug)', () => {
  assert.equal(
    parseTicketDate('2026-11-12T21:30').toISOString(),
    '2026-11-13T00:30:00.000Z'
  )
  assert.equal(
    parseTicketDate('2026-11-12T23:59:00').toISOString(),
    '2026-11-13T02:59:00.000Z'
  )
  assert.equal(
    parseTicketDate('2026-11-30T22:00').toISOString(),
    '2026-12-01T01:00:00.000Z'
  )
})

test('instants pass through untouched', () => {
  assert.equal(
    parseTicketDate('2026-11-13T00:30:00.000Z').toISOString(),
    '2026-11-13T00:30:00.000Z'
  )
  assert.equal(
    parseTicketDate('2026-11-13T00:30:00+00:00').toISOString(),
    '2026-11-13T00:30:00.000Z'
  )
})

test('day range is the Sao Paulo calendar day', () => {
  assert.deepEqual(zonedDayRange(new Date('2026-11-13T00:30:00Z')), {
    gte: '2026-11-12T03:00:00.000Z',
    lt: '2026-11-13T03:00:00.000Z'
  })
})
