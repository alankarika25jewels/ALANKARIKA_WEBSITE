import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  // Static data arrays
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
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041775/RNK-387_mhmryo.jpg",
      href: "/categories/pendants",
    },
    {
      id: 4,
      name: "Earrings",
      count: 38,
      image: "https://res.cloudinary.com/djjj41z17/image/upload/v1754041278/7K0A0299_jboywk.jpg",
      href: "/categories/earrings",
    },
  ]

  const newArrivals = [
    {
      id: 1,
      name: "Royal Diamond Tiara",
      price: "$2,499",
      originalPrice: "$3,200",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 156,
      isNew: true,
    },
    {
      id: 2,
      name: "Pearl Princess Set",
      price: "$1,899",
      originalPrice: "$2,400",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 89,
      isNew: true,
    },
    {
      id: 3,
      name: "Emerald Elegance Ring",
      price: "$3,299",
      originalPrice: "$4,100",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 203,
      isNew: true,
    },
    {
      id: 4,
      name: "Sapphire Serenity Necklace",
      price: "$1,599",
      originalPrice: "$2,000",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 134,
      isNew: true,
    },
    {
      id: 5,
      name: "Golden Harmony Bracelet",
      price: "$899",
      originalPrice: "$1,200",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 78,
      isNew: true,
    },
    {
      id: 6,
      name: "Ruby Radiance Earrings",
      price: "$1,299",
      originalPrice: "$1,600",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 95,
      isNew: true,
    },
    {
      id: 7,
      name: "Platinum Purity Ring",
      price: "$4,199",
      originalPrice: "$5,200",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 167,
      isNew: true,
    },
    {
      id: 8,
      name: "Silver Symphony Set",
      price: "$1,799",
      originalPrice: "$2,300",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 112,
      isNew: true,
    },
    {
      id: 9,
      name: "Diamond Destiny Pendant",
      price: "$2,899",
      originalPrice: "$3,600",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 189,
      isNew: true,
    },
    {
      id: 10,
      name: "Crystal Cascade Necklace",
      price: "$1,399",
      originalPrice: "$1,800",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 67,
      isNew: true,
    },
    {
      id: 11,
      name: "Rose Gold Romance Ring",
      price: "$2,199",
      originalPrice: "$2,800",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 143,
      isNew: true,
    },
    {
      id: 12,
      name: "Aquamarine Aura Set",
      price: "$1,999",
      originalPrice: "$2,500",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 98,
      isNew: true,
    },
    {
      id: 13,
      name: "Royal Diamond Tiara",
      price: "$5,499",
      originalPrice: "$6,800",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 5.0,
      reviews: 234,
      isNew: true,
    },
    {
      id: 14,
      name: "Pearl Princess Set",
      price: "$3,899",
      originalPrice: "$4,800",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 167,
      isNew: true,
    },
  ]

  const latestGems = [
    {
      id: 1,
      name: "Sapphire Serenity Ring",
      price: "$1,899",
      originalPrice: "$2,400",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 134,
      isNew: false,
    },
    {
      id: 2,
      name: "Emerald Elegance Necklace",
      price: "$2,299",
      originalPrice: "$2,900",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 189,
      isNew: false,
    },
    {
      id: 3,
      name: "Ruby Radiance Bracelet",
      price: "$1,599",
      originalPrice: "$2,000",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 98,
      isNew: false,
    },
    {
      id: 4,
      name: "Diamond Destiny Earrings",
      price: "$2,799",
      originalPrice: "$3,500",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 156,
      isNew: false,
    },
    {
      id: 5,
      name: "Pearl Purity Pendant",
      price: "$1,299",
      originalPrice: "$1,600",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 87,
      isNew: false,
    },
    {
      id: 6,
      name: "Golden Harmony Ring",
      price: "$1,899",
      originalPrice: "$2,400",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 112,
      isNew: false,
    },
    {
      id: 7,
      name: "Silver Symphony Necklace",
      price: "$1,199",
      originalPrice: "$1,500",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 76,
      isNew: false,
    },
    {
      id: 8,
      name: "Crystal Cascade Bracelet",
      price: "$899",
      originalPrice: "$1,200",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.5,
      reviews: 65,
      isNew: false,
    },
    {
      id: 9,
      name: "Rose Gold Romance Pendant",
      price: "$1,699",
      originalPrice: "$2,100",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 94,
      isNew: false,
    },
    {
      id: 10,
      name: "Aquamarine Aura Ring",
      price: "$2,399",
      originalPrice: "$3,000",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2b9?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 178,
      isNew: false,
    },
    {
      id: 11,
      name: "Platinum Purity Necklace",
      price: "$3,199",
      originalPrice: "$4,000",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 203,
      isNew: false,
    },
    {
      id: 12,
      name: "Diamond Delight Set",
      price: "$4,599",
      originalPrice: "$5,800",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 5.0,
      reviews: 267,
      isNew: false,
    },
    {
      id: 13,
      name: "Royal Sapphire Crown",
      price: "$6,999",
      originalPrice: "$8,500",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format",
      rating: 5.0,
      reviews: 345,
      isNew: false,
    },
    {
      id: 14,
      name: "Imperial Emerald Set",
      price: "$4,899",
      originalPrice: "$6,200",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 289,
      isNew: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster="/model-jewelry.jpg"
          preload="metadata"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center text-white">
          <Image
            src="/logo-rose.png"
            alt="Alankarika Logo"
            width={200}
            height={80}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-allura">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewelry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Moved below Hero */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-allura">
              About Alankarika
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Welcome to Alankarika, where tradition meets contemporary elegance. 
              Our journey began with a passion for creating jewelry that tells stories 
              and celebrates life's precious moments. Each piece in our collection is 
              meticulously crafted by skilled artisans who bring decades of expertise 
              and cultural heritage to every design.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              From classic diamond rings to modern statement pieces, we offer a 
              diverse range of jewelry that caters to every style and occasion. 
              Our commitment to quality, authenticity, and customer satisfaction 
              has made us a trusted name in fine jewelry for over two decades.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Only the finest materials and gemstones</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handcrafted</h3>
                <p className="text-gray-600">Each piece is uniquely crafted by artisans</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Timeless Design</h3>
                <p className="text-gray-600">Classic elegance that never goes out of style</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-allura">
              Explore Our Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated categories, each offering unique pieces 
              that reflect different styles and occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} pieces</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-allura">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be the first to discover our latest additions, featuring the newest 
              trends and timeless classics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newArrivals.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      NEW
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white font-semibold">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                View All New Arrivals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Gems Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-allura">
              Latest Gems
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most recent additions, featuring the finest gemstones 
              and precious metals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {latestGems.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute top-4 right-4 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white font-semibold">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Explore All Gems
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-allura">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and 
            jewelry care tips.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20 focus:outline-none"
              />
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
