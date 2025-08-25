"use client"

import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  materials: string[]
  colors: string[]
  sizes: string[]
  isNew: boolean
  isOnSale: boolean
}

export default function ProductsPage() {
  const { products, loading } = useProducts()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState('featured')
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50000],
    materials: [],
    colors: [],
    sizes: [],
    isNew: false,
    isOnSale: false,
  })

  // Read category from URL and apply it to filters on page load
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && !filters.categories.includes(categoryFromUrl)) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryFromUrl]
      }))
    }
  }, [searchParams, filters.categories])

  // Apply filters to products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // New filter
    if (filters.isNew && !product.isNew) {
      return false
    }

    // Sale filter
    if (filters.isOnSale && !product.isOnSale) {
      return false
    }

    // Material filter (using category for now)
    if (filters.materials.length > 0 && !filters.materials.includes(product.category)) {
      return false
    }

    // Size filter (check if product has size constraints)
    if (filters.sizes.length > 0 && product.sizeConstraints) {
      const productSizes = product.sizeConstraints.split(',').map(s => s.trim())
      const hasMatchingSize = filters.sizes.some(size => productSizes.includes(size))
      if (!hasMatchingSize) {
        return false
      }
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++
    if (filters.materials.length > 0) count++
    if (filters.colors.length > 0) count++
    if (filters.sizes.length > 0) count++
    if (filters.isNew) count++
    if (filters.isOnSale) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 50000],
      materials: [],
      colors: [],
      sizes: [],
      isNew: false,
      isOnSale: false,
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Breadcrumb Navigation */}
          {filters.categories.length > 0 && (
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <a href="/products" className="hover:text-[#C4A484] transition-colors">
                  All Products
                </a>
                <span>/</span>
                <span className="text-gray-900 font-medium">{filters.categories[0]}</span>
              </nav>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              {filters.categories.length > 0 
                ? `${filters.categories[0]} Collection` 
                : 'All Products'
              }
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {filters.categories.length > 0 
                ? `Discover our exclusive collection of ${filters.categories[0].toLowerCase()} pieces, each designed to make you shine bright.`
                : 'Discover our complete collection of handcrafted jewelry pieces, each designed to make you shine bright.'
              }
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              {activeFiltersCount > 0 && (
                <span className="bg-[#C4A484] text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <ProductFilters 
                filters={filters}
                onFiltersChange={setFilters}
              />
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Highest Rated</option>
                      <option value="reviews">Most Reviewed</option>
                    </select>

                    {activeFiltersCount > 0 && (
                      <Button
                        onClick={clearAllFilters}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600">
                      {loading ? "Loading products..." : `Showing ${sortedProducts.length} of ${products.length} products`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C4A484] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or clearing all filters to see more products.
                  </p>
                  <Button onClick={clearAllFilters} className="bg-[#C4A484] hover:bg-[#B39474]">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          {product.isNew && (
                            <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">NEW</span>
                          )}
                          {product.isOnSale && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">SALE</span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                            <Filter className="w-4 h-4 text-gray-600" />
                          </button>
                          <a
                            href={`/view-details?id=${product._id}`}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                          >
                            <Filter className="w-4 h-4 text-gray-600" />
                          </a>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-2">
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Filter
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
                            )}
                            {product.isOnSale && product.offerPercentage && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                {product.offerPercentage}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              // Add to cart functionality would go here
                            }}
                          >
                            Add to Cart
                          </Button>
                          <a
                            href={`/view-details?id=${product._id}`}
                            className="flex-1"
                          >
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
