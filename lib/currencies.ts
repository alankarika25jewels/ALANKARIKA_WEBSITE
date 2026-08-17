export const BASE_CURRENCY = 'INR' as const

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD'

export type CurrencyInfo = {
  code: CurrencyCode
  name: string
  symbol: string
  locale: string
  /** Smallest unit multiplier (100 = cents/paise) */
  minorUnit: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN', minorUnit: 100 },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', minorUnit: 100 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', minorUnit: 100 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', minorUnit: 100 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'en-AE', minorUnit: 100 },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', locale: 'en-SG', minorUnit: 100 },
}

export const CURRENCY_LIST = Object.values(CURRENCIES)

/** Map ISO country code → default store currency */
export const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
  SG: 'SGD',
  // Eurozone (common)
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
  AT: 'EUR', IE: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR',
  CA: 'USD', AU: 'USD', NZ: 'USD',
}

const LOCALE_TO_CURRENCY: Record<string, CurrencyCode> = {
  'en-in': 'INR', 'hi-in': 'INR',
  'en-us': 'USD', 'en-ca': 'USD', 'en-au': 'USD',
  'en-gb': 'GBP',
  'de': 'EUR', 'de-de': 'EUR', 'fr': 'EUR', 'fr-fr': 'EUR', 'it': 'EUR', 'es': 'EUR',
  'en-ae': 'AED', 'ar-ae': 'AED',
  'en-sg': 'SGD',
}

export function currencyFromCountry(countryCode?: string | null): CurrencyCode | null {
  if (!countryCode) return null
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] ?? null
}

export function currencyFromBrowser(): CurrencyCode {
  if (typeof window === 'undefined') return 'INR'

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'INR'
    if (tz.startsWith('Asia/Dubai')) return 'AED'
    if (tz.startsWith('Asia/Singapore')) return 'SGD'
    if (tz.startsWith('Europe/London')) return 'GBP'
    if (tz.startsWith('Europe/')) return 'EUR'
    if (tz.startsWith('America/')) return 'USD'
  } catch {
    // ignore
  }

  return currencyFromBrowserLocale(navigator.language || 'en-IN') ?? 'INR'
}

/** Map browser Accept-Language or navigator.language to currency (fallback only). */
export function currencyFromBrowserLocale(langHeader: string): CurrencyCode | null {
  const primary = langHeader.split(',')[0]?.trim().toLowerCase()
  if (!primary) return null

  if (LOCALE_TO_CURRENCY[primary]) return LOCALE_TO_CURRENCY[primary]

  if (primary.includes('en-in') || primary.startsWith('hi')) return 'INR'
  if (primary.includes('en-gb')) return 'GBP'
  if (primary.includes('en-us') || primary.includes('en-ca') || primary.includes('en-au')) return 'USD'
  if (primary.includes('de') || primary.includes('fr') || primary.includes('es') || primary.includes('it')) {
    return 'EUR'
  }
  if (primary.includes('ae')) return 'AED'
  if (primary.includes('sg')) return 'SGD'

  const base = primary.split('-')[0]
  if (LOCALE_TO_CURRENCY[base]) return LOCALE_TO_CURRENCY[base]

  return null
}

export function isCurrencyCode(value: string): value is CurrencyCode {
  return value in CURRENCIES
}

export const STORAGE_KEY = 'alankarika_currency_v2'
