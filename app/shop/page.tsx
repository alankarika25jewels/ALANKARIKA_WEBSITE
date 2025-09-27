"use client"

import Navbar from "@/components/navbar"
import ShopFilters from "@/components/shop-filters"
import ProductGrid from "@/components/product-grid"
import { useProducts } from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const { products, loading, error } = useProducts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ShopFilters />
          </aside>
          <main className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-light text-gray-900">Shop Jewelry</h1>
              <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            {loading && products.length === 0 ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C4A484] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : error && products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-red-600 text-lg">Error loading products: {error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-[#C4A484] hover:bg-[#B39474]"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <ProductGrid />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
