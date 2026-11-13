import type { ImageField } from '@/types'

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function toNumber(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'string') {
    const n = parseFloat(value.replace(/[^0-9.-]/g, ''))
    return Number.isNaN(n) ? 0 : n
  }
  return 0
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatFee(raw: unknown): string {
  const v = getMetafieldValue(raw).trim()
  if (v === '') return ''
  const n = Number(v.replace(/[$,]/g, ''))
  return Number.isNaN(n) ? v : formatCurrency(n)
}

export function formatDate(raw: unknown): string {
  const value = getMetafieldValue(raw)
  if (!value) return ''
  const time = Date.parse(value)
  if (Number.isNaN(time)) return value
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  if (value.length <= 10) options.timeZone = 'UTC'
  return new Date(time).toLocaleDateString('en-US', options)
}

export function isUpcoming(raw: unknown): boolean {
  const time = Date.parse(getMetafieldValue(raw))
  if (Number.isNaN(time)) return true
  return time >= Date.now() - 24 * 60 * 60 * 1000
}

export type Flag = 'yes' | 'no' | 'unknown'

export function getFlag(field: unknown): Flag {
  if (field === true) return 'yes'
  if (field === false) return 'no'
  const v = getMetafieldValue(field).trim().toLowerCase()
  if (v === 'yes' || v === 'true' || v === 'y') return 'yes'
  if (v === 'no' || v === 'false' || v === 'n') return 'no'
  return 'unknown'
}

export function imgix(image: ImageField | undefined | null, params: string): string | undefined {
  if (!image || !image.imgix_url) return undefined
  return `${image.imgix_url}?${params}`
}

export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}