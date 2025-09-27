"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    setIsUpdating(id)
    updateQuantity(id, newQuantity)
    setTimeout(() => setIsUpdating(null), 500)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        {/* Top spacing to prevent navbar overlap */}
        <div className="h-20"></div>
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center" style={{ backgroundColor: '#F0E1B9FF' }}>
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center animate-fade-in-up">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-16 h-16 text-[#C4A484]" />
              </div>
            </div>
            <h1 className="font-allura text-6xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Looks like you haven't added any beautiful jewelry pieces to your cart yet. Let's find something special for you!
            </p>
            <div className="space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/products">
                <Button size="lg" className="bg-[#C4A484] hover:bg-[#B39474] text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <div className="min-h-[calc(100vh-120px)] py-12" style={{ backgroundColor: '#F0E1B9FF' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in-up">
            <Link href="/" className="inline-flex items-center text-[#C4A484] hover:text-[#B39474] mb-6 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
            <div className="text-center">
              <h1 className="font-allura text-6xl font-light text-gray-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Shopping Cart
              </h1>
              <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {state.itemCount} beautiful item{state.itemCount !== 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#C4A484]/5 to-[#F0E1B9]/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                      <Star className="w-6 h-6 text-[#C4A484] mr-2" />
                      Your Selected Items
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-300"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {state.items.map((item, index) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                      <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0 relative group">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#C4A484] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-[#C4A484] font-medium mb-1">{item.brand}</p>
                          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border-2 border-[#C4A484]/20 rounded-xl overflow-hidden">
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                              disabled={isUpdating === item.id}
                              className="px-4 py-2 hover:bg-[#C4A484]/10 disabled:opacity-50 transition-all duration-300 text-[#C4A484] hover:text-[#B39474]"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center font-semibold text-gray-900 bg-[#C4A484]/5">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                              disabled={isUpdating === item.id}
                              className="px-4 py-2 hover:bg-[#C4A484]/10 disabled:opacity-50 transition-all duration-300 text-[#C4A484] hover:text-[#B39474]"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#C4A484] mb-1">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600 p-3 rounded-xl hover:bg-red-50 transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#C4A484] mr-2" />
                    Order Summary
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#C4A484] to-[#F0E1B9] mx-auto rounded-full"></div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Subtotal ({state.itemCount} items)</span>
                    <span className="font-semibold text-lg">₹{state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Shipping</span>
                    <span className="font-semibold text-green-600 flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Tax (18%)</span>
                    <span className="font-semibold">₹{(state.total * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="bg-gradient-to-r from-[#C4A484]/10 to-[#F0E1B9]/10 p-6 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#C4A484]">₹{(state.total + (state.total * 0.18)).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">Including all taxes & free shipping</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full bg-[#C4A484] hover:bg-[#B39474] text-white text-lg py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                      <Star className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link href="/products" className="w-full">
                    <Button variant="outline" className="w-full border-2 border-[#C4A484] text-[#C4A484] hover:bg-[#C4A484] hover:text-white py-3 rounded-xl transition-all duration-300 hover:scale-105">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-[#C4A484]/10 to-[#F0E1B9]/10 rounded-xl border border-[#C4A484]/20">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-[#C4A484] mr-2" />
                    <h3 className="font-semibold text-[#C4A484]">Free Shipping</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Free standard shipping on all orders. Estimated delivery: 3-5 business days. 
                    <span className="font-medium text-[#C4A484]"> Express delivery available!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
