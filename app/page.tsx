import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedCoursesSection } from "@/components/featured-courses-section"
import { PricingSection } from "@/components/pricing-section"
import { ValuePropositionSection } from "@/components/value-proposition-section"
import { SuccessStoriesSection } from "@/components/success-stories-section"
import { FreeResourcesSection } from "@/components/free-resources-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedCoursesSection />
        <PricingSection />

  {/* Instructors and About sections removed as requested */}
        <ValuePropositionSection />
        <SuccessStoriesSection />
        <FreeResourcesSection />
      </main>
      <Footer />
    </div>
  )
}
