"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import { Great_Vibes } from "next/font/google"
import ProductsDropdown from "./products-dropdown"

const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="bg-transparent sticky top-0 z-50 backdrop-blur-none" style={{ backgroundColor: 'transparent' }}>
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        {/* Main navbar */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1.5 shadow flex items-center justify-center">
              <Image
                src="/logo-rose.png"
                alt="Rose Jewels Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className={`${greatVibes.className} text-white text-2xl font-bold tracking-tight`}>Rose Jewels</span>
          </Link>

          {/* Search Bar - Desktop - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-black" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-black hover:text-gray-700 transition-colors font-medium">
              Home
            </Link>
            <ProductsDropdown />
            <Link href="/about" className="text-black hover:text-gray-700 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-700 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-black" />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-black hover:text-gray-700">
                Home
              </Link>
              <Link href="/products" className="text-black hover:text-gray-700">
                Products
              </Link>
              <Link href="/about" className="text-black hover:text-gray-700">
                About
              </Link>
              <Link href="/contact" className="text-black hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 