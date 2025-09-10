"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Users, Clock, BookOpen, Search, Filter, Grid, List, ChevronDown } from "lucide-react"
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from "next/navigation"

const categories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Mobile Development",
  "Cloud Computing",
  "Artificial Intelligence",
  "Cybersecurity",
  "Digital Marketing",
  "UI/UX Design",
  "DevOps",
  "Blockchain",
  "Game Development"
]

const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    instructor: "John Smith",
    category: "Web Development",
    level: "Beginner",
    duration: "12 hours",
    students: 15420,
    rating: 4.8,
    reviews: 2340,
    price: 89.99,
    originalPrice: 199.99,
    image: "/course1.jpg",
    description: "Master React from basics to advanced concepts with hands-on projects",
    skills: ["React", "JavaScript", "Redux", "Hooks"]
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Sarah Johnson",
    category: "Data Science",
    level: "Intermediate",
    duration: "18 hours",
    students: 12850,
    rating: 4.9,
    reviews: 1890,
    price: 129.99,
    originalPrice: 249.99,
    image: "/course2.jpg",
    description: "Learn Python programming for data analysis, visualization, and machine learning",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"]
  },
  {
    id: 3,
    title: "Flutter Mobile App Development",
    instructor: "Mike Chen",
    category: "Mobile Development",
    level: "Beginner",
    duration: "15 hours",
    students: 8950,
    rating: 4.7,
    reviews: 1250,
    price: 99.99,
    originalPrice: 179.99,
    image: "/course3.jpg",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart",
    skills: ["Flutter", "Dart", "Mobile UI", "Firebase"]
  },
  {
    id: 4,
    title: "AWS Cloud Practitioner",
    instructor: "Emily Davis",
    category: "Cloud Computing",
    level: "Beginner",
    duration: "10 hours",
    students: 11200,
    rating: 4.6,
    reviews: 980,
    price: 79.99,
    originalPrice: 149.99,
    image: "/course4.jpg",
    description: "Get AWS certified and learn cloud computing fundamentals",
    skills: ["AWS", "Cloud Computing", "EC2", "S3"]
  },
  {
    id: 5,
    title: "Machine Learning A-Z",
    instructor: "Dr. Alex Kumar",
    category: "Artificial Intelligence",
    level: "Advanced",
    duration: "25 hours",
    students: 9840,
    rating: 4.9,
    reviews: 2100,
    price: 149.99,
    originalPrice: 299.99,
    image: "/course5.jpg",
    description: "Complete machine learning course from theory to practical implementation",
    skills: ["Machine Learning", "Python", "TensorFlow", "Scikit-learn"]
  },
  {
    id: 6,
    title: "Ethical Hacking & Cybersecurity",
    instructor: "James Wilson",
    category: "Cybersecurity",
    level: "Intermediate",
    duration: "20 hours",
    students: 7650,
    rating: 4.7,
    reviews: 1450,
    price: 119.99,
    originalPrice: 229.99,
    image: "/course6.jpg",
    description: "Learn ethical hacking techniques and cybersecurity best practices",
    skills: ["Ethical Hacking", "Penetration Testing", "Network Security", "Kali Linux"]
  }
]

export function BrowseCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  
  const { isLoggedIn, showAuthModal } = useAuth()
  const router = useRouter()

  const handleEnrollClick = (courseId: number) => {
    if (isLoggedIn) {
      router.push(`/course/${courseId}`)
    } else {
      showAuthModal('signup')
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "rating": return b.rating - a.rating
      case "newest": return b.id - a.id
      default: return b.students - a.students // popularity
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Browse Courses</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover thousands of courses taught by expert instructors. Learn new skills and advance your career.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                
                {/* Search */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Search</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Category Filter */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Category</h3>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Level Filter */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Level</h3>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Levels">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Price Range */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Price Range</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={300}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {sortedCourses.length} courses found
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== "All Categories" && `in ${selectedCategory}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Grid/List */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {sortedCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className={viewMode === "grid" ? "" : "flex flex-col sm:flex-row"}>
                    {/* Course Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === "grid" ? "h-48" : "sm:w-64 h-48 sm:h-auto"
                    }`}>
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90">
                          {course.level}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-600">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className={`p-6 flex-1 ${viewMode === "list" ? "sm:pl-6" : ""}`}>
                      <div className="space-y-3">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {course.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">
                          {course.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1">
                          {course.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {course.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{course.skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Course Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{course.rating}</span>
                            <span>({course.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        {/* Price and Enroll */}
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              ${course.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${course.originalPrice}
                            </span>
                          </div>
                          <Button
                            onClick={() => handleEnrollClick(course.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {isLoggedIn ? "Enroll Now" : "View Course"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}