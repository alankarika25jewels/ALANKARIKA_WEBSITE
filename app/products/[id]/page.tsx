"use client"

import React from "react"
import Navbar from "@/components/navbar"
import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import Footer from "@/components/footer"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = React.use(params)

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <ProductDetail productId={id} />
      <RelatedProducts />
      <Footer />
    </div>
  )
}
