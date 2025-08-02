import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Diamond Elegance Ring",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg?height=300&width=300&text=Diamond+Ring",
      category: "Rings",
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
      category: "Earrings",
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
      category: "Necklaces",
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
      category: "Bracelets",
      rating: 4.6,
      reviews: 203,
      isNew: false,
      isSale: false,
    },
    {
      id: 5,
      name: "Ruby Statement Ring",
      price: 449.99,
      originalPrice: 599.99,
      image: "/placeholder.svg?height=300&width=300&text=Ruby+Ring",
      category: "Rings",
      rating: 4.9,
      reviews: 87,
      isNew: true,
      isSale: true,
    },
    {
      id: 6,
      name: "Sapphire Stud Earrings",
      price: 199.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Sapphire+Earrings",
      category: "Earrings",
      rating: 4.8,
      reviews: 145,
      isNew: false,
      isSale: false,
    },
    {
      id: 7,
      name: "Vintage Locket Necklace",
      price: 179.99,
      originalPrice: 229.99,
      image: "/placeholder.svg?height=300&width=300&text=Vintage+Locket",
      category: "Necklaces",
      rating: 4.7,
      reviews: 98,
      isNew: false,
      isSale: true,
    },
    {
      id: 8,
      name: "Diamond Tennis Bracelet",
      price: 599.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Tennis+Bracelet",
      category: "Bracelets",
      rating: 4.9,
      reviews: 76,
      isNew: true,
      isSale: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Link href={`/products/${product.id}`}>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#C4A484] hover:text-white transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Quick add to cart */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button className="w-full bg-[#C4A484] hover:bg-[#B8956F] text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

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
  )
}
