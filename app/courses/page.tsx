import { Header } from "@/components/header"
import { BrowseCoursesPage } from "@/components/browse-courses-page"
import { Footer } from "@/components/footer"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BrowseCoursesPage />
      <Footer />
    </div>
  )
}