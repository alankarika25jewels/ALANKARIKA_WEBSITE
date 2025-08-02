import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BestSellers() {
  const bestSellers = [
    {
      id: 5,
      name: "Vintage Rose Gold Ring",
      price: 399.99,
      originalPrice: 499.99,
      image: "/placeholder.svg?height=300&width=300&text=Rose+Gold+Ring",
      rating: 4.9,
      reviews: 267,
      soldCount: 150,
    },
    {
      id: 6,
      name: "Crystal Drop Earrings",
      price: 179.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Crystal+Earrings",
      rating: 4.8,
      reviews: 198,
      soldCount: 120,
    },
    {
      id: 7,
      name: "Infinity Love Necklace",
      price: 229.99,
      originalPrice: 289.99,
      image: "/placeholder.svg?height=300&width=300&text=Infinity+Necklace",
      rating: 4.9,
      reviews: 234,
      soldCount: 180,
    },
    {
      id: 8,
      name: "Tennis Bracelet",
      price: 349.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Tennis+Bracelet",
      rating: 4.7,
      reviews: 145,
      soldCount: 95,
    },
  ]

  return (
    <section className="py-16 bg-[#C4A484]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-4">Best Sellers</h2>
          <p className="text-white opacity-90 max-w-2xl mx-auto">
            Our most loved pieces, chosen by customers worldwide for their exceptional quality and timeless beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
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

                {/* Best seller badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                    BEST SELLER
                  </span>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
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
                  <span className="text-xs text-gray-500">{product.soldCount} sold</span>
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
      </div>
    </section>
  )
}
