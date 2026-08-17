"use client"

import { useCurrency } from "@/contexts/currency-context"

export default function PriceDisplay({
  amount,
  className,
  compact,
}: {
  /** Amount stored in INR (base currency) */
  amount: number
  className?: string
  compact?: boolean
}) {
  const { formatPrice } = useCurrency()
  return <span className={className}>{formatPrice(amount, { compact })}</span>
}
