"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

import CartIcon from "./cart-icon"
import CurrencySelector from "./currency-selector"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-none" style={{ background: 'linear-gradient(to right, #FFFFFF 0%, #F5EEDC 12%, #8B7355 80%, #D4AF37 93%)' }}>
      <div className="w-full px-2 md:px-4 lg:px-8 mx-auto">
        {/* Main navbar */}
        <div className="flex items-center justify-center lg:justify-between py-0 ml-30">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center">
            <Link href="/" className="flex items-center px-1.5 py-0">
              <Image
                src="/logo/alankarika_logo-tm-removebg-preview.png"
                alt="Alankarika Logo"
                width={60}
                height={60}
                className="w-12 h-12 md:w-16 md:h-16 object-contain scale-[2.35]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-20  ml-40">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 px-2 py-0">
              <Image
                src="/logo/alankarika_logo-tm-removebg-preview.png"
                alt="Alankarika Logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain scale-[2.35]"
              />
            </Link>
            {/* Search Bar */}
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="w-80 xl:w-96 pl-6 pr-2 py-1 rounded-lg border border-[#D4AF37]/30 text-[#010101] placeholder-[#8B7355] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 text-sm"
              />
              <button type="submit" className="absolute right-2 top-1.5">
                <Search className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </form>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-5">
              <Link href="/" className="text-white hover:text-[#D4AF37] transition-colors font-medium text-sm">
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-[#D4AF37] transition-colors font-medium text-sm">
                About
              </Link>
              <Link href="/products" className="text-white hover:text-[#D4AF37] transition-colors font-medium text-sm">
                Products
              </Link>
              <Link href="/contact" className="text-white hover:text-[#D4AF37] transition-colors font-medium text-sm">
                Contact
              </Link>
              <div className="pl-2 border-l border-white/30">
                <CurrencySelector variant="dark" />
              </div>
              <CartIcon />
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center space-x-2 md:space-x-3 absolute right-4">
            <CurrencySelector variant="dark" />
            <Link href="/cart" className="relative p-1 text-white hover:text-[#D4AF37]">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-white/80 transition-colors p-1"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-1">
              {isMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        {isSearchOpen && (
          <div className="lg:hidden pb-3 md:pb-4 px-2 md:px-0">
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-[#D4AF37]/30 text-[#010101] placeholder-[#8B7355] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 text-sm md:text-base"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 px-2 md:px-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex flex-col space-y-4 md:space-y-6">
                <Link href="/" className="text-gray-900 hover:text-[#D4AF37] font-medium text-base md:text-lg" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="text-gray-900 hover:text-[#D4AF37] font-medium text-base md:text-lg" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/products" className="text-gray-900 hover:text-[#D4AF37] font-medium text-base md:text-lg" onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
                <Link href="/contact" className="text-gray-900 hover:text-[#D4AF37] font-medium text-base md:text-lg" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <div className="pt-2 pb-2 border-y border-[#E8DFD0]">
                  <p className="text-xs text-gray-500 mb-2 text-center">Shop in your currency</p>
                  <CurrencySelector variant="light" />
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-full bg-[#8B7355] hover:bg-[#6F5B44] text-white font-medium transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>View Cart</span>
                  {state.itemCount > 0 && (
                    <span className="bg-white text-[#8B7355] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Cart Modal for Mobile - kept for backwards compat but menu links to /cart */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Shopping Cart</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link href="/cart" className="text-[#8B7355] font-medium" onClick={() => setIsCartOpen(false)}>
                    Go to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
