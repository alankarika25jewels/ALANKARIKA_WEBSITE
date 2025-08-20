"use client"

import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import Footer from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-4">All Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of handcrafted jewelry pieces, each designed to make you shine bright.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <ProductFilters />
            </aside>
            <main className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">Showing 1-12 of 48 products</p>
                <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
              <ProductGrid />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
