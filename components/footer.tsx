"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="SkillSphere Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SkillSphere
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering learners worldwide with expert-led courses and cutting-edge skills. 
              Transform your career and unlock your potential with our comprehensive learning platform.
            </p>
            
            {/* Enhanced Social Media Cards */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group border-gray-600 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 p-2 rounded-xl"
                >
                  <Facebook className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 p-2 rounded-xl"
                >
                  <Twitter className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group border-gray-600 hover:border-pink-400 hover:bg-pink-400/10 transition-all duration-300 p-2 rounded-xl"
                >
                  <Instagram className="h-4 w-4 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 p-2 rounded-xl"
                >
                  <Linkedin className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group border-gray-600 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-xl"
                >
                  <Youtube className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links & Popular Categories - Mobile Column Layout */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-2">
            
            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">All Courses</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Categories</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Instructors</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Pricing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Success Stories</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Help Center</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Popular Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Web Development</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Data Science</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Mobile Development</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Cloud Computing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Artificial Intelligence</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Cybersecurity</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Digital Marketing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">UI/UX Design</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for the latest courses, tips, and learning resources.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>support@skillsphere.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 SkillSphere. All rights reserved. Empowering learners worldwide.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-cyan-900/10 to-transparent rounded-full pointer-events-none"></div>
    </footer>
  )
}
