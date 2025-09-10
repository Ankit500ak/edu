import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Cloud, BarChart3, Code, Briefcase, ArrowRight } from "lucide-react"

const categories = [
	{
		icon: Brain,
		label: "Artificial Intelligence",
		description: "Machine Learning, Deep Learning, NLP",
		content: "Explore the future with AI. Learn to build intelligent systems, automate tasks, and solve complex problems using the latest advancements in artificial intelligence.",
		courses: "120+ courses",
		gradient: "from-purple-500 to-pink-500",
	},
	{
		icon: Cloud,
		label: "Cloud Computing",
		description: "AWS, Azure, Google Cloud Platform",
		content: "Master cloud platforms and services. Gain hands-on experience with AWS, Azure, and Google Cloud to deploy, manage, and scale applications globally.",
		courses: "85+ courses",
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		icon: BarChart3,
		label: "Data Science",
		description: "Analytics, Visualization, Statistics",
		content: "Unlock insights from data. Learn analytics, visualization, and statistics to make data-driven decisions and drive business growth.",
		courses: "95+ courses",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		icon: Code,
		label: "Web Development",
		description: "Frontend, Backend, Full-Stack",
		content: "Build modern web applications. From frontend to backend, become a full-stack developer with the latest frameworks and technologies.",
		courses: "150+ courses",
		gradient: "from-orange-500 to-red-500",
	},
	{
		icon: Briefcase,
		label: "Business Management",
		description: "Leadership, Strategy, Operations",
		content: "Lead and manage teams effectively. Develop skills in leadership, strategy, and operations to excel in the business world.",
		courses: "70+ courses",
		gradient: "from-indigo-500 to-purple-500",
	},
]

export function CategoriesSection() {
	return (
		<section id="categories" className="pt-20 pb-6 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					{/* Logo removed as requested */}
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Explore Our{" "}
						<span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
							Categories
						</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Discover courses across diverse fields and advance your career in the
						direction you choose.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
					{categories.map((category, index) => {
						const Icon = category.icon
						return (
							<Card
								key={index}
								className="group transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-white rounded-2xl p-0 shadow-md hover:shadow-lg"
								style={{
									boxShadow: "0 2px 12px #e0e7ff33",
									background: "#fff",
									minHeight: 0,
									height: "260px",
								}}
							>
								<CardContent
									className="flex flex-col items-center justify-center p-5 h-full"
									style={{
										background: "inherit",
										borderRadius: "1rem",
									}}
								>
									<div
										className={`w-10 h-10 mb-2 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow`}
									>
										<Icon className="h-4 w-4 text-white" />
									</div>
									<h3 className="text-sm font-bold text-blue-700 mb-1 text-center">
										{category.label}
									</h3>
									<p className="text-xs text-gray-700 text-center mb-1">
										{category.description}
									</p>
									<p className="text-xs text-gray-500 text-center mb-2 line-clamp-2">
										{category.content}
									</p>
									<span className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded-full mt-auto shadow">
										{category.courses}
									</span>
								</CardContent>
							</Card>
						)
					})}
				</div>

				<div className="text-center">
					<Button
						variant="outline"
						className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
					>
						View All Categories
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	)
}
