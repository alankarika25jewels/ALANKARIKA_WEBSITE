export type StoreSettings = {
  shippingFee: number
  freeShippingThreshold: number
  giftEnabled: boolean
  giftFee: number
  taxRate: number
}

export const DEFAULT_SETTINGS: StoreSettings = {
  shippingFee: 0,
  freeShippingThreshold: 0,
  giftEnabled: true,
  giftFee: 0,
  taxRate: 0.18,
}
