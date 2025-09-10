"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Bookmark,
  ChevronDown,
  Code,
  Home,
  Layers,
  Menu,
  MessageSquare,
  Palette,
  PanelLeft,
  Search,
  Settings,
  TrendingUp,
  Users,
  Wand2,
  X,
  Grid,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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

interface DashboardStats {
  totalCourses: number
  completedCourses: number
  inProgress: number
  totalHours: number
  certificates: number
  currentStreak: number
}

export function DesignaliCreative() {
  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [username, setUsername] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgress: 0,
    totalHours: 0,
    certificates: 0,
    currentStreak: 0
  })
  const pathname = usePathname();

  // Fetch courses from database
  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching courses:', error)
          return
        }

        setCourses(data || [])
        
        // Simulate user stats for demo
        setStats({
          totalCourses: 12,
          completedCourses: 7,
          inProgress: 3,
          totalHours: 89,
          certificates: 5,
          currentStreak: 15
        })
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', user.id)
          .single()
        
        if (error) {
          console.error('Error fetching profile:', error)
        }
        
        if (data) {
          setUsername(data.username || null)
          setFullName(data.full_name || null)
          setAvatarUrl(data.avatar_url || null)
          
          // Debug logging
          console.log('Profile data:', data)
          console.log('Full name:', data.full_name)
          console.log('Username:', data.username)
        }
        
        // Fallback logic if no profile data
        if (!data || (!data.username && !data.full_name)) {
          if (user.email) {
            const emailName = user.email.split('@')[0]
            setUsername(emailName)
          } else {
            setUsername('User')
          }
        }
      }
    }
    fetchProfile()
  }, [])

  // Helper function to get user initials
  const getUserInitials = () => {
    if (fullName) {
      // Get initials from full name (first letter of each word)
      return fullName.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)
    } else if (username) {
      // Get first letter of username
      return username.charAt(0).toUpperCase()
    }
    return 'U'
  }

  // Helper function to get display name with proper priority
  const getDisplayName = () => {
    console.log('Getting display name - fullName:', fullName, 'username:', username)
    return fullName || username || 'User'
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }
  const featuredCourses = courses.filter(course => course.is_featured).slice(0, 3)
  const trendingCourses = courses.filter(course => course.is_trending).slice(0, 3)
  const recentCourses = courses.slice(0, 4)

  // Helper to get image URL for a course
  function getImageUrl(course: Course, idx: number) {
    if (course.image_url && course.image_url.trim() !== "") {
      return course.image_url
    }
    // Fallback images
    const fallbackImages = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop&q=80'
    ]
    return fallbackImages[idx % fallbackImages.length]
  }

  // Sidebar items must be inside the component to access pathname
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
      isActive: pathname === "/dashboard/instructors",
    },
    {
      title: "Community",
      icon: <MessageSquare />,
      url: "/dashboard/community",
      isActive: pathname === "/dashboard/community",
    },
    {
      title: "Resources",
      icon: <Bookmark />,
      url: "/dashboard/resources",
      isActive: pathname === "/dashboard/resources",
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
                <h2 className="font-semibold">{getDisplayName()}</h2>
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
                      <AvatarImage src={avatarUrl} alt={fullName || username || 'User'} />
                    ) : (
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{fullName || username || 'User'}</span>
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
                <h2 className="font-semibold">{getDisplayName()}</h2>
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
                      <AvatarImage src={avatarUrl} alt={fullName || username || 'User'} />
                    ) : (
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{getDisplayName()}</span>
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
            <h1 className="text-xl font-semibold">Skill Sphere</h1>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => window.location.href = '/'}>
                      <Home className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Home</TooltipContent>
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
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={fullName || username || 'User'} />
                ) : (
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Welcome Section with Glass Effect - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-300/20 rounded-full blur-2xl translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4 lg:flex-1">
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
                    >
                      Welcome back, {getDisplayName()}!
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-sm text-white/90 mt-2 max-w-[500px]"
                    >
                      Continue your learning journey and unlock new skills. You're making amazing progress!
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex gap-3 flex-wrap"
                  >
                    <Button 
                      size="sm"
                      className="bg-white text-violet-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.location.href = '/dashboard/browse'}
                    >
                      Browse Courses
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                      onClick={() => window.location.href = '/dashboard/courses'}
                    >
                      My Courses
                    </Button>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-4 lg:mt-0 lg:ml-6"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                    <div className="text-2xl font-bold mb-1">{stats.currentStreak}</div>
                    <div className="text-white/80 text-xs">Day Streak</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Stats Cards with Animation */}
            <section>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Your Learning Analytics
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { value: stats.totalCourses, label: "Total Courses", gradient: "from-blue-500 to-cyan-500", bg: "from-blue-50 to-cyan-50" },
                  { value: stats.completedCourses, label: "Completed", gradient: "from-green-500 to-emerald-500", bg: "from-green-50 to-emerald-50" },
                  { value: stats.inProgress, label: "In Progress", gradient: "from-orange-500 to-amber-500", bg: "from-orange-50 to-amber-50" },
                  { value: stats.totalHours, label: "Hours Learned", gradient: "from-purple-500 to-violet-500", bg: "from-purple-50 to-violet-50" },
                  { value: stats.certificates, label: "Certificates", gradient: "from-yellow-500 to-orange-500", bg: "from-yellow-50 to-orange-50" },
                  { value: stats.currentStreak, label: "Day Streak", gradient: "from-red-500 to-pink-500", bg: "from-red-50 to-pink-50" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <Card className={`p-6 text-center bg-gradient-to-br ${stat.bg} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform`}>
                      <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Continue Learning with Modern Cards */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  Continue Learning
                </motion.h2>
                <Button 
                  variant="outline" 
                  className="hover:bg-violet-50 hover:border-violet-300 transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard/courses'}
                >
                  View All →
                </Button>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse h-96" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredCourses.map((course: Course, idx: number) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.6 }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform border-0 rounded-3xl">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          <img 
                            src={getImageUrl(course, idx)} 
                            alt={course.title} 
                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&q=80`;
                            }}
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className="bg-white/90 text-gray-800 rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                              {course.category}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4 z-20">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                              {[70, 40, 90][idx] || 0}% Complete
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-violet-600 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-4 flex items-center">
                            by {course.instructor}
                          </p>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-500">Progress</span>
                              <span className="text-sm font-bold text-gray-700">{[70, 40, 90][idx] || 0}%</span>
                            </div>
                            <Progress 
                              value={[70, 40, 90][idx] || 0} 
                              className="h-3 rounded-full bg-gray-100"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 flex items-center">
                              {course.duration_hours}h total
                            </span>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                              Continue →
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Featured Courses Marketplace */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  Featured Courses
                </motion.h2>
                <Button 
                  variant="outline" 
                  className="hover:bg-violet-50 hover:border-violet-300 transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard/browse'}
                >
                  Browse All →
                </Button>
              </div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse h-80" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recentCourses.map((course: Course, idx: number) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                          <img 
                            src={getImageUrl(course, idx)} 
                            alt={course.title} 
                            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const fallbackImages = [
                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&q=80',
                                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&q=80',
                                'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&q=80',
                                'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop&q=80'
                              ];
                              e.currentTarget.src = fallbackImages[idx % fallbackImages.length];
                            }}
                          />
                          <div className="absolute top-3 left-3 z-20">
                            <Badge className="bg-white/90 text-gray-800 rounded-full px-2 py-1 text-xs font-bold shadow-md">
                              {course.category}
                            </Badge>
                          </div>
                          {course.is_featured && (
                            <div className="absolute top-3 right-3 z-20">
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow-md">
                                Featured
                              </Badge>
                            </div>
                          )}
                          {course.is_trending && (
                            <div className="absolute top-3 right-3 z-20">
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow-md">
                                Trending
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-violet-600 transition-colors duration-300 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            {course.instructor}
                          </p>
                          <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              {course.level}
                            </span>
                            <span className="flex items-center">
                              {course.duration_hours}h
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-xl text-violet-600">
                              ${course.price}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full text-xs px-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Learning Path Recommendations */}
            <section>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Recommended Learning Paths
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Web Development",
                    subtitle: "Full-Stack Journey",
                    icon: <Code className="h-8 w-8" />,
                    gradient: "from-blue-500 to-indigo-600",
                    bgGradient: "from-blue-50 to-indigo-100",
                    description: "Master HTML, CSS, JavaScript, React, and Node.js in a structured learning path.",
                    courses: 6,
                    hours: 45,
                    color: "blue"
                  },
                  {
                    title: "UI/UX Design",
                    subtitle: "Design Mastery",
                    icon: <Palette className="h-8 w-8" />,
                    gradient: "from-purple-500 to-pink-600",
                    bgGradient: "from-purple-50 to-pink-100",
                    description: "Learn design principles, user research, prototyping, and modern design tools.",
                    courses: 4,
                    hours: 32,
                    color: "purple"
                  },
                  {
                    title: "Digital Marketing",
                    subtitle: "Growth Strategy",
                    icon: <TrendingUp className="h-8 w-8" />,
                    gradient: "from-green-500 to-emerald-600",
                    bgGradient: "from-green-50 to-emerald-100",
                    description: "Master SEO, social media marketing, content strategy, and analytics.",
                    courses: 5,
                    hours: 38,
                    color: "green"
                  }
                ].map((path, idx) => (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className={`p-8 bg-gradient-to-br ${path.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden relative`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className={`p-4 bg-gradient-to-r ${path.gradient} rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4`}>
                            {path.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-2xl text-gray-800">{path.title}</h3>
                            <p className={`text-sm font-medium ${path.color === 'blue' ? 'text-blue-600' : path.color === 'purple' ? 'text-purple-600' : 'text-green-600'}`}>
                              {path.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">{path.description}</p>
                        
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex gap-4">
                            <div className="text-center">
                              <div className="font-bold text-lg text-gray-800">{path.courses}</div>
                              <div className="text-xs text-gray-600">Courses</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg text-gray-800">{path.hours}h</div>
                              <div className="text-xs text-gray-600">Duration</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className={`bg-gradient-to-r ${path.gradient} hover:shadow-lg rounded-full px-6 text-white border-0 transition-all duration-300 transform group-hover:scale-105`}
                          >
                            Start Path →
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Enhanced Quick Actions */}
            <section>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Quick Actions
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Browse Courses",
                    description: "Discover new courses",
                    icon: <Search className="h-8 w-8" />,
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient: "from-blue-50 to-cyan-50",
                    action: () => window.location.href = '/dashboard/browse'
                  },
                  {
                    title: "Certificates",
                    description: "View achievements",
                    icon: <Award className="h-8 w-8" />,
                    gradient: "from-green-500 to-emerald-500",
                    bgGradient: "from-green-50 to-emerald-50",
                    action: () => window.location.href = '/dashboard/certificates'
                  },
                  {
                    title: "Community",
                    description: "Connect with learners",
                    icon: <Users className="h-8 w-8" />,
                    gradient: "from-purple-500 to-violet-500",
                    bgGradient: "from-purple-50 to-violet-50",
                    action: () => window.location.href = '/dashboard/community'
                  },
                  {
                    title: "Resources",
                    description: "Learning materials",
                    icon: <BookOpen className="h-8 w-8" />,
                    gradient: "from-orange-500 to-red-500",
                    bgGradient: "from-orange-50 to-red-50",
                    action: () => window.location.href = '/dashboard/resources'
                  }
                ].map((action, idx) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group"
                  >
                    <Card 
                      className={`p-6 bg-gradient-to-br ${action.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden relative`}
                      onClick={action.action}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full blur-xl -translate-y-10 translate-x-10"></div>
                      
                      <div className="relative z-10 text-center">
                        <div className={`p-4 bg-gradient-to-r ${action.gradient} rounded-2xl text-white shadow-lg mx-auto mb-4 w-fit group-hover:shadow-xl transition-all duration-300`}>
                          {action.icon}
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {action.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Floating Quick Enroll Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-110 px-8 py-4"
                onClick={() => window.location.href = '/dashboard/browse'}
              >
                <Search className="h-5 w-5 mr-2" />
                Explore Courses
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
