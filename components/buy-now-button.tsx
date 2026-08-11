"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { saveBuyNowItem } from "@/lib/buy-now"
import { useRouter } from "next/navigation"

type BuyNowProduct = {
  _id: string
  name: string
  price: number
  originalPrice?: number
  images?: Array<{ url: string }>
  image?: string
  category: string
  brand?: string
  isOutOfStock?: boolean
  quantity?: number
}

export default function BuyNowButton({
  product,
  quantity = 1,
  className,
  disabled,
  children = "Buy Now",
}: {
  product: BuyNowProduct
  quantity?: number
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}) {
  const { requireAuth } = useAuth()
  const router = useRouter()
  const outOfStock = disabled || product.isOutOfStock || (product.quantity !== undefined && product.quantity <= 0)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return

    requireAuth(() => {
      saveBuyNowItem({
        id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image:
          product.image ||
          (product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"),
        category: product.category,
        brand: product.brand || "",
        quantity,
      })
      router.push("/checkout?mode=buynow")
    })
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={className}
    >
      {children}
    </Button>
  )
}
