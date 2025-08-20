"use client"

import Header from "@/components/header"
import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import Footer from "@/components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetail productId={params.id} />
      <RelatedProducts />
      <Footer />
    </div>
  )
}
