import Header from "@/components/header"
import ShopFilters from "@/components/shop-filters"
import ProductGrid from "@/components/product-grid"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
