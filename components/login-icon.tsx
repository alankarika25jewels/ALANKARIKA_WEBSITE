"use client"

import { useAuth } from "@/contexts/auth-context"
import { User } from "lucide-react"
import Link from "next/link"

export default function LoginIcon() {
  const { user, loading, logout, openLoginModal } = useAuth()

  if (loading) {
    return (
      <div className="px-2 md:px-3 py-1 md:py-2">
        <User className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
      </div>
    )
  }

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center space-x-2 group">
          <div className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs md:text-sm font-medium hidden sm:block">
              {user.name}
            </span>
          </div>

          <div className="absolute right-0 top-full mt-2 w-40 md:w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-2">
              <div className="px-2 md:px-3 py-2 border-b border-gray-100">
                <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <Link
                href="/account"
                className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                My Account
              </Link>
              <button
                onClick={() => logout()}
                className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <User className="w-3 h-3 md:w-4 md:h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={openLoginModal}
          className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white lg:bg-white/10 lg:hover:bg-white/20"
        >
          <User className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium hidden sm:block">Login</span>
        </button>
      )}
    </div>
  )
}
