import type { CartItem } from '@/contexts/cart-context'

export const BUY_NOW_KEY = 'buyNowItem'

export type BuyNowItem = CartItem

export function saveBuyNowItem(item: BuyNowItem) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify(item))
}

export function loadBuyNowItem(): BuyNowItem | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(BUY_NOW_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BuyNowItem
  } catch {
    return null
  }
}

export function clearBuyNowItem() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(BUY_NOW_KEY)
}

export function computeShippingFee(
  subtotal: number,
  shippingFee: number,
  freeShippingThreshold: number
) {
  if (shippingFee <= 0) return 0
  if (freeShippingThreshold > 0 && subtotal >= freeShippingThreshold) return 0
  return shippingFee
}
