"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"

import CartIcon from "./cart-icon"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-none" style={{ backgroundColor: '#F0E1B9FF' }}>
              <div className="max-w-5xl px-0 lg:pl-8 mx-auto">
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
          <div className="hidden lg:flex flex-1 justify-end ml-24">
            <form action="/search" method="GET" className="relative w-full max-w-md">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="w-full px-3 py-1 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm"
              />
              <button type="submit" className="absolute right-2 top-1.5">
                <Search className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ml-auto ml-16">
            <Link href="/" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              Home
            </Link>
            <Link href="/about" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              About
            </Link>
            <Link href="/products" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              Products
            </Link>
            <Link href="/shop" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              Shop
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              Contact
            </Link>
            <Link href="/account" className="text-black hover:text-gray-700 transition-colors font-medium text-sm">
              Account
            </Link>
            <CartIcon />
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
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for jewelry..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-gray-500 bg-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <Search className="w-5 h-5 text-black" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-6">
              <Link href="/" className="text-black hover:text-gray-700 font-medium text-lg">
                Home
              </Link>
              <Link href="/about" className="text-black hover:text-gray-700 font-medium text-lg">
                About
              </Link>
              <Link href="/products" className="text-black hover:text-gray-700 font-medium text-lg">
                Products
              </Link>
              <Link href="/shop" className="text-black hover:text-gray-700 font-medium text-lg">
                Shop
              </Link>
              <Link href="/contact" className="text-black hover:text-gray-700 font-medium text-lg">
                Contact
              </Link>
              <Link href="/account" className="text-black hover:text-gray-700 font-medium text-lg">
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 