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
import { Great_Vibes } from "next/font/google"

const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function Home() {
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
    <div className="text-center text-white ml-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <h1 className={`${greatVibes.className} text-8xl lg:text-[12rem] mb-6 animate-fade-in-up`} style={{ animationDelay: '0.8s' }}>
        Rose Jewels
      </h1>
    </div>
  </div>
</section>


      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h2 className={`${greatVibes.className} text-5xl font-light text-gray-900 mb-6 animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>About Rose Jewels</h2>
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
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg animate-fade-in-up transition-all duration-300 hover:scale-105" style={{ animationDelay: '1s' }}>
                  Learn More About Us
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Image
                src="/logo-rose.png"
                alt="Rose Jewels Logo"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg object-contain animate-fade-in-up transition-all duration-300 hover:scale-105"
                style={{ animationDelay: '0.5s' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
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

      {/* Necklace Section */}
      <NecklaceSection />

      {/* Pendant Section */}
      <PendantSection />

      {/* Categories Section */}
      <section className="py-32 bg-white mt-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className={`${greatVibes.className} text-5xl font-light text-gray-900 mb-4 animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>Shop by Category</h2>
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
            <h2 className={`${greatVibes.className} text-5xl font-light text-gray-900 mb-4 animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>Featured Products</h2>
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
                className="border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white bg-transparent px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
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
