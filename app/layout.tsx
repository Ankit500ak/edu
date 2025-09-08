import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair-display",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "SkillSphere - Learn Skills That Build Your Future",
  description: "Expert-led courses with real-world projects & certifications. Transform your career with SkillSphere.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${playfairDisplay.variable} ${sourceSans.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
