import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Diamond Elegance Ring",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=300&width=300&text=Diamond+Ring",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: true,
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      price: 159.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Pearl+Earrings",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      isSale: false,
    },
    {
      id: 3,
      name: "Gold Chain Necklace",
      price: 249.99,
      originalPrice: 329.99,
      image: "/placeholder.svg?height=300&width=300&text=Gold+Necklace",
      rating: 4.7,
      reviews: 156,
      isNew: true,
      isSale: true,
    },
    {
      id: 4,
      name: "Silver Charm Bracelet",
      price: 89.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Silver+Bracelet",
      rating: 4.6,
      reviews: 203,
      isNew: false,
      isSale: false,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the finest jewelry pieces, crafted with precision and designed to make
            you shine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
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
                  {product.isSale && (
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full">SALE</span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#C4A484] hover:text-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#C4A484] hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>


              </div>

              <div className="p-6">
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

                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[#C4A484] transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-[#C4A484]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
