"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, BookOpen } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const courses = [
  {
    id: 1,
    title: "Complete AI & Machine Learning Bootcamp",
    description: "Master AI from basics to advanced with hands-on projects and real-world applications.",
    instructor: {
      name: "Dr. Sarah Chen",
      image: "/professional-woman-instructor.jpg",
    },
    thumbnail: "/ai-machine-learning-course.jpg",
    rating: 4.9,
    reviews: 12450,
    students: "25,847",
    duration: "42 hours",
    price: { current: 2999, original: 9999 },
    level: "Intermediate",
    gradient: "from-purple-500 to-pink-500",
    category: "Artificial Intelligence",
  },
  {
    id: 2,
    title: "Full-Stack Web Development with React & Node.js",
    description: "Build modern web applications from frontend to backend with the latest technologies.",
    instructor: {
      name: "Mark Rodriguez",
      image: "/placeholder-c8t42.png",
    },
    thumbnail: "/web-development-coding.png",
    rating: 4.8,
    reviews: 8930,
    students: "18,392",
    duration: "38 hours",
    price: { current: 2499, original: 7999 },
    level: "Beginner",
    gradient: "from-blue-500 to-cyan-500",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Cloud Architecture with AWS",
    description: "Design and deploy scalable cloud solutions using Amazon Web Services.",
    instructor: {
      name: "James Wilson",
      image: "/professional-instructor.png",
    },
    thumbnail: "/cloud-computing-architecture.png",
    rating: 4.7,
    reviews: 6780,
    students: "12,456",
    duration: "35 hours",
    price: { current: 3499, original: 10999 },
    level: "Advanced",
    gradient: "from-orange-500 to-red-500",
    category: "Cloud Computing",
  },
  {
    id: 4,
    title: "Data Science & Analytics Masterclass",
    description: "Learn data analysis, visualization, and machine learning with Python and R.",
    instructor: {
      name: "Dr. Emily Zhang",
      image: "/placeholder-7k78r.png",
    },
    thumbnail: "/placeholder-wcfmv.png",
    rating: 4.9,
    reviews: 15670,
    students: "31,205",
    duration: "45 hours",
    price: { current: 2799, original: 8999 },
    level: "Intermediate",
    gradient: "from-green-500 to-teal-500",
    category: "Data Science",
  },
]

export function FeaturedCoursesSection() {
  const [scrolling, setScrolling] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Infinite scroll effect
  const scrollRight = () => {
    if (!carouselRef.current) return
    setScrolling(true)
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      // Reset to start for infinite effect
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' })
    } else {
      carouselRef.current.scrollBy({ left: 336, behavior: 'smooth' }) // 320px card + 16px gap
    }
    setTimeout(() => setScrolling(false), 500)
  }

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrolling) scrollRight()
    }, 3000)
    return () => clearInterval(interval)
  }, [scrolling])

  return (
  <section id="courses" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Trending Courses</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners in our most popular courses designed by industry experts
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "All",
              "Artificial Intelligence",
              "Web Development",
              "Cloud Computing",
              "Data Science",
              "DevOps",
              "Cyber Security",
            ].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow border border-blue-100 ${
                  category === "All"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
// Add scrollbar-hide utility if not present
// In your global CSS (e.g., globals.css), add:
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            style={{ WebkitOverflowScrolling: 'touch', maxWidth: '1040px', margin: '0 auto', alignItems: 'stretch' }}
            onScroll={() => {
              // Infinite scroll logic
              if (!carouselRef.current) return;
              const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
              // If at the end, reset to the start for seamless infinite scroll
              if (scrollLeft + clientWidth >= scrollWidth - clientWidth) {
                setTimeout(() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
                  }
                }, 300);
              }
            }}
          >
            {Array(3).fill(courses).flat().map((course, idx) => (
              <Card
                key={course.id + '-' + idx}
                className="min-w-[340px] max-w-[340px] group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white rounded-2xl flex flex-col justify-between"
                style={{ flex: '0 0 340px', height: '480px', background: '#f8fafc', boxShadow: '8px 8px 24px #e3e6ee, -8px -8px 24px #ffffff' }}
              >
                {/* Banner with image and gradient overlay */}
                <div className="relative h-44 w-full rounded-t-2xl overflow-hidden flex items-end justify-start">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-80 z-10`} />
                  <div className="relative z-20 flex flex-col p-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm font-semibold tracking-wide">
                        {course.level}
                      </Badge>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold leading-tight line-clamp-2 drop-shadow-lg text-white">
                      {course.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="flex flex-col justify-between flex-1 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm font-medium text-gray-900 ml-1">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">₹{course.price.current.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{course.price.original.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {Math.round((1 - course.price.current / course.price.original) * 100)}% OFF
                    </div>
                  </div>
                  <Button className="w-full shadow-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-2 mt-4">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <button
            onClick={scrollRight}
            disabled={scrolling}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 z-10 transition-all"
            style={{ boxShadow: '0 4px 16px #60a5fa33' }}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent font-semibold"
          >
            Browse All Courses
          </Button>
          <p className="text-sm text-gray-600 mt-2">Explore our wide range of courses</p>
        </div>
      </div>
    </section>
  )
}
