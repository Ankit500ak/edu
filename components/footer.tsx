import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const footerSections = {
  Explore: ["Courses", "Categories", "Blog", "Free Resources"],
  "About Us": ["Company", "Careers", "Partners", "Contact"],
  Support: ["FAQs", "Help Desk", "Policies", "Refunds"],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const paymentLogos = [
  "/visa-logo-generic.png",
  "/mastercard-logo.png",
  "/paypal-logo.png",
  "/american-express-logo.png",
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-sans">S</span>
              </div>
              <span className="text-2xl font-bold font-sans">SkillSphere</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering learners worldwide with expert-led courses, hands-on projects, and industry-recognized
              certifications.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4 font-sans">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

  {/* Bottom Section removed as requested */}
      </div>
    </footer>
  )
}
