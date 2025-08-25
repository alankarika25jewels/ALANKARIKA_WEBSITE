"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import NecklaceSection from "@/components/necklace-section"
import PendantSection from "@/components/pendant-section"
import InstagramCarousel from "@/components/instagram-carousel"
import JewelryLayout from "@/components/jewelry-layout"
import FeaturedProducts from "@/components/featured-products"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useProducts } from "@/hooks/useProducts"

export default function Home() {
  const { addItem } = useCart()
  const { products, loading, error } = useProducts()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentGemsSlide, setCurrentGemsSlide] = useState(0)
  
  // Get real products from database
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(0, 12)
  const latestGems = products.slice(0, 8)
  
  // Show loading state if products are still loading
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C4A484] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show error state if there's an error
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error loading products: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#C4A484] hover:bg-[#B39474]"
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev: number) => prev === 0 ? newArrivals.length - 1 : prev - 1)
  }
  
  const handleNextSlide = () => {
    setCurrentSlide((prev: number) => prev === newArrivals.length - 1 ? 0 : prev + 1)
  }
  
  const handlePrevGemsSlide = () => {
    setCurrentGemsSlide((prev: number) => prev === 0 ? latestGems.length - 1 : prev - 1)
  }
  
  const handleNextGemsSlide = () => {
    setCurrentGemsSlide((prev: number) => prev === latestGems.length - 1 ? 0 : prev + 1)
  }

  const categories = [
    {
      id: 1,
      name: "Rings",
      count: products.filter(p => p.category === "Rings").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041278/7K0A0299_jboywk.jpg",
      href: "/categories/rings",
    },
    {
      id: 2,
      name: "Necklaces",
      count: products.filter(p => p.category === "Necklaces").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041775/RNK-387_mhmryo.jpg",
      href: "/categories/necklaces",
    },
    {
      id: 3,
      name: "Pendants",
      count: products.filter(p => p.category === "Pendants").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754042374/RP_2237_thzcn1.jpg",
      href: "/categories/earrings",
    },
    {
      id: 4,
      name: "Mangalsutra",
      count: products.filter(p => p.category === "Mangalsutra").length,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754040744/1J8A0224_kecmbm.jpg",
      href: "/categories/bracelets",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="relative min-h-screen overflow-hidden">
  {/* Video Background */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source
      src="https://res.cloudinary.com/djjj41z17/video/upload/v1754131132/bgvideorose_1_jodi47.mp4"
      type="video/mp4"
    />
  </video>

  {/* Navbar */}
  <div className="relative z-30 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
    <Navbar />
  </div>

  <div className="max-w-7xl px-4 lg:px-8 relative z-20 flex items-center justify-center min-h-screen">
    <div className="text-center text-white animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <h1 className="font-allura text-8xl lg:text-[12rem] mb-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        Alankarika
      </h1>
    </div>
  </div>
</section>

      {/* New Arrivals Section */}
      <section className="py-20" style={{ backgroundColor: '#F0E1B9FF' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-allura text-5xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>New Arrivals</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Discover our latest collection of exquisite jewelry pieces, crafted with precision and designed to make you shine.
              </p>
            </div>
           
          </div>

                    <div className="relative overflow-hidden">
            <div className="flex gap-8 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 320}px)` }}>
              {/* Debug: {newArrivals.length} products, Current slide: {currentSlide} */}
              {/* Create a circular carousel by duplicating items */}
              {loading ? (
                // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`loading-${index}`} className="animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
                      <div className="w-full h-80 bg-gray-300"></div>
                    </div>
                    <div className="mt-4 p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="flex space-x-3">
                        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : newArrivals.length === 0 ? (
                // Empty state
                <div className="text-center py-16">
                  <p className="text-gray-500">No products available</p>
                </div>
              ) : (
                [...newArrivals, ...newArrivals, ...newArrivals].map((product, index) => (
                  <div key={`${product._id}-${index}`} className="group animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + (index % newArrivals.length) * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Image
                        src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                      {product.isNew && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                            New
                          </div>
                        </div>
                      )}
                      {product.isOnSale && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold text-white">
                            {product.offerPercentage}% OFF
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">JEWELS BY LAHARI</p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {/* Action Buttons - Horizontal Layout Below Price */}
                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => addItem({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
                            category: product.category,
                            brand: "JEWELS BY LAHARI"
                          })}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/view-details?id=${product._id}`}>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation Arrows */}
            <div className="absolute inset-0 pointer-events-none">
              <button 
                onClick={() => {
                  console.log('Left arrow clicked, current slide:', currentSlide)
                  handlePrevSlide()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 cursor-pointer pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => {
                  console.log('Right arrow clicked, current slide:', currentSlide)
                  handleNextSlide()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 cursor-pointer pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                View All New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Gems Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-allura text-5xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Latest Gems</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Discover our most precious and exclusive gemstone jewelry collection, featuring rare stones and premium craftsmanship.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-8 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentGemsSlide * 320}px)` }}>
              {/* Create a circular carousel by duplicating items */}
              {loading ? (
                // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`loading-gems-${index}`} className="animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
                      <div className="w-full h-80 bg-gray-300"></div>
                    </div>
                    <div className="mt-4 p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="flex space-x-3">
                        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : latestGems.length === 0 ? (
                // Empty state
                <div className="text-center py-16">
                  <p className="text-gray-500">No products available</p>
                </div>
              ) : (
                [...latestGems, ...latestGems, ...latestGems].map((product, index) => (
                  <div key={`${product._id}-${index}`} className="group animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + (index % latestGems.length) * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Image
                        src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold text-white">
                          Premium
                        </div>
                      </div>
                      {product.isOnSale && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-semibold text-white">
                            {product.offerPercentage}% OFF
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">JEWELS BY LAHARI</p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {/* Action Buttons - Horizontal Layout Below Price */}
                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => addItem({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
                            category: product.category,
                            brand: "JEWELS BY LAHARI"
                          })}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link href={`/view-details?id=${product._id}`}>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation Arrows */}
            <div className="absolute inset-0 pointer-events-none">
              <button 
                onClick={() => {
                  console.log('Left gems arrow clicked, current slide:', currentGemsSlide)
                  handlePrevGemsSlide()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 cursor-pointer pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => {
                  console.log('Right gems arrow clicked, current slide:', currentGemsSlide)
                  handleNextGemsSlide()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 cursor-pointer pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                View All Latest Gems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h2 className="font-allura text-5xl font-light text-gray-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>About Alankarika</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  At Rose Jewels, we believe that jewelry is more than just an accessory—it's a reflection of your unique story,
                  your precious moments, and your personal style. For over two decades, we've been dedicated to creating
                  exquisite pieces that celebrate life's most beautiful moments.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  Our master craftsmen combine traditional techniques with modern innovation to create jewelry that stands
                  the test of time. Every piece is carefully designed and meticulously crafted using only the finest
                  materials, ensuring that your jewelry remains as beautiful as the day you first wore it.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg animate-fade-in-up transition-all duration-300 hover:scale-105" style={{ animationDelay: '1s' }}>
                  Learn More About Us
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Image
                src="/logoalan-removebg-preview.png"
                alt="Alankarika Logo"
                width={800}
                height={700}
                className="rounded-2xl shadow-lg object-contain animate-fade-in-up transition-all duration-300 hover:scale-105"
                style={{ animationDelay: '0.5s' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Premium Quality</p>
                    <p className="text-sm text-gray-600">Certified & Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Categories Section */}
      <section className="py-32 bg-white mt-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-allura text-5xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Explore our diverse collection of jewelry categories, each carefully curated to suit every style and occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/products?category=${encodeURIComponent(category.name)}`} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-white opacity-90">{category.count} Products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-allura text-5xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Discover our handpicked selection of the finest jewelry pieces, crafted with precision and designed to make you shine.
            </p>
          </div>

          {/* Instagram Style Carousel */}
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <FeaturedProducts />
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                Explore All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



     

      <Footer />
    </div>
  )
}
