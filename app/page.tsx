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
import { useState } from "react"


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentGemsSlide, setCurrentGemsSlide] = useState(0)
  
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
  
  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Elegance Ring",
      image: "/placeholder.svg?height=300&width=300&text=Diamond+Ring",
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      image: "/placeholder.svg?height=300&width=300&text=Pearl+Earrings",
      rating: 4.9,
      reviews: 89,
      isNew: false,
    },
    {
      id: 3,
      name: "Gold Chain Necklace",
      image: "/placeholder.svg?height=300&width=300&text=Gold+Necklace",
      rating: 4.7,
      reviews: 156,
      isNew: true,
    },
    {
      id: 4,
      name: "Silver Charm Bracelet",
      image: "/placeholder.svg?height=300&width=300&text=Silver+Bracelet",
      rating: 4.6,
      reviews: 203,
      isNew: false,
    },
  ]

  const categories = [
    {
      id: 1,
      name: "Rings",
      count: 45,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041278/7K0A0299_jboywk.jpg",
      href: "/categories/rings",
    },
    {
      id: 2,
      name: "Necklaces",
      count: 32,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041775/RNK-387_mhmryo.jpg",
      href: "/categories/necklaces",
    },
    {
      id: 3,
      name: "Pendants",
      count: 28,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754042374/RP_2237_thzcn1.jpg",
      href: "/categories/earrings",
    },
    {
      id: 4,
      name: "Mangalsutra",
      count: 19,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754040744/1J8A0224_kecmbm.jpg",
      href: "/categories/bracelets",
    },
  ]

  const newArrivals = [
    {
      id: 1,
      name: "Aaradhya Minimal Necklace Set",
      brand: "JEWELS BY LAHARI",
      price: "1,099.00",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Deviya Lakshmi Necklace Set",
      brand: "JEWELS BY LAHARI",
      price: "1,219.00",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Flower Coin Choker Set",
      brand: "JEWELS BY LAHARI",
      price: "699.00",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Rudrani R",
      brand: "JEWELS BY LAHARI",
      price: "1,299.00",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Krishna Pearl Necklace Set",
      brand: "JEWELS BY LAHARI",
      price: "899.00",
      image: "https://images.unsplash.com/photo-1598560917505-e7d0c1a3e4c0?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Radha Gold Pendant Set",
      brand: "JEWELS BY LAHARI",
      price: "1,499.00",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      name: "Ganesh Silver Bracelet",
      brand: "JEWELS BY LAHARI",
      price: "799.00",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      name: "Lakshmi Diamond Ring",
      brand: "JEWELS BY LAHARI",
      price: "2,199.00",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    },
    {
      id: 9,
      name: "Saraswati Pearl Earrings",
      brand: "JEWELS BY LAHARI",
      price: "1,099.00",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    },
    {
      id: 10,
      name: "Durga Gold Chain",
      brand: "JEWELS BY LAHARI",
      price: "1,899.00",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
    },
    {
      id: 11,
      name: "Kali Silver Necklace",
      brand: "JEWELS BY LAHARI",
      price: "1,599.00",
      image: "https://images.unsplash.com/photo-1598560917505-e7d0c1a3e4c0?w=400&h=400&fit=crop",
    },
    {
      id: 12,
      name: "Hanuman Gold Pendant",
      brand: "JEWELS BY LAHARI",
      price: "1,299.00",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop",
    },
  ]

  const latestGems = [
    {
      id: 1,
      name: "Ruby Diamond Necklace",
      brand: "JEWELS BY LAHARI",
      price: "3,299.00",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Emerald Gold Ring",
      brand: "JEWELS BY LAHARI",
      price: "2,899.00",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Sapphire Pearl Earrings",
      brand: "JEWELS BY LAHARI",
      price: "1,999.00",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Diamond Platinum Bracelet",
      brand: "JEWELS BY LAHARI",
      price: "4,599.00",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Opal Silver Pendant",
      brand: "JEWELS BY LAHARI",
      price: "1,799.00",
      image: "https://images.unsplash.com/photo-1598560917505-e7d0c1a3e4c0?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Amethyst Gold Chain",
      brand: "JEWELS BY LAHARI",
      price: "2,399.00",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      name: "Topaz Crystal Ring",
      brand: "JEWELS BY LAHARI",
      price: "1,899.00",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      name: "Garnet Diamond Set",
      brand: "JEWELS BY LAHARI",
      price: "3,899.00",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    },
    {
      id: 9,
      name: "Aquamarine Pearl Necklace",
      brand: "JEWELS BY LAHARI",
      price: "2,699.00",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
    },
    {
      id: 10,
      name: "Citrine Gold Earrings",
      brand: "JEWELS BY LAHARI",
      price: "1,599.00",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    },
    {
      id: 11,
      name: "Peridot Silver Bracelet",
      brand: "JEWELS BY LAHARI",
      price: "1,299.00",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    },
    {
      id: 12,
      name: "Tanzanite Platinum Ring",
      brand: "JEWELS BY LAHARI",
      price: "5,299.00",
      image: "https://images.unsplash.com/photo-1598560917505-e7d0c1a3e4c0?w=400&h=400&fit=crop",
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
              {[...newArrivals, ...newArrivals, ...newArrivals].map((product, index) => (
                <div key={`${product.id}-${index}`} className="group animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + (index % newArrivals.length) * 0.1}s` }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                        New
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
              View All New Arrivals
            </Button>
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
              {[...latestGems, ...latestGems, ...latestGems].map((product, index) => (
                <div key={`${product.id}-${index}`} className="group animate-fade-in-up flex-shrink-0 w-80" style={{ animationDelay: `${0.8 + (index % latestGems.length) * 0.1}s` }}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src={product.image}
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
                  </div>
                  <div className="mt-4 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
              View All Latest Gems
            </Button>
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
                src="/WhatsApp_Image_2025-07-31_at_6.21.52_PM-removebg-preview.png"
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
              <Link key={category.id} href={category.href} className="group">
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
            <InstagramCarousel />
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
