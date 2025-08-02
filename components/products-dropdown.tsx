"use client";

import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const categories = [
    {
        name: "Ladies Buckle",
        href: "/category/ladies-buckle",
        subCategory: "Buckle Direct Casting Stone",
      },
      {
        name: "Gents Buckle",
        href: "/category/gents-buckle",
        subCategory: "Buckle Direct Casting Plain",
      },
      {
        name: "Pendant Tops",
        href: "/category/pendant-tops",
        subCategory: "Buckle Direct Stone",
      },
      {
        name: "Pendant Set",
        href: "/category/pendant-set",
        subCategory: "Pendent Tops Casting Plain",
      },
      {
        name: "Necklace Tops",
        href: "/category/necklace-tops",
        subCategory: "Pendent Tops Casting Stone",
      },
      {
        name: "Necklace",
        href: "/category/necklace",
        subCategory: "Pendent Tops Direct Casting Plain",
      },
      {
        name: "Wedding Ladies Ring",
        href: "/category/wedding-ladies-ring",
        subCategory: "Pendent Tops Direct Casting Stone",
      },
      {
        name: "Wedding Gents Ring",
        href: "/category/wedding-gents-ring",
        subCategory: "Pendent Set Casting Plain",
      },
      {
        name: "Double Naka Tops",
        href: "/category/double-naka-tops",
        subCategory: "Pendent Set Casting Stone",
      },
      {
        name: "Double Naka Pendant",
        href: "/category/double-naka-pendant",
        subCategory: "Pendent Set Direct Casting Plain",
      },
      {
        name: "Mangalsutra",
        href: "/category/mangalsutra",
        subCategory: "Pendent Set Direct Casting Stone",
      },
      {
        name: "Gents Kada",
        href: "/category/gents-kada",
        subCategory: "Necklace Tops Direct Casting Stone",
      },
      {
        name: "Ladies Kada",
        href: "/category/ladies-kada",
        subCategory: "Necklace Tops Direct Casting Plain",
      },
      {
        name: "Baby Bracelet",
        href: "/category/baby-bracelet",
        subCategory: "Necklace Tops Casting Plain",
      },
      {
        name: "Gents Bracelet",
        href: "/category/gents-bracelet",
        subCategory: "Necklace Tops Casting Stone",
      },
      {
        name: "Ladies Bracelet",
        href: "/category/ladies-bracelet",
        subCategory: "Necklace Direct Casting Plain",
      },
      {
        name: "Ladies Chain",
        href: "/category/ladies-chain",
        subCategory: "Necklace Direct Casting Stone",
      },
      {
        name: "Gents Chain",
        href: "/category/gents-chain",
        subCategory: "Necklace Casting Plain",
      },
      {
        name: "Baby Tops",
        href: "/category/baby-tops",
        subCategory: "Necklace Casting Stone",
      },
      {
        name: "Ladies Tops",
        href: "/category/ladies-tops",
        subCategory: "Wedding Ring Casting Stone",
      },
      {
        name: "Baby Pendant",
        href: "/category/baby-pendant",
        subCategory: "Wedding Ring Casting Plain",
      },
      {
        name: "Pendant",
        href: "/category/pendant",
        subCategory: "Wedding Ring Direct Casting Stone",
      },
      {
        name: "Baby Ring",
        href: "/category/baby-ring",
        subCategory: "Wedding Ring Direct Casting Plain",
      },
      {
        name: "Gents Ring",
        href: "/category/gents-ring",
        subCategory: "DNT Casting Plain",
      },
    ];

const ProductsDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => {
        setShowDropdown(false);
        setHoveredCategory(null);
      }}
    >
             {/* Products Tab */}
               <button className="px-4 py-2 text-sm text-black hover:text-gray-700 flex items-center gap-1 font-medium">
          Products
          <FiChevronDown />
        </button>

             {/* Category Dropdown */}
       {showDropdown && (
         <div className="absolute top-full right-0 mt-2 z-50">
           {/* Categories Grid */}
           <div className="w-[600px] bg-white border rounded shadow-md p-4">
                           <div className="grid grid-cols-4 gap-1">
               {categories.map((cat, idx) => (
                 <div
                   key={idx}
                   onMouseEnter={() => setHoveredCategory(cat.name)}
                   onMouseLeave={() => setHoveredCategory(null)}
                   className="relative"
                 >
                   <Link
                     href={cat.href}
                                           className="block px-2 py-1 text-xs text-gray-800 hover:bg-gray-100 rounded transition-colors"
                   >
                     {cat.name}
                   </Link>
                   
                   {/* Subcategory Panel - appears on the left */}
                   {hoveredCategory === cat.name && (
                     <div className="absolute right-full top-0 mr-2 w-48 bg-white border rounded shadow-md p-3">
                       <p className="text-xs text-gray-700 font-medium">
                         {cat.subCategory}
                       </p>
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default ProductsDropdown;
