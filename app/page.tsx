import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCoursesSection } from "@/components/featured-courses-section"
import { PricingSection } from "@/components/pricing-section"
import { SuccessStoriesSection } from "@/components/success-stories-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedCoursesSection />
      <PricingSection />
      <SuccessStoriesSection />
      <Footer />
    </div>
  )
}
