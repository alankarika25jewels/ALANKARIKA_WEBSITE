"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import LoginModal from '@/components/login-modal'

export type AuthUser = {
  _id: string
  email: string
  firstName: string
  lastName: string
  name: string
  phone?: string
  role?: string
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  refreshUser: () => Promise<AuthUser | null>
  logout: () => Promise<void>
  requireAuth: (onSuccess?: () => void) => boolean
  openLoginModal: () => void
  setUserFromLogin: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const pendingAction = useRef<(() => void) | null>(null)

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (!res.ok) {
        setUser(null)
        return null
      }
      const data = await res.json()
      const nextUser: AuthUser = {
        _id: data._id,
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.email,
        phone: data.phone,
        role: data.role,
      }
      setUser(nextUser)
      return nextUser
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const setUserFromLogin = useCallback((u: AuthUser) => {
    setUser(u)
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // ignore
    }
    setUser(null)
    localStorage.removeItem('dashboardAuth')
    localStorage.removeItem('dashboardUser')
  }, [])

  const openLoginModal = useCallback(() => {
    setLoginOpen(true)
  }, [])

  const requireAuth = useCallback(
    (onSuccess?: () => void) => {
      if (user) {
        onSuccess?.()
        return true
      }
      pendingAction.current = onSuccess || null
      setLoginOpen(true)
      return false
    },
    [user]
  )

  const handleLoginSuccess = useCallback(
    async (partial: { name: string; email: string; firstName: string; lastName: string }) => {
      const refreshed = await refreshUser()
      if (!refreshed) {
        setUser({
          _id: '',
          email: partial.email,
          firstName: partial.firstName,
          lastName: partial.lastName,
          name: partial.name,
        })
      }
      setLoginOpen(false)
      const action = pendingAction.current
      pendingAction.current = null
      if (action) {
        // Wait a tick so cookie / state settle
        setTimeout(() => action(), 50)
      }
    },
    [refreshUser]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser,
        logout,
        requireAuth,
        openLoginModal,
        setUserFromLogin,
      }}
    >
      {children}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false)
          pendingAction.current = null
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </AuthContext.Provider>
  )
}
