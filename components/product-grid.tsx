import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export default function ProductGrid() {
  const { addItem } = useCart()

  const products = [
    {
      id: 1,
      name: "Aaradhya Minimal Necklace Set",
      price: 1099.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Aaradhya+Necklace",
      category: "Necklaces",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: false,
    },
    {
      id: 2,
      name: "Deviya Lakshmi Necklace Set",
      price: 1219.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Deviya+Lakshmi",
      category: "Necklaces",
      rating: 4.9,
      reviews: 89,
      isNew: true,
      isSale: false,
    },
    {
      id: 3,
      name: "Flower Coin Choker Set",
      price: 699.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Flower+Choker",
      category: "Necklaces",
      rating: 4.7,
      reviews: 156,
      isNew: true,
      isSale: false,
    },
    {
      id: 4,
      name: "Rudrani R Necklace Set",
      price: 1299.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Rudrani+Necklace",
      category: "Necklaces",
      rating: 4.6,
      reviews: 203,
      isNew: true,
      isSale: false,
    },
    {
      id: 5,
      name: "Divine Gold Pendant",
      price: 899.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Divine+Gold",
      category: "Pendants",
      rating: 4.9,
      reviews: 87,
      isNew: true,
      isSale: false,
    },
    {
      id: 6,
      name: "Sacred Silver Ring",
      price: 599.00,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300&text=Sacred+Silver",
      category: "Rings",
      rating: 4.8,
      reviews: 145,
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

            <p className="text-sm text-gray-600 mb-3">JEWELS BY LAHARI</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[#C4A484]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Action Buttons - Horizontal Layout Below Price */}
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => addItem({
                  id: product.id.toString(),
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice || undefined,
                  image: product.image,
                  category: product.category,
                  brand: "JEWELS BY LAHARI"
                })}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* View All New Arrivals Button */}
      <div className="text-center mt-12">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium">
          View All New Arrivals
        </Button>
      </div>
    </div>
  )
}
