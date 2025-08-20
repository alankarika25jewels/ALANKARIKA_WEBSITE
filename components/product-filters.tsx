"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductFilters() {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    material: true,
    color: true,
    size: true,
  })

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])



  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        {selectedFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Selected Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#C4A484] text-white"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Category
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.category ? "rotate-180" : ""}`} />
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {["Rings", "Earrings", "Necklaces", "Bracelets", "Watches"].map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 text-[#C4A484] focus:ring-[#C4A484]"
                  onChange={(e) => (e.target.checked ? addFilter(category) : removeFilter(category))}
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
        </button>
        {openSections.price && (
          <div className="space-y-2">
            {["Under $100", "$100 - $200", "$200 - $500", "$500 - $1000", "Over $1000"].map((range) => (
              <label key={range} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 text-[#C4A484] focus:ring-[#C4A484]"
                  onChange={(e) => (e.target.checked ? addFilter(range) : removeFilter(range))}
                />
                <span className="text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("material")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Material
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.material ? "rotate-180" : ""}`} />
        </button>
        {openSections.material && (
          <div className="space-y-2">
            {["Gold", "Silver", "Platinum", "Diamond", "Pearl", "Rose Gold"].map((material) => (
              <label key={material} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 text-[#C4A484] focus:ring-[#C4A484]"
                  onChange={(e) => (e.target.checked ? addFilter(material) : removeFilter(material))}
                />
                <span className="text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("color")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Color
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.color ? "rotate-180" : ""}`} />
        </button>
        {openSections.color && (
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: "Gold", color: "#FFD700" },
              { name: "Silver", color: "#C0C0C0" },
              { name: "Rose Gold", color: "#E8B4B8" },
              { name: "White", color: "#FFFFFF" },
              { name: "Black", color: "#000000" },
              { name: "Blue", color: "#0066CC" },
              { name: "Red", color: "#CC0000" },
              { name: "Green", color: "#00CC66" },
            ].map((colorOption) => (
              <button
                key={colorOption.name}
                onClick={() =>
                  selectedFilters.includes(colorOption.name)
                    ? removeFilter(colorOption.name)
                    : addFilter(colorOption.name)
                }
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedFilters.includes(colorOption.name) ? "border-[#C4A484]" : "border-gray-300"
                }`}
                style={{ backgroundColor: colorOption.color }}
                title={colorOption.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Size
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections.size ? "rotate-180" : ""}`} />
        </button>
        {openSections.size && (
          <div className="grid grid-cols-4 gap-2">
            {["XS", "S", "M", "L", "XL", "5", "6", "7", "8", "9", "10", "11"].map((size) => (
              <button
                key={size}
                onClick={() => (selectedFilters.includes(size) ? removeFilter(size) : addFilter(size))}
                className={`px-3 py-2 text-sm border rounded ${
                  selectedFilters.includes(size)
                    ? "border-[#C4A484] bg-[#C4A484] text-white"
                    : "border-gray-300 text-gray-700 hover:border-[#C4A484]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
