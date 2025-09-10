"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Brush,
  Camera,
  ChevronDown,
  Cloud,
  Code,
  Crown,
  Download,
  FileText,
  Grid,
  Heart,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  Lightbulb,
  Menu,
  MessageSquare,
  Palette,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Trash,
  TrendingUp,
  Users,
  Video,
  Wand2,
  Clock,
  Eye,
  Archive,
  ArrowUpDown,
  MoreHorizontal,
  Type,
  CuboidIcon,
  X,
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

// Sample data for apps
const apps = [
  {
    name: "PixelMaster",
    icon: <ImageIcon className="text-violet-500" />,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "VectorPro",
    icon: <Brush className="text-orange-500" />,
    description: "Professional vector graphics creation",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "VideoStudio",
    icon: <Video className="text-pink-500" />,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
    new: false,
    progress: 100,
  },
  {
    name: "MotionFX",
    icon: <Sparkles className="text-blue-500" />,
    description: "Stunning visual effects and animations",
    category: "Video",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "PageCraft",
    icon: <Layers className="text-red-500" />,
    description: "Professional page design and layout",
    category: "Creative",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "UXFlow",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    description: "Intuitive user experience design",
    category: "Design",
    recent: false,
    new: true,
    progress: 85,
  },
  {
    name: "PhotoLab",
    icon: <Camera className="text-teal-500" />,
    description: "Advanced photo editing and organization",
    category: "Photography",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "DocMaster",
    icon: <FileText className="text-red-600" />,
    description: "Document editing and management",
    category: "Document",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "WebCanvas",
    icon: <Code className="text-emerald-500" />,
    description: "Web design and development",
    category: "Web",
    recent: false,
    new: true,
    progress: 70,
  },
  {
    name: "3DStudio",
    icon: <CuboidIcon className="text-indigo-500" />,
    description: "3D modeling and rendering",
    category: "3D",
    recent: false,
    new: true,
    progress: 60,
  },
  {
    name: "FontForge",
    icon: <Type className="text-amber-500" />,
    description: "Typography and font creation",
    category: "Typography",
    recent: false,
    new: false,
    progress: 100,
  },
  {
    name: "ColorPalette",
    icon: <Palette className="text-purple-500" />,
    description: "Color scheme creation and management",
    category: "Design",
    recent: false,
    new: false,
    progress: 100,
  },
]

// Sample data for recent files
const recentFiles = [
  {
    name: "Brand Redesign.pxm",
    app: "PixelMaster",
    modified: "2 hours ago",
    icon: <ImageIcon className="text-violet-500" />,
    shared: true,
    size: "24.5 MB",
    collaborators: 3,
  },
  {
    name: "Company Logo.vec",
    app: "VectorPro",
    modified: "Yesterday",
    icon: <Brush className="text-orange-500" />,
    shared: true,
    size: "8.2 MB",
    collaborators: 2,
  },
  {
    name: "Product Launch Video.vid",
    app: "VideoStudio",
    modified: "3 days ago",
    icon: <Video className="text-pink-500" />,
    shared: false,
    size: "1.2 GB",
    collaborators: 0,
  },
  {
    name: "UI Animation.mfx",
    app: "MotionFX",
    modified: "Last week",
    icon: <Sparkles className="text-blue-500" />,
    shared: true,
    size: "345 MB",
    collaborators: 4,
  },
  {
    name: "Magazine Layout.pgc",
    app: "PageCraft",
    modified: "2 weeks ago",
    icon: <Layers className="text-red-500" />,
    shared: false,
    size: "42.8 MB",
    collaborators: 0,
  },
  {
    name: "Mobile App Design.uxf",
    app: "UXFlow",
    modified: "3 weeks ago",
    icon: <LayoutGrid className="text-fuchsia-500" />,
    shared: true,
    size: "18.3 MB",
    collaborators: 5,
  },
  {
    name: "Product Photography.phl",
    app: "PhotoLab",
    modified: "Last month",
    icon: <Camera className="text-teal-500" />,
    shared: false,
    size: "156 MB",
    collaborators: 0,
  },
]

// Sample data for projects
const projects = [
  {
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    dueDate: "June 15, 2025",
    members: 4,
    files: 23,
  },
  {
    name: "Mobile App Launch",
    description: "Design and assets for new mobile application",
    progress: 60,
    dueDate: "July 30, 2025",
    members: 6,
    files: 42,
  },
  {
    name: "Brand Identity",
    description: "New brand guidelines and assets",
    progress: 90,
    dueDate: "May 25, 2025",
    members: 3,
    files: 18,
  },
  {
    name: "Marketing Campaign",
    description: "Summer promotion materials",
    progress: 40,
    dueDate: "August 10, 2025",
    members: 5,
    files: 31,
  },
]

// Sample data for tutorials
const tutorials = [
  {
    title: "Mastering Digital Illustration",
    description: "Learn advanced techniques for creating stunning digital art",
    duration: "1h 45m",
    level: "Advanced",
    instructor: "Sarah Chen",
    category: "Illustration",
    views: "24K",
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Essential principles for creating intuitive user interfaces",
    duration: "2h 20m",
    level: "Intermediate",
    instructor: "Michael Rodriguez",
    category: "Design",
    views: "56K",
  },
  {
    title: "Video Editing Masterclass",
    description: "Professional techniques for cinematic video editing",
    duration: "3h 10m",
    level: "Advanced",
    instructor: "James Wilson",
    category: "Video",
    views: "32K",
  },
  {
    title: "Typography Essentials",
    description: "Create beautiful and effective typography for any project",
    duration: "1h 30m",
    level: "Beginner",
    instructor: "Emma Thompson",
    category: "Typography",
    views: "18K",
  },
  {
    title: "Color Theory for Designers",
    description: "Understanding color relationships and psychology",
    duration: "2h 05m",
    level: "Intermediate",
    instructor: "David Kim",
    category: "Design",
    views: "41K",
  },
]

// Sample data for community posts
const communityPosts = [
  {
    title: "Minimalist Logo Design",
    author: "Alex Morgan",
    likes: 342,
    comments: 28,
    image: "/placeholder.svg?height=300&width=400",
    time: "2 days ago",
  },
  {
    title: "3D Character Concept",
    author: "Priya Sharma",
    likes: 518,
    comments: 47,
    image: "/placeholder.svg?height=300&width=400",
    time: "1 week ago",
  },
  {
    title: "UI Dashboard Redesign",
    author: "Thomas Wright",
    likes: 276,
    comments: 32,
    image: "/placeholder.svg?height=300&width=400",
    time: "3 days ago",
  },
  {
    title: "Product Photography Setup",
    author: "Olivia Chen",
    likes: 189,
    comments: 15,
    image: "/placeholder.svg?height=300&width=400",
    time: "5 days ago",
  },
]

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
// Example course data for dashboard sections
const popularCourses = [
  {
    title: "Modern Web Design",
    category: "Design",
    instructor: "Sarah Chen",
    rating: 4.8,
    students: 1200,
    price: "$49",
    image: "/courses/web-design.jpg",
  },
  {
    title: "Advanced Illustration",
    category: "Illustration",
    instructor: "Michael Rodriguez",
    rating: 4.7,
    students: 950,
    price: "$39",
    image: "/courses/illustration.jpg",
  },
  {
    title: "UI/UX Mastery",
    category: "Design",
    instructor: "Emma Thompson",
    rating: 4.9,
    students: 2100,
    price: "$59",
    image: "/courses/uiux.jpg",
  },
  {
    title: "Typography Essentials",
    category: "Typography",
    instructor: "David Kim",
    rating: 4.6,
    students: 800,
    price: "$29",
    image: "/courses/typography.jpg",
  },
];

const trendingCourses = [
  {
    title: "Video Editing Masterclass",
    category: "Video",
    instructor: "James Wilson",
    rating: 4.9,
    students: 1800,
    price: "$69",
    image: "/courses/video-editing.jpg",
  },
  {
    title: "Color Theory for Designers",
    category: "Design",
    instructor: "David Kim",
    rating: 4.8,
    students: 1400,
    price: "$35",
    image: "/courses/color-theory.jpg",
  },
];

export function DesignaliCreative() {
  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const pathname = usePathname();

  // Simulate progress loading
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])

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
          // Show only shortened email: first 3 chars, ... and domain
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
          {/* Welcome Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white mb-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Welcome back!</h2>
                <p className="max-w-[600px] text-white/80">
                  Continue your learning journey or explore new courses to boost your skills.
                </p>
              </div>
            </motion.div>
          </section>
          {/* My Courses Progress */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">My Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {popularCourses.slice(0, 3).map((course, idx) => (
                <Card key={course.title} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img src={course.image || '/placeholder.svg?height=120&width=240'} alt={course.title} className="h-36 w-full object-cover bg-gray-100" />
                    <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-3 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/instructors/${course.instructor.replace(/\s+/g, '').toLowerCase()}.jpg`} alt={course.instructor} onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=40&width=40'; }} />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">★ {course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.students} students)</span>
                    </div>
                    <div className="mb-2">
                      <Progress value={[70, 40, 90][idx]} className="h-2 rounded-xl" />
                      <span className="text-xs text-muted-foreground">{[70, 40, 90][idx]}% completed</span>
                    </div>
                    <Button className="w-full rounded-xl mt-2">Continue</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          {/* Continue Learning Section */}
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trendingCourses.map((course, idx) => (
                <Card key={course.title} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img src={course.image || '/placeholder.svg?height=120&width=240'} alt={course.title} className="h-36 w-full object-cover bg-gray-100" />
                    <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-3 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/instructors/${course.instructor.replace(/\s+/g, '').toLowerCase()}.jpg`} alt={course.instructor} onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=40&width=40'; }} />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">★ {course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.students} students)</span>
                    </div>
                    <div className="mb-2">
                      <Progress value={[60, 30][idx]} className="h-2 rounded-xl" />
                      <span className="text-xs text-muted-foreground">{[60, 30][idx]}% completed</span>
                    </div>
                    <Button className="w-full rounded-xl mt-2" variant="secondary">Continue</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          {/* Achievements Section */}
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Achievements</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center bg-white rounded-2xl shadow p-4 w-48">
                <img src="/badges/certificate1.png" alt="Certificate" className="h-16 w-16 mb-2 bg-gray-100 rounded-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=64&width=64'; }} />
                <span className="font-semibold">Web Dev Certificate</span>
                <span className="text-xs text-muted-foreground">Completed: 2024-05-10</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-2xl shadow p-4 w-48">
                <img src="/badges/badge1.png" alt="Badge" className="h-16 w-16 mb-2 bg-gray-100 rounded-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=64&width=64'; }} />
                <span className="font-semibold">UI/UX Pro Badge</span>
                <span className="text-xs text-muted-foreground">Earned: 2024-06-01</span>
              </div>
            </div>
          </section>
          {/* Course Suggestions */}
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {popularCourses.slice(2, 4).map((course) => (
                <Card key={course.title} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img src={course.image || '/placeholder.svg?height=120&width=240'} alt={course.title} className="h-36 w-full object-cover bg-gray-100" />
                    <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-3 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/instructors/${course.instructor.replace(/\s+/g, '').toLowerCase()}.jpg`} alt={course.instructor} onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=40&width=40'; }} />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500">★ {course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.students} students)</span>
                    </div>
                    <div className="mt-2 font-bold text-primary">{course.price}</div>
                    <Button className="w-full rounded-xl mt-2" variant="outline">View Course</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}


export default function MyCoursesDashboard() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"ongoing" | "completed" | "all">("ongoing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(5);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Fetch user profile (copy from DesignaliCreative)
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
          // Show only shortened email: first 3 chars, ... and domain
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

  // Example course data with status
  const myCourses = [
    {
      title: "Modern Web Design",
      category: "Design",
      instructor: "Sarah Chen",
      rating: 4.8,
      students: 1200,
      price: "$49",
      image: "/courses/web-design.jpg",
      progress: 70,
      status: "ongoing",
    },
    {
      title: "Advanced Illustration",
      category: "Illustration",
      instructor: "Michael Rodriguez",
      rating: 4.7,
      students: 950,
      price: "$39",
      image: "/courses/illustration.jpg",
      progress: 100,
      status: "completed",
    },
    {
      title: "UI/UX Mastery",
      category: "Design",
      instructor: "Emma Thompson",
      rating: 4.9,
      students: 2100,
      price: "$59",
      image: "/courses/uiux.jpg",
      progress: 40,
      status: "ongoing",
    },
    {
      title: "Typography Essentials",
      category: "Typography",
      instructor: "David Kim",
      rating: 4.6,
      students: 800,
      price: "$29",
      image: "/courses/typography.jpg",
      progress: 100,
      status: "completed",
    },
  ];

  const filteredCourses = myCourses.filter(
    (c) => (tab === "all" || c.status === tab) && c.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sidebar items
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
      {/* Sidebar and header (copied from creative.tsx) */}
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
          {/* My Courses Dashboard Content */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">My Courses</h1>
                <div className="text-muted-foreground text-sm">
                  {myCourses.length} courses • {myCourses.filter(c => c.status === "ongoing").length} ongoing • {myCourses.filter(c => c.status === "completed").length} completed
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-64 rounded-xl"
                />
                <Button variant={tab === "ongoing" ? "default" : "outline"} onClick={() => setTab("ongoing")}>Ongoing</Button>
                <Button variant={tab === "completed" ? "default" : "outline"} onClick={() => setTab("completed")}>Completed</Button>
                <Button variant={tab === "all" ? "default" : "outline"} onClick={() => setTab("all")}>All</Button>
              </div>
            </div>
            {filteredCourses.length === 0 ? (
              <div className="text-center text-muted-foreground py-16 text-lg">No courses found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.title} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-muted">
                    <div className="relative">
                      <img src={course.image} alt={course.title} className="h-36 w-full object-cover bg-gray-100" />
                      <Badge className="absolute top-3 left-3 bg-white/80 text-primary rounded-xl px-3 py-1 text-xs font-semibold shadow">{course.category}</Badge>
                      {course.status === "completed" && (
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white rounded-xl px-3 py-1 text-xs font-semibold shadow">Completed</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/instructors/${course.instructor.replace(/\s+/g, '').toLowerCase()}.jpg`} alt={course.instructor} onError={(e) => { e.currentTarget.src = '/placeholder.svg?height=40&width=40'; }} />
                          <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
                          <p className="text-xs text-muted-foreground">by {course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">★ {course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.students} students)</span>
                      </div>
                      <div className="mb-2">
                        <Progress value={course.progress} className="h-2 rounded-xl" />
                        <span className="text-xs text-muted-foreground">{course.progress}% completed</span>
                      </div>
                      <Button className="w-full rounded-xl mt-2" variant={course.status === "completed" ? "outline" : "default"}>
                        {course.status === "completed" ? "View Certificate" : "Continue"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}