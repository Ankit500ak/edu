"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { useAuth } from '@/contexts/auth-context'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, showAuthModal, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="bg-[#1b2434] border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="https://youngthames.com" rel="noopener noreferrer">
              <img
                src="/logo.png"
                alt="SkillSphere Logo"
                className="w-45 h-14 rounded-lg object-cover"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#courses"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#ffffffff" }}
            >
              All Courses
            </a>
            <a
              href="#categories"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#ffffffff" }}
            >
              Categories
            </a>
            <a
              href="#pricing"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#ffffffff" }}
            >
              Pricing
            </a>
            <a
              href="#success-stories"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#ffffffff" }}
            >
              About
            </a>
          </nav>

          

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" style={{ color: "#4b5563" }}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" style={{ color: "#4b5563" }}>
              <User className="h-5 w-5" />
            </Button>
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
                  style={{ borderColor: "#0891b2", color: "#0891b2" }}
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  className="shadow-md"
                  style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
                  style={{ borderColor: "#0891b2", color: "#0891b2" }}
                  onClick={() => showAuthModal('login')}
                >
                  Log In
                </Button>
                <Button
                  className="shadow-md"
                  style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
                  onClick={() => showAuthModal('signup')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            style={{ color: "#ffffffff" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-2 border-t border-gray-200 pt-2">
            <nav className="flex flex-col space-y-4">
              <a
                href="#courses"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#ffffffff" }}
              >
                All Courses
              </a>
              <a
                href="#categories"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#ffffffff" }}
              >
                Categories
              </a>
              <a
                href="#instructors"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#ffffffff" }}
              >
                Instructors
              </a>
              <a
                href="#pricing"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#ffffffff" }}
              >
                Pricing
              </a>
              <a
                href="#success-stories"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#ffffffff" }}
              >
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
                      style={{ borderColor: "#0891b2", color: "#0891b2" }}
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </Button>
                    <Button
                      style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
                      style={{ borderColor: "#0891b2", color: "#0891b2" }}
                      onClick={() => showAuthModal('login')}
                    >
                      Log In
                    </Button>
                    <Button
                      style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
                      onClick={() => showAuthModal('signup')}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export { Header };

