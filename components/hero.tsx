"use client"

import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-[#C4A484] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-center min-h-[calc(100vh-120px)] py-12">
          {/* Left Content */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">
              <p className="text-white text-xl font-light italic opacity-90 tracking-wide">The original</p>
              <h1 className="text-white text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.85] tracking-tight">
                Shine bright
              </h1>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C4A484] px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
            >
              Discover Now
            </Button>

            {/* Product Categories */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center space-x-4 text-white group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <circle cx="12" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <p className="font-semibold text-lg">Ring</p>
                  <p className="text-sm opacity-80">& Earring</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-white group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <p className="font-semibold text-lg">Bangles &</p>
                  <p className="text-sm opacity-80">Bracelets</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-white group cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 8.5v7" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="group-hover:translate-x-2 transition-transform duration-300">
                  <p className="font-semibold text-lg">Drop</p>
                  <p className="text-sm opacity-80">Necklaces</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Model Image */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-96 lg:w-96 lg:h-[500px] relative animate-float">
                <Image
                  src="/placeholder.svg?height=500&width=400&text=Elegant+Woman+with+Jewelry"
                  alt="Beautiful woman wearing elegant jewelry"
                  fill
                  className="object-cover object-center rounded-lg"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-white rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Right Content - Watch Intro */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end items-start pt-16">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 border-2 border-white rounded-full flex flex-col items-center justify-center text-white hover:bg-white hover:text-[#C4A484] transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                <Play className="w-6 h-6 mb-2 fill-current" />
                <div className="text-xs font-bold tracking-widest text-center leading-tight">
                  <div>WATCH OUR</div>
                  <div>INTRO</div>
                </div>
              </div>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-30 animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full border border-white opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 flex space-x-3">
          <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#C4A484] transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#C4A484] transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
