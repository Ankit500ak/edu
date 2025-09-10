"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Crown, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from '@/contexts/auth-context'

const pricingPlans = [
  {
    name: "Basic",
    price: "₹999",
    originalPrice: "₹2,999",
    period: "/month",
    description: "Perfect for beginners starting their learning journey",
    icon: Star,
    popular: false,
    features: [
      "Access to 50+ courses",
      "Basic project templates",
      "Community forum access",
      "Mobile app access",
      "Basic certificates",
      "Email support",
    ],
    buttonText: "Start Basic Plan",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "₹1,999",
    originalPrice: "₹5,999",
    period: "/month",
    description: "Most popular choice for serious learners",
    icon: Crown,
    popular: true,
    features: [
      "Access to 500+ courses",
      "Advanced project templates",
      "1-on-1 mentorship sessions",
      "Priority community support",
      "Industry-recognized certificates",
      "Career guidance & placement support",
      "Offline video downloads",
      "Live coding sessions",
    ],
    buttonText: "Start Pro Plan",
    buttonVariant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    originalPrice: "₹12,999",
    period: "/month",
    description: "Complete solution for teams and organizations",
    icon: Zap,
    popular: false,
    features: [
      "Unlimited course access",
      "Custom learning paths",
      "Dedicated account manager",
      "Team analytics & reporting",
      "Custom certificates with branding",
      "Priority phone & chat support",
      "API access for integrations",
      "Bulk user management",
      "Advanced progress tracking",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
]

export function PricingSection() {
  const router = useRouter()
  const { isLoggedIn, showAuthModal } = useAuth()

  const handleEnrollClick = (planName: string) => {
    if (planName === "Enterprise") {
      // For enterprise plan, always show contact sales
      return
    }
    
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      showAuthModal('signup')
    }
  }
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Learning{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Flexible pricing plans designed to fit your learning goals and budget. Start free, upgrade anytime.
          </p>

          {/* Money Back Guarantee */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Check className="h-4 w-4" />
            30-day money-back guarantee
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{plan.description}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <div className="text-left">
                        <div className="text-gray-500 text-sm line-through">{plan.originalPrice}</div>
                        <div className="text-gray-600 text-sm">{plan.period}</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    onClick={() => handleEnrollClick(plan.name)}
                    className={`w-full py-3 text-lg font-medium ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-600">
            Need a custom plan for your organization?
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Contact our sales team
            </a>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
