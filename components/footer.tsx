"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo & Socials */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="SkillSphere Logo"
                className="w-32 h-10 rounded-lg object-cover"
              />
            </div>
            <div className="text-gray-300 text-sm max-w-xs">
              Empowering learners worldwide with expert-led courses and cutting-edge skills.
            </div>
            <div className="italic text-gray-400 text-xs mt-1 mb-2">
              "Learning never exhausts the mind." – Leonardo da Vinci
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="group border-gray-600 hover:border-pink-400 hover:bg-pink-400/10 p-1 rounded-lg h-8 w-8"
              >
                <Instagram className="h-5 w-5 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="group border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 p-1 rounded-lg h-8 w-8"
              >
                <Linkedin className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </div>
          </div>

          {/* Quick Links & Categories */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="text-lg font-bold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    All Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Popular Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Mobile Development
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Cloud Computing
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 h-9"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-9 px-3">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-1">Contact Us</h4>
              <div className="flex flex-col gap-1 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 9999644807</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>C84 sector 2, noida,India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-gray-400 text-xs">
              © 2024 SkillSphere. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-l from-cyan-900/10 to-transparent rounded-full pointer-events-none"></div>
    </footer>
  )
}
