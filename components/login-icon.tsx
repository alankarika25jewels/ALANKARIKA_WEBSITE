"use client"

import { useState, useEffect } from "react"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "./login-modal"

interface User {
  name: string
  email: string
  firstName?: string
  lastName?: string
}

export default function LoginIcon() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser({
          name: data.firstName ? `${data.firstName} ${data.lastName}`.trim() : data.email.split('@')[0],
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        })
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = (userData: User) => {
    setUser(userData)
    setIsLoginModalOpen(false)
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    )
  }

  return (
    <>
      <div className="relative">
        {user ? (
          // User is logged in - show name and logout option
          <div className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="text-white text-xs md:text-sm font-medium hidden sm:block">
                {user.name}
              </span>
            </div>
            
            {/* Logout dropdown */}
            <div className="absolute right-0 top-full mt-2 w-40 md:w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <div className="px-2 md:px-3 py-2 border-b border-gray-100">
                  <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // User is not logged in - show login button
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white lg:text-white lg:bg-white/10 lg:hover:bg-white/20 lg:text-white"
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-medium hidden sm:block">Login</span>
          </button>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
