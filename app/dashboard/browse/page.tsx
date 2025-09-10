"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Award,
  Bell,
  BookOpen,
  Bookmark,
  ChevronDown,
  Cloud,
  Grid,
  Home,
  Layers,
  Menu,
  MessageSquare,
  PanelLeft,
  Search,
  Settings,
  Users,
  Wand2,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { createClient } from '@supabase/supabase-js'
import { usePathname } from "next/navigation"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Sidebar items for course selling website
type SidebarSubItem = {
  title: string
  url: string
  badge?: string
}
type SidebarItem = {
  title: string
  icon: JSX.Element
  isActive?: boolean
  url?: string
  badge?: string
  items?: SidebarSubItem[]
  onClick?: () => void
}
// Types for database courses
interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructor_bio: string
  category: string
  level: string
  duration_hours: number
  price: number
  original_price?: number
  rating: number
  students_count: number
  reviews_count: number
  image_url?: string
  is_featured: boolean
  is_trending: boolean
  skills: string[]
  prerequisites?: string
  what_you_learn: string[]
  created_at: string
  updated_at: string
  published_at?: string
  status: string
}

export function BrowseCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [notifications, setNotifications] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const pathname = usePathname();

  // Fetch courses from database
  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'published')
          .order(sortBy === 'newest' ? 'created_at' : sortBy === 'rating' ? 'rating' : 'students_count', 
                 { ascending: false })

        if (error) {
          console.error('Error fetching courses:', error)
          return
        }

        setCourses(data || [])
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [sortBy])

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single()
        if (data && data.username) {
          setUsername(data.username)
          setAvatarUrl(data.avatar_url || null)
        } else if (user.email) {
          const [name, domain] = user.email.split('@')
          const shortEmail = name.length > 3 ? name.slice(0, 3) + '...' : name + '...'
          setUsername(shortEmail + '@' + domain)
        } else {
          setUsername('User')
        }
      }
    }
    fetchProfile()
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  // Get unique categories and levels
  const categories = ["All", ...Array.from(new Set(courses.map(course => course.category)))]
  const levels = ["All", ...Array.from(new Set(courses.map(course => course.level)))]

  // Get featured courses
  const featuredCourses = courses.filter(course => course.is_featured).slice(0, 6)

  // Sidebar items must be inside the component to access setActiveSection
  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <Home />,
      url: "/dashboard",
      isActive: pathname === "/dashboard" || pathname === "/dashboard/",
    },
    {
      title: "My Courses",
      icon: <BookOpen />,
      url: "/dashboard/courses",
      isActive: pathname === "/dashboard/courses",
    },
    {
      title: "Browse Courses",
      icon: <Grid />,
      url: "/dashboard/browse",
      isActive: pathname === "/dashboard/browse",
    },
    {
      title: "Certificates",
      icon: <Award />,
      url: "/dashboard/certificates",
      isActive: pathname === "/dashboard/certificates",
    },
    {
      title: "Instructors",
      icon: <Users />,
      url: "/dashboard/instructors",
    },
    {
      title: "Community",
      icon: <MessageSquare />,
      url: "/dashboard/community",
    },
    {
      title: "Resources",
      icon: <Bookmark />,
      url: "/dashboard/resources",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">{username || 'User'}</h2>
                <p className="text-xs text-muted-foreground">Creative Suite</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  {item.onClick ? (
                    <button
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                        item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                      onClick={item.onClick}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronDown
                          className={cn(
                            "ml-2 h-4 w-4 transition-transform",
                            expandedItems[item.title] ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    <a
                      href={item.url}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                        item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronDown
                          className={cn(
                            "ml-2 h-4 w-4 transition-transform",
                            expandedItems[item.title] ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </a>
                  )}
                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={username || 'User'} />
                    ) : (
                      <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{username || 'User'}</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <Wand2 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">{username || 'User'}</h2>
                <p className="text-xs text-muted-foreground">Creative Suite</p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  {item.url ? (
                    <a
                      href={item.url}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                        item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronDown
                          className={cn(
                            "ml-2 h-4 w-4 transition-transform",
                            expandedItems[item.title] ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </a>
                  ) : (
                    <button
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                        item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                      onClick={() => item.items && toggleExpanded(item.title)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.items && (
                        <ChevronDown
                          className={cn(
                            "ml-2 h-4 w-4 transition-transform",
                            expandedItems[item.title] ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </button>
                  )}
                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={username || 'User'} />
                    ) : (
                      <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{username || 'User'}</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Pro
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Skil Sphere</h1>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <Cloud className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Cloud Storage</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Messages</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {/* Browse Courses Header */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
              <p className="text-muted-foreground">Discover new skills and advance your career with our comprehensive course library</p>
            </motion.div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses, instructors, topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl bg-muted pl-10 pr-4 py-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl border bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 rounded-xl border bg-background"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-xl border bg-background"
                  >
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                    <option value="students_count">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Featured Courses Section */}
            {!searchQuery && selectedCategory === "All" && selectedLevel === "All" && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="rounded-2xl bg-muted animate-pulse h-80" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {featuredCourses.map((course: Course) => (
                      <Card key={course.id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                          <img src={course.image_url || '/placeholder.svg?height=200&width=400'} alt={course.title} className="h-48 w-full object-cover bg-gray-100" />
                          <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-3 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                          <Badge className="absolute top-3 right-3 bg-yellow-500 text-white rounded-xl px-3 py-1 text-xs font-semibold shadow">Featured</Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg leading-tight mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-bold text-lg text-primary">${course.price}</div>
                            <span className="text-sm text-muted-foreground">{course.duration_hours}h</span>
                          </div>
                          <Button className="w-full rounded-xl">Enroll Now</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* All Courses Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {searchQuery ? `Search Results (${filteredCourses.length})` : 'All Courses'}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                </div>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="rounded-2xl bg-muted animate-pulse h-80" />
                  ))}
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses.map((course: Course) => (
                    <Card key={course.id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <img src={course.image_url || '/placeholder.svg?height=160&width=320'} alt={course.title} className="h-40 w-full object-cover bg-gray-100" />
                        <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-2 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                        {course.is_trending && (
                          <Badge className="absolute top-3 right-3 bg-red-500 text-white rounded-xl px-2 py-1 text-xs font-semibold shadow">Trending</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg leading-tight mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-muted-foreground">{course.level}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-bold text-primary">${course.price}</div>
                          <div className="text-xs text-muted-foreground">{course.duration_hours}h</div>
                        </div>
                        <Button className="w-full rounded-xl text-sm" size="sm">Enroll Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}


export default function BrowseCoursesMain() {
  return <BrowseCoursesPage />
}