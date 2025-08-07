import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock, Shield, Truck, CreditCard, Star, Heart, Gift, Crown } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">


      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/WhatsApp_Image_2025-07-31_at_6.21.52_PM-removebg-preview.png"
                alt="Alankarika Logo"
                width={100}
                height={100}
                className="w-24 h-24"
              />
              <span className="text-2xl font-bold">Alankarika</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Crafting timeless jewelry pieces that celebrate life's most precious moments. Quality, elegance, and
              craftsmanship in every design at Alankarika.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C4A484] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C4A484] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C4A484] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C4A484] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C4A484] mt-1" />
                <div className="text-gray-400">
                  <p>123 Jewelry Street</p>
                  <p>Diamond District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-400">info@rosejewels.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#C4A484]" />
                <span className="text-gray-400">Mon-Sat: 9AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/necklaces" className="text-gray-400 hover:text-white transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/pendants" className="text-gray-400 hover:text-white transition-colors">
                  Pendants
                </Link>
              </li>
              <li>
                <Link href="/rings" className="text-gray-400 hover:text-white transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/earrings" className="text-gray-400 hover:text-white transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/bracelets" className="text-gray-400 hover:text-white transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="text-gray-400 hover:text-white transition-colors">
                  Wedding Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Special Offers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Special Offers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/limited-edition" className="text-gray-400 hover:text-white transition-colors">
                  Limited Edition
                </Link>
              </li>
              <li>
                <Link href="/personalized" className="text-gray-400 hover:text-white transition-colors">
                  Personalized Jewelry
                </Link>
              </li>
              <li>
                <Link href="/luxury-collection" className="text-gray-400 hover:text-white transition-colors">
                  Luxury Collection
                </Link>
              </li>
              <li>
                <Link href="/bridal-sets" className="text-gray-400 hover:text-white transition-colors">
                  Bridal Sets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for exclusive offers and latest collections</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#C4A484]"
              />
              <button className="px-6 py-3 bg-[#C4A484] text-white rounded-r-lg hover:bg-[#B89474] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© 2024 Rose Jewels. All rights reserved.</p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#C4A484]" />
              <span className="text-gray-400 text-sm">Premium Quality Since 1998</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
