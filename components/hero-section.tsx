import { Button } from "@/components/ui/button"
import { CheckCircle, Play, Star, Users, Award, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-[60vh] py-8 lg:py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-cyan-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200/30 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center h-full gap-6">
            <div className="flex items-center gap-2 self-start bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
              <Star className="h-4 w-4 fill-current" />
              #1 Online Learning Platform
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl">
              Master New Skills, <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                Advance Your Career
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Join <span className="font-semibold text-blue-600">50,000+ professionals</span> learning from industry experts.<br />
              Get certified, build projects, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8 py-3 shadow-lg font-semibold">
                Start Learning Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-base px-8 py-3 group bg-transparent font-semibold"
              >
                <Play className="h-5 w-5 mr-2 group-hover:text-blue-600" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Side - Visual Content */}
          <div className="relative">
            {/* Main Course Preview Card */}
            <div className="bg-white rounded-xl shadow-xl p-4 relative z-10">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-2 flex items-center justify-center">
                <Play className="h-6 w-6 text-white fill-current bg-white/20 rounded-full p-2" />
              </div>
              <h3 className="font-semibold text-base text-gray-900 mb-1">Web Development Bootcamp</h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Users className="h-3 w-3" /> 12,450 students
                <Clock className="h-3 w-3 ml-3" /> 40 hours
              </div>
            </div>

            {/* Floating Elements removed for compactness */}
          </div>
        </div>
      </div>
    </section>
  )
}
