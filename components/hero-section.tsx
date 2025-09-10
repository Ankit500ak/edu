"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from "next/navigation"

export function HeroSection() {
  const { isLoggedIn, showAuthModal } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      showAuthModal('signup')
    }
  }

  const handleExplore = () => {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      showAuthModal('login')
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 overflow-hidden min-h-[70vh] flex items-center">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-bounce animation-delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-lg">
                <span className="text-sm font-semibold text-blue-600">🚀 Join 50,000+ Learners</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Unlock Your{" "}
                  <span className="relative">
                    <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text">
                      Potential
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30 rounded-full transform -skew-x-12"></div>
                  </span>
                  <br />
                  With Expert-Led Courses
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Transform your career with industry-leading courses designed by world-class experts. 
                  Start learning today and join the future of education.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <Button
                  size="lg"
                  className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 rounded-2xl font-semibold"
                  onClick={handleGetStarted}
                >
                  <span className="flex items-center gap-2">
                    {isLoggedIn ? '🎯 Go to Dashboard' : '🚀 Start Learning Today'}
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 rounded-2xl font-semibold shadow-lg backdrop-blur-sm bg-white/80"
                  onClick={handleExplore}
                >
                  <span className="flex items-center gap-2">
                    {isLoggedIn ? '📚 My Courses' : '👀 Explore Courses'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative lg:block hidden">
              <div className="relative max-w-md mx-auto">
                {/* Main illustration container */}
                <div className="relative w-full h-80 bg-gradient-to-br from-white/60 to-blue-50/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-6 transform transition-transform duration-700 hover:scale-105">
                  
                  {/* Floating cards with parallax */}
                  <div className="absolute -top-3 -right-3 w-28 h-16 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 transform rotate-12 animate-float hover:rotate-6 transition-transform duration-500">
                    <div className="w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-1.5"></div>
                    <div className="w-3/4 h-1 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl transform -rotate-12 animate-bounce-slow hover:rotate-6 transition-transform duration-700 flex items-center justify-center group">
                    <span className="text-white text-xl group-hover:scale-110 transition-transform duration-300">📊</span>
                  </div>
                  
                  <div className="absolute top-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl animate-pulse hover:scale-110 transition-transform duration-500 flex items-center justify-center group">
                    <span className="text-white text-lg group-hover:rotate-12 transition-transform duration-300">🎯</span>
                  </div>
                  
                  {/* Center content with parallax */}
                  <div className="flex flex-col items-center justify-center h-full text-center transform transition-transform duration-500 hover:scale-105">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl mb-3 flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-500 group">
                      <span className="text-white text-2xl group-hover:scale-110 transition-transform duration-300">🎓</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">Learn & Grow</h3>
                    <p className="text-gray-600 text-xs">Interactive courses designed for success</p>
                  </div>
                </div>
                
                {/* Additional parallax background elements */}
                <div className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-pulse transform hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-6 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40 animate-bounce transform hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute top-12 -right-6 w-6 h-6 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-full opacity-50 animate-pulse transform hover:scale-110 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
