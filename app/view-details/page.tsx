"use client"

import Header from "@/components/header"
import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import Footer from "@/components/footer"

export default function ViewDetailsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetail />
      <RelatedProducts />
      <Footer />
    </div>
  )
}
