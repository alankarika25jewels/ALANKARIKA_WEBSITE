"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  BASE_CURRENCY,
  CURRENCIES,
  STORAGE_KEY,
  currencyFromBrowser,
  isCurrencyCode,
  type CurrencyCode,
} from '@/lib/currencies'

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  rates: Record<string, number>
  ratesLoading: boolean
  /** Convert stored INR price → selected currency */
  convert: (amountINR: number) => number
  /** Convert selected currency → INR (for orders/payment) */
  toINR: (amount: number) => number
  formatPrice: (amountINR: number, options?: { compact?: boolean }) => string
  formatAmount: (amountInCurrency: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}

const FALLBACK_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  SGD: 0.016,
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(BASE_CURRENCY)
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES)
  const [ratesLoading, setRatesLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  // Load saved currency or auto-detect (no permission prompt)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && isCurrencyCode(saved)) {
      setCurrencyState(saved)
      setInitialized(true)
      return
    }

    const detect = async () => {
      let detected: CurrencyCode = currencyFromBrowser()
      try {
        const res = await fetch('/api/geo-currency')
        const data = await res.json()
        if (data?.currency && isCurrencyCode(data.currency)) {
          detected = data.currency
        }
      } catch {
        // use browser fallback
      }
      setCurrencyState(detected)
      localStorage.setItem(STORAGE_KEY, detected)
      setInitialized(true)
    }

    detect()
  }, [])

  // Fetch exchange rates
  useEffect(() => {
    fetch('/api/exchange-rates')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates) setRates(data.rates)
      })
      .catch(() => {})
      .finally(() => setRatesLoading(false))
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const convert = useCallback(
    (amountINR: number) => {
      const rate = rates[currency] ?? 1
      return amountINR * rate
    },
    [currency, rates]
  )

  const toINR = useCallback(
    (amount: number) => {
      if (currency === 'INR') return amount
      const rate = rates[currency]
      if (!rate || rate <= 0) return amount
      return amount / rate
    },
    [currency, rates]
  )

  const formatAmount = useCallback(
    (amountInCurrency: number) => {
      const info = CURRENCIES[currency]
      return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: info.code,
        minimumFractionDigits: currency === 'INR' ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(amountInCurrency)
    },
    [currency]
  )

  const formatPrice = useCallback(
    (amountINR: number, options?: { compact?: boolean }) => {
      const converted = convert(amountINR)
      if (options?.compact && converted >= 1000) {
        const info = CURRENCIES[currency]
        return new Intl.NumberFormat(info.locale, {
          style: 'currency',
          currency: info.code,
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(converted)
      }
      return formatAmount(converted)
    },
    [convert, currency, formatAmount]
  )

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      rates,
      ratesLoading,
      convert,
      toINR,
      formatPrice,
      formatAmount,
    }),
    [currency, setCurrency, rates, ratesLoading, convert, toINR, formatPrice, formatAmount]
  )

  if (!initialized) {
    return (
      <CurrencyContext.Provider value={value}>
        {children}
      </CurrencyContext.Provider>
    )
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
