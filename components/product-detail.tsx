"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, ShoppingCart, Star, Plus, Minus, Share2, Truck, RotateCcw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: "Diamond Elegance Ring",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    description:
      "This stunning diamond ring features a brilliant cut center stone surrounded by smaller diamonds in a classic halo setting. Crafted from 14k white gold, this ring is perfect for engagements, anniversaries, or any special occasion.",
    features: [
      "14k White Gold",
      "0.75 Carat Center Diamond",
      "Halo Setting with Side Diamonds",
      "Comfort Fit Band",
      "Lifetime Warranty",
    ],
    images: [
      "/placeholder.svg?height=500&width=500&text=Diamond+Ring+Main",
      "/placeholder.svg?height=500&width=500&text=Diamond+Ring+Side",
      "/placeholder.svg?height=500&width=500&text=Diamond+Ring+Detail",
      "/placeholder.svg?height=500&width=500&text=Diamond+Ring+Hand",
    ],
    sizes: ["5", "6", "7", "8", "9", "10"],
    inStock: true,
    stockCount: 15,
  }

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-[#C4A484]" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-[#C4A484]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-gray">
              <p>{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-[#C4A484] rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size:</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "border-[#C4A484] bg-[#C4A484] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#C4A484]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100" disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100"
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">{product.stockCount} items available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-[#C4A484] hover:bg-[#B8956F] text-white"
                  disabled={!selectedSize}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white bg-transparent"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <Button size="lg" variant="outline" className="w-full bg-transparent" disabled={!selectedSize}>
                Buy Now
              </Button>

              <Button variant="ghost" size="sm" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share this product
              </Button>
            </div>

            {/* Product Guarantees */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-700">Free shipping on orders over $200</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-700">Lifetime warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
