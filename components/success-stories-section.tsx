"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "/professional-woman-headshot.png",
    review:
      "SkillSphere transformed my career completely! The AI course helped me land a machine learning engineer role at Google. The hands-on projects were exactly what I needed.",
    outcome: "Placed at Google",
    rating: 5,
    course: "AI & Machine Learning Bootcamp",
    company: "Google",
  },
  {
    id: 2,
    name: "Michael Chen",
    photo: "/professional-man-headshot.png",
    review:
      "The web development course was incredibly comprehensive. I went from zero coding experience to building full-stack applications. Now I work as a senior developer at Amazon.",
    outcome: "Placed at Amazon",
    rating: 5,
    course: "Full-Stack Web Development",
    company: "Amazon",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    photo: "/professional-headshot.png",
    review:
      "The data science program exceeded my expectations. The instructors were world-class, and the career support helped me transition into a data scientist role at Microsoft.",
    outcome: "Placed at Microsoft",
    rating: 5,
    course: "Data Science Masterclass",
    company: "Microsoft",
  },
]

const companyLogos = [
  { name: "Google", logo: "/google-logo.png" },
  { name: "Amazon", logo: "/amazon-logo.png" },
  { name: "Microsoft", logo: "/microsoft-logo.png" },
  { name: "Meta", logo: "/meta-logo-abstract.png" },
  { name: "Apple", logo: "/apple-logo.png" },
  { name: "Netflix", logo: "/netflix-inspired-logo.png" },
]

export function SuccessStoriesSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transforming Careers{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who have advanced their careers with SkillSphere.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <Card className="border-gray-200 shadow-xl bg-white">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        testimonials[currentTestimonial].photo ||
                        "/placeholder.svg?height=64&width=64&query=professional+headshot"
                      }
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-blue-600 font-medium">{testimonials[currentTestimonial].outcome}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed italic">
                  "{testimonials[currentTestimonial].review}"
                </blockquote>

                <p className="text-gray-500">
                  <span className="font-medium">Course:</span> {testimonials[currentTestimonial].course}
                </p>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-gray-600 mb-8 text-lg font-medium">Our graduates work at top companies worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companyLogos.map((company, index) => (
              <img
                key={index}
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
