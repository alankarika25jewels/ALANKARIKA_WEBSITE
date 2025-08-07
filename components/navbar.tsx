"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import ProductsDropdown from "./products-dropdown"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-none" style={{ backgroundColor: '#F0E1B9FF' }}>
              <div className="max-w-5xl px-0 lg:px-1 mx-auto">
        {/* Main navbar */}
        <div className="flex items-center justify-between py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-0.5 -ml-20">
  <Image
    src="/logoalan-removebg-preview.png"
    alt="Alankarika Logo"
    width={80}
    height={80}
    className="w-20 h-20 object-contain scale-[2.8] translate-y-1"
  />

</Link>

          {/* Search Bar - Desktop - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full px-3 py-1 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm"
              />
              <Search className="absolute right-2 top-1.5 w-4 h-4 text-black" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
                          <Link href="/" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
                Home
              </Link>
              <ProductsDropdown />
              <Link href="/about" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
                About
              </Link>
              <Link href="/contact" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
                Contact
              </Link>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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