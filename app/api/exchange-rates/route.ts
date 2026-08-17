import { NextResponse } from 'next/server'
import { BASE_CURRENCY, currencyFromCountry, type CurrencyCode } from '@/lib/currencies'

let cachedRates: { rates: Record<string, number>; fetchedAt: number } | null = null
const CACHE_MS = 60 * 60 * 1000 // 1 hour

export async function GET() {
  try {
    const now = Date.now()
    if (cachedRates && now - cachedRates.fetchedAt < CACHE_MS) {
      return NextResponse.json({
        success: true,
        base: BASE_CURRENCY,
        rates: cachedRates.rates,
        cached: true,
      })
    }

    const res = await fetch('https://open.er-api.com/v6/latest/INR', {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error('Rate provider unavailable')
    }

    const data = await res.json()
    const rates: Record<string, number> = { INR: 1 }

    if (data?.rates) {
      for (const [code, rate] of Object.entries(data.rates)) {
        rates[code] = Number(rate)
      }
    }

    cachedRates = { rates, fetchedAt: now }

    return NextResponse.json({
      success: true,
      base: BASE_CURRENCY,
      rates,
      cached: false,
    })
  } catch (error) {
    console.error('Exchange rates error:', error)
    return NextResponse.json({
      success: true,
      base: BASE_CURRENCY,
      rates: {
        INR: 1,
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.0095,
        AED: 0.044,
        SGD: 0.016,
      },
      fallback: true,
    })
  }
}

/** Convert INR amount to target currency using rate table */
export function convertFromINR(amountINR: number, to: CurrencyCode, rates: Record<string, number>) {
  const rate = rates[to] ?? 1
  return amountINR * rate
}

/** Convert display currency back to INR for payment storage */
export function convertToINR(amount: number, from: CurrencyCode, rates: Record<string, number>) {
  if (from === 'INR') return amount
  const rate = rates[from]
  if (!rate || rate <= 0) return amount
  return amount / rate
}

/** Payment minor units for Razorpay (paise/cents) */
export function toMinorUnits(amount: number, currency: CurrencyCode) {
  const info = { INR: 100, USD: 100, EUR: 100, GBP: 100, AED: 100, SGD: 100 }
  return Math.round(amount * (info[currency] ?? 100))
}

export type { CurrencyCode }
