import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Award, Briefcase, Clock } from "lucide-react"

const valuePoints = [
  {
    icon: Rocket,
    title: "Hands-on Projects",
    description: "Build real-world projects that showcase your skills to potential employers and clients.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Industry-Recognized Certification",
    description: "Earn certificates that are valued by top companies and boost your professional credibility.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Career Assistance",
    description: "Get personalized career guidance, resume reviews, and job placement support.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Learn at your own pace with unlimited access to course materials and future updates.",
    gradient: "from-orange-500 to-red-500",
  },
]

export function ValuePropositionSection() {
  return (
  <section className="py-10 bg-gradient-to-br from-yellow-50 via-blue-50 to-pink-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
            Why Choose SkillSphere?
          </h2>
          <p className="text-lg md:text-xl text-blue-700 font-semibold max-w-2xl mx-auto animate-fade-in">
            We're committed to providing the best learning experience with features designed for your success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card
                key={index}
                className="group transition-all duration-300 hover:-translate-y-2 border-0 bg-white rounded-2xl text-center shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-yellow-100 hover:to-pink-100"
                style={{ boxShadow: '0 4px 24px #e0e7ff55', background: '#fff' }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 h-full" style={{ background: 'inherit', borderRadius: '1.5rem' }}>
                  <div
                    className={`w-14 h-14 mb-4 bg-gradient-to-br ${point.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-4 border-white animate-bounce-slow`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-700 mb-2 animate-fade-in-up">{point.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed min-h-[36px] animate-fade-in-up delay-100">{point.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {/* Animations (add to your global CSS if not present) */}
        {/*
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-up { animation: fadeInUp 1s ease; }
        .animate-bounce-slow { animation: bounce 2.5s infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        */}
      </div>
    </section>
  )
}
