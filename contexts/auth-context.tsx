"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'
import { AuthModal } from '@/components/auth-modal'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type AuthMode = 'login' | 'signup'

interface AuthContextType {
  isLoggedIn: boolean
  showAuthModal: (mode?: AuthMode) => void
  hideAuthModal: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user)
      if (event === 'SIGNED_IN') {
        setShowModal(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const showAuthModal = (mode: AuthMode = 'login') => {
    setAuthMode(mode)
    setShowModal(true)
  }

  const hideAuthModal = () => {
    setShowModal(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, showAuthModal, hideAuthModal, logout }}>
      {children}
      <AuthModal
        isOpen={showModal}
        onClose={hideAuthModal}
        defaultMode={authMode}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}