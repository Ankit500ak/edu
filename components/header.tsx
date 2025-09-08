"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Menu, X, ShoppingCart, User } from "lucide-react"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
              style={{ backgroundColor: "#0891b2" }}
            >
              <span className="font-bold text-xl font-heading" style={{ color: "#ffffff" }}>
                S
              </span>
            </div>
            <span className="text-2xl font-bold font-heading" style={{ color: "#4b5563" }}>
              SkillSphere
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a
              href="#courses"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#4b5563" }}
            >
              All Courses
            </a>
            <a
              href="#categories"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#4b5563" }}
            >
              Categories
            </a>
            <a
              href="#pricing"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#4b5563" }}
            >
              Pricing
            </a>
            <a
              href="#success-stories"
              className="hover:text-cyan-600 transition-colors font-medium"
              style={{ color: "#4b5563" }}
            >
              About
            </a>
          </nav>

          {/* Search Bar removed as requested */}

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" style={{ color: "#4b5563" }}>
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" style={{ color: "#4b5563" }}>
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
              style={{ borderColor: "#0891b2", color: "#0891b2" }}
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
            <Button
              className="shadow-md"
              style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
              onClick={() => router.push("/signup")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            style={{ color: "#4b5563" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#courses"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#4b5563" }}
              >
                All Courses
              </a>
              <a
                href="#categories"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#4b5563" }}
              >
                Categories
              </a>
              {/* Instructors link removed */}
              <a
                href="#pricing"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#4b5563" }}
              >
                Pricing
              </a>
              <a
                href="#success-stories"
                className="hover:text-cyan-600 transition-colors font-medium"
                style={{ color: "#4b5563" }}
              >
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="outline"
                  className="border-cyan-600 hover:bg-cyan-600 bg-transparent"
                  style={{ borderColor: "#0891b2", color: "#0891b2" }}
                  onClick={() => router.push("/login")}
                >
                  Log In
                </Button>
                <Button
                  style={{ backgroundColor: "#0891b2", color: "#ffffff" }}
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export { Header };

