import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Video, FileText, Map, Mail } from "lucide-react"

const resources = [
  {
    icon: Video,
    title: "Webinars",
    description: "Join live sessions with industry experts and get your questions answered.",
    count: "50+ sessions",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Blogs",
    description: "Read in-depth articles on the latest trends and technologies.",
    count: "200+ articles",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Career Guides",
    description: "Download comprehensive guides to advance your career.",
    count: "25+ guides",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Map,
    title: "Roadmaps",
    description: "Follow structured learning paths for different career tracks.",
    count: "15+ roadmaps",
    gradient: "from-purple-500 to-indigo-500",
  },
]

export function FreeResourcesSection() {
  return null;
}

