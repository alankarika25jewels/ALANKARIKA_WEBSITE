import { NextRequest, NextResponse } from 'next/server'
import { currencyFromCountry, type CurrencyCode } from '@/lib/currencies'

export async function GET(request: NextRequest) {
  // Cloudflare / Vercel geo headers when available
  const country =
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-vercel-ip-country') ||
    null

  let currency: CurrencyCode = currencyFromCountry(country) ?? 'INR'

  // Accept-Language hint
  const acceptLang = request.headers.get('accept-language') || ''
  const primary = acceptLang.split(',')[0]?.trim().toLowerCase()
  if (primary) {
    if (primary.includes('en-us') || primary.includes('en-ca')) currency = 'USD'
    else if (primary.includes('en-gb')) currency = 'GBP'
    else if (primary.includes('en-in') || primary.includes('hi')) currency = 'INR'
    else if (primary.includes('de') || primary.includes('fr') || primary.includes('es') || primary.includes('it')) {
      currency = 'EUR'
    } else if (primary.includes('ae')) currency = 'AED'
    else if (primary.includes('sg')) currency = 'SGD'
  }

  // Optional IP lookup when no geo header (server-side, no browser prompt)
  if (!country) {
    try {
      const ipRes = await fetch('https://ipapi.co/json/', {
        headers: { 'User-Agent': 'Alankarika-Jewels/1.0' },
        signal: AbortSignal.timeout(3000),
      })
      if (ipRes.ok) {
        const geo = await ipRes.json()
        const fromGeo = currencyFromCountry(geo?.country_code)
        if (fromGeo) currency = fromGeo
      }
    } catch {
      // silent — client will use browser heuristics
    }
  }

  return NextResponse.json({ success: true, currency, country })
}
