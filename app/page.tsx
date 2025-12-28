"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import NecklaceSection from "@/components/necklace-section"
import PendantSection from "@/components/pendant-section"
import InstagramCarousel from "@/components/instagram-carousel"
import JewelryLayout from "@/components/jewelry-layout"

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
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0)
  
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
  
  // Calculate max slides - only allow navigation if there are more items than visible
  // Assuming ~3-4 items visible per screen width
  const maxNewArrivalsSlides = Math.max(0, newArrivals.length - 4)
  const maxGemsSlides = Math.max(0, latestGems.length - 4)
  const maxFeaturedSlides = Math.max(0, featuredProducts.length - 3)
  
  const handlePrevSlide = () => {
    if (newArrivals.length <= 4) return // Don't slide if all items are visible
    setCurrentSlide((prev: number) => prev === 0 ? maxNewArrivalsSlides : prev - 1)
  }
  
  const handleNextSlide = () => {
    if (newArrivals.length <= 4) return // Don't slide if all items are visible
    setCurrentSlide((prev: number) => prev >= maxNewArrivalsSlides ? 0 : prev + 1)
  }
  
  const handlePrevGemsSlide = () => {
    if (latestGems.length <= 4) return // Don't slide if all items are visible
    setCurrentGemsSlide((prev: number) => prev === 0 ? maxGemsSlides : prev - 1)
  }
  
  const handleNextGemsSlide = () => {
    if (latestGems.length <= 4) return // Don't slide if all items are visible
    setCurrentGemsSlide((prev: number) => prev >= maxGemsSlides ? 0 : prev + 1)
  }
  
  const handlePrevFeaturedSlide = () => {
    if (featuredProducts.length <= 3) return // Don't slide if all items are visible
    setCurrentFeaturedSlide((prev: number) => prev === 0 ? maxFeaturedSlides : prev - 1)
  }
  
  const handleNextFeaturedSlide = () => {
    if (featuredProducts.length <= 3) return // Don't slide if all items are visible
    setCurrentFeaturedSlide((prev: number) => prev >= maxFeaturedSlides ? 0 : prev + 1)
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
      {/* Navbar - Always visible */}
      <Navbar />
      
      {/* Top Section - Increased height */}
      <section className="h-16 md:h-20 bg-gradient-to-r from-[#FFFFFF] via-[#F5EEDC] to-[#8B7355]">
        <div className="h-full flex items-center justify-center px-4">
          <p className="text-[#010101] text-xs md:text-sm font-medium text-center">Welcome to Alankarika - Exquisite Jewelry Collection</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/2.jpg"
            alt="Alankarika Jewelry Collection"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl px-4 lg:px-8 relative z-20 flex items-center justify-center min-h-screen">
          {/* Hero content removed - only background image visible */}
        </div>
      </section>

        {/* About Section */}
        <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 md:mb-6 animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '0.4s' }}>About Alankarika</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  At Rose Jewels, we believe that jewelry is more than just an accessory—it's a reflection of your unique story,
                  your precious moments, and your personal style. For over two decades, we've been dedicated to creating
                  exquisite pieces that celebrate life's most beautiful moments.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  Our master craftsmen combine traditional techniques with modern innovation to create jewelry that stands
                  the test of time. Every piece is carefully designed and meticulously crafted using only the finest
                  materials, ensuring that your jewelry remains as beautiful as the day you first wore it.
                </p>
                <div className="text-center lg:text-left">
                  <Link href="/about">
                    <Button size="lg" className="bg-[#8B7355] hover:bg-[#D4AF37] text-white px-6 md:px-8 py-3 text-base md:text-lg animate-fade-in-up transition-all duration-300 hover:scale-105 shadow-lg" style={{ animationDelay: '1s' }}>
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '0.3s' }}>
              <Image
                src="/logoalan-removebg-preview.png"
                alt="Alankarika Logo"
                width={800}
                height={700}
                className="rounded-2xl shadow-lg object-contain animate-fade-in-up transition-all duration-300 hover:scale-105 w-full max-w-md mx-auto lg:max-w-full"
                style={{ animationDelay: '0.5s' }}
              />
              <div className="absolute -bottom-3 -left-3 lg:-bottom-6 lg:-left-6 bg-white p-3 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs lg:text-sm">Premium Quality</p>
                    <p className="text-xs lg:text-sm text-gray-600">Certified & Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* New Arrivals Section */}
       <section className="py-12 md:py-20" style={{ backgroundColor: '#f9f7c4' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 md:mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>New Arrivals</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base lg:text-lg animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
                Discover our latest collection of exquisite jewelry pieces, crafted with precision and designed to make you shine.
              </p>
            </div>
           
          </div>

                    <div className="relative overflow-hidden">
            <div className="flex gap-4 md:gap-8 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 288}px)` }}>
              {/* Debug: {newArrivals.length} products, Current slide: {currentSlide} */}
              {/* Create a circular carousel by duplicating items */}
              {loading ? (
                // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`loading-${index}`} className="animate-fade-in-up flex-shrink-0 w-72 md:w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
                      <div className="w-full h-64 md:h-80 bg-gray-300"></div>
                    </div>
                    <div className="mt-3 md:mt-4 p-3 md:p-4">
                      <div className="h-5 md:h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                      <div className="h-6 md:h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="flex space-x-2 md:space-x-3">
                        <div className="flex-1 h-8 md:h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 h-8 md:h-10 bg-gray-200 rounded animate-pulse"></div>
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
                newArrivals.map((product, index) => (
                   <div key={product._id} className="group animate-fade-in-up flex-shrink-0 w-72 md:w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                     <Link href={`/view-details?id=${product._id}`}>
                       <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                         <Image
                           src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                           alt={product.name}
                           width={300}
                           height={400}
                           className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                         {product.isNew && (
                           <div className="absolute top-3 md:top-4 right-3 md:right-4">
                             <div className="bg-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-gray-900">
                               New
                             </div>
                           </div>
                         )}
                         {product.isOnSale && (
                           <div className="absolute top-3 md:top-4 left-3 md:left-4">
                             <div className="bg-red-500 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
                               {product.offerPercentage}% OFF
                             </div>
                           </div>
                         )}
                       </div>
                     </Link>
                    <div className="mt-3 md:mt-4 p-3 md:p-4">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#8B7355] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-3">JEWELS BY LAHARI</p>
                      <div className="mb-3 md:mb-4">
                        <span className="text-lg md:text-2xl font-bold text-[#8B7355]">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs md:text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {/* Action Buttons - Horizontal Layout Below Price */}
                      <div className="flex space-x-2 md:space-x-3">
                        <Button 
                          className="flex-1 bg-[#8B7355] hover:bg-[#D4AF37] text-white text-xs md:text-sm py-2"
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
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">Add to Cart</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                        <Link href={`/checkout?product=${product._id}&quantity=1`}>
                          <Button className="flex-1 bg-[#D4AF37] hover:bg-[#8B7355] text-white text-xs md:text-sm py-2">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation Arrows - Only show if there are more items than visible */}
            {newArrivals.length > 4 && (
              <div className="absolute inset-0 pointer-events-none">
                <button 
                  onClick={() => {
                    console.log('Left arrow clicked, current slide:', currentSlide)
                    handlePrevSlide()
                  }}
                   className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    console.log('Right arrow clicked, current slide:', currentSlide)
                    handleNextSlide()
                  }}
                   className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-white to-[#D4AF37] hover:bg-[#D4AF37] text-black hover:text-black px-6 md:px-8 py-3 text-base md:text-lg transition-all duration-300 hover:scale-105 rounded-full border border-[#D4AF37]/30">
                View All New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

       {/* Latest Gems Section */}
       <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center flex-1">
              <h2 className="font-light-300 text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 md:mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Latest Gems</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base lg:text-lg animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
                Discover our most precious and exclusive gemstone jewelry collection, featuring rare stones and premium craftsmanship.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-4 md:gap-8 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentGemsSlide * 288}px)` }}>
              {/* Create a circular carousel by duplicating items */}
              {loading ? (
                // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`loading-gems-${index}`} className="animate-fade-in-up flex-shrink-0 w-72 md:w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
                      <div className="w-full h-64 md:h-80 bg-gray-300"></div>
                    </div>
                    <div className="mt-3 md:mt-4 p-3 md:p-4">
                      <div className="h-5 md:h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 md:h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                      <div className="h-6 md:h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="flex space-x-2 md:space-x-3">
                        <div className="flex-1 h-8 md:h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 h-8 md:h-10 bg-gray-200 rounded animate-pulse"></div>
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
                latestGems.map((product, index) => (
                  <div key={product._id} className="group animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <Link href={`/view-details?id=${product._id}`}>
                      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <Image
                          src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={400}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full text-sm font-bold text-gray-900 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-lg border border-gray-400">
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
                    </Link>
                    <div className="mt-4 p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#8B7355] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">JEWELS BY LAHARI</p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-[#8B7355]">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {/* Action Buttons - Horizontal Layout Below Price */}
                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1 bg-[#8B7355] hover:bg-[#D4AF37] text-white"
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
                        <Link href={`/checkout?product=${product._id}&quantity=1`}>
                          <Button className="flex-1 bg-[#D4AF37] hover:bg-[#8B7355] text-white">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation Arrows - Only show if there are more items than visible */}
            {latestGems.length > 4 && (
              <div className="absolute inset-0 pointer-events-none">
                <button 
                  onClick={() => {
                    console.log('Left gems arrow clicked, current slide:', currentGemsSlide)
                    handlePrevGemsSlide()
                  }}
                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    console.log('Right gems arrow clicked, current slide:', currentGemsSlide)
                    handleNextGemsSlide()
                  }}
                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-white to-[#D4AF37] hover:bg-[#D4AF37] text-black hover:text-black px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full border border-[#D4AF37]/30">
                View All Latest Gems
              </Button>
            </Link>
          </div>
        </div>
      </section>

       {/* Categories Section */}
       <section className="py-20 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-light-300 text-5xl text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Shop by Category</h2>
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
            <h2 className="font-light-300 text-5xl text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Discover our handpicked selection of the finest jewelry pieces, crafted with precision and designed to make you shine.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-8 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentFeaturedSlide * 400}px)` }}>
              {/* Create a circular carousel by duplicating items */}
              {loading ? (
                // Loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={`loading-featured-${index}`} className="animate-fade-in-up flex-shrink-0 w-96" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-200 animate-pulse">
                      <div className="w-full h-64 bg-gray-300"></div>
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
              ) : featuredProducts.length === 0 ? (
                // Empty state
                <div className="text-center py-16">
                  <p className="text-gray-500">No products available</p>
                </div>
              ) : (
                featuredProducts.map((product, index) => (
                  <div key={product._id} className="group animate-fade-in-up flex-shrink-0 w-96" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                      <Link href={`/view-details?id=${product._id}`}>
                        <div className="relative overflow-hidden cursor-pointer">
                          <Image
                            src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col space-y-2">
                            {product.isNew && (
                              <span className="bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-full">NEW</span>
                            )}
                            {product.isOnSale && (
                              <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full">SALE</span>
                            )}
                          </div>
                          
                          {/* Featured Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold rounded-full">FEATURED</span>
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[#C4A484] transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3">JEWELS BY LAHARI</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-[#8B7355]">₹{product.price}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                            )}
                            {product.isOnSale && product.offerPercentage && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                {product.offerPercentage}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 mt-4">
                          <Button 
                            className="flex-1 bg-[#8B7355] hover:bg-[#D4AF37] text-white py-2 px-4 text-sm font-medium"
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
                          <Link href={`/checkout?product=${product._id}&quantity=1`}>
                            <Button className="flex-1 bg-[#D4AF37] hover:bg-[#8B7355] text-white py-2 px-4 text-sm font-medium">
                              Buy Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Navigation Arrows - Only show if there are more items than visible */}
            {featuredProducts.length > 3 && (
              <div className="absolute inset-0 pointer-events-none">
                <button 
                  onClick={() => {
                    console.log('Left featured arrow clicked, current slide:', currentFeaturedSlide)
                    handlePrevFeaturedSlide()
                  }}
                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button 
                  onClick={() => {
                    console.log('Right featured arrow clicked, current slide:', currentFeaturedSlide)
                    handleNextFeaturedSlide()
                  }}
                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 cursor-pointer pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-white to-[#D4AF37] hover:bg-[#D4AF37] text-black hover:text-black px-8 py-3 text-lg transition-all duration-300 hover:scale-105 rounded-full border border-[#D4AF37]/30"
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
