"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, BookOpen } from "lucide-react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from '@/contexts/auth-context'

const courses = [
	{
		id: 1,
		title: "Complete AI & Machine Learning Bootcamp",
		description:
			"Master AI from basics to advanced with hands-on projects and real-world applications.",
		instructor: {
			name: "Dr. Sarah Chen",
			image: "/professional-woman-instructor.jpg",
		},
		thumbnail: "/ai-machine-learning-course.jpg",
		rating: 4.9,
		reviews: 12450,
		students: "25,847",
		duration: "42 hours",
		price: { current: 2999, original: 9999 },
		level: "Intermediate",
		gradient: "from-purple-500 to-pink-500",
		category: "Artificial Intelligence",
	},
	{
		id: 2,
		title: "Deep Learning with TensorFlow",
		description:
			"Build neural networks and deep learning models using TensorFlow and Keras.",
		instructor: {
			name: "Dr. Alex Kim",
			image: "/professional-instructor.png",
		},
		thumbnail: "/ai-machine-learning-course.jpg",
		rating: 4.8,
		reviews: 8340,
		students: "15,230",
		duration: "38 hours",
		price: { current: 3499, original: 12999 },
		level: "Advanced",
		gradient: "from-purple-600 to-indigo-600",
		category: "Artificial Intelligence",
	},
	{
		id: 3,
		title: "Full-Stack Web Development with React & Node.js",
		description:
			"Build modern web applications from frontend to backend with the latest technologies.",
		instructor: {
			name: "Mark Rodriguez",
			image: "/placeholder-c8t42.png",
		},
		thumbnail: "/web-development-coding.png",
		rating: 4.8,
		reviews: 8930,
		students: "18,392",
		duration: "38 hours",
		price: { current: 2499, original: 7999 },
		level: "Beginner",
		gradient: "from-blue-500 to-cyan-500",
		category: "Web Development",
	},
	{
		id: 4,
		title: "Modern JavaScript & ES6+",
		description:
			"Master modern JavaScript features and build dynamic web applications.",
		instructor: {
			name: "Lisa Chen",
			image: "/professional-woman-instructor.jpg",
		},
		thumbnail: "/web-development-coding.png",
		rating: 4.7,
		reviews: 7520,
		students: "22,840",
		duration: "28 hours",
		price: { current: 1999, original: 6999 },
		level: "Intermediate",
		gradient: "from-yellow-500 to-orange-500",
		category: "Web Development",
	},
	{
		id: 5,
		title: "Cloud Architecture with AWS",
		description: "Design and deploy scalable cloud solutions using Amazon Web Services.",
		instructor: {
			name: "James Wilson",
			image: "/professional-instructor.png",
		},
		thumbnail: "/cloud-computing-architecture.png",
		rating: 4.7,
		reviews: 6780,
		students: "12,456",
		duration: "35 hours",
		price: { current: 3499, original: 10999 },
		level: "Advanced",
		gradient: "from-orange-500 to-red-500",
		category: "Cloud Computing",
	},
	{
		id: 6,
		title: "Microsoft Azure Fundamentals",
		description: "Learn Azure cloud services and prepare for the AZ-900 certification.",
		instructor: {
			name: "Robert Taylor",
			image: "/professional-instructor.png",
		},
		thumbnail: "/cloud-computing-architecture.png",
		rating: 4.6,
		reviews: 5430,
		students: "9,870",
		duration: "25 hours",
		price: { current: 2299, original: 7499 },
		level: "Beginner",
		gradient: "from-blue-600 to-purple-600",
		category: "Cloud Computing",
	},
	{
		id: 7,
		title: "Data Science & Analytics Masterclass",
		description:
			"Learn data analysis, visualization, and machine learning with Python and R.",
		instructor: {
			name: "Dr. Emily Zhang",
			image: "/placeholder-7k78r.png",
		},
		thumbnail: "/placeholder-wcfmv.png",
		rating: 4.9,
		reviews: 15670,
		students: "31,205",
		duration: "45 hours",
		price: { current: 2799, original: 8999 },
		level: "Intermediate",
		gradient: "from-green-500 to-teal-500",
		category: "Data Science",
	},
	{
		id: 8,
		title: "Python for Data Analysis",
		description:
			"Master Python libraries like Pandas, NumPy, and Matplotlib for data analysis.",
		instructor: {
			name: "Michael Brown",
			image: "/professional-instructor.png",
		},
		thumbnail: "/placeholder-wcfmv.png",
		rating: 4.8,
		reviews: 11230,
		students: "26,450",
		duration: "32 hours",
		price: { current: 2199, original: 6999 },
		level: "Beginner",
		gradient: "from-emerald-500 to-blue-500",
		category: "Data Science",
	},
	{
		id: 9,
		title: "DevOps with Docker & Kubernetes",
		description:
			"Learn containerization and orchestration with Docker and Kubernetes.",
		instructor: {
			name: "David Miller",
			image: "/professional-instructor.png",
		},
		thumbnail: "/cloud-computing-architecture.png",
		rating: 4.7,
		reviews: 6890,
		students: "14,320",
		duration: "40 hours",
		price: { current: 3199, original: 9999 },
		level: "Intermediate",
		gradient: "from-indigo-500 to-purple-500",
		category: "DevOps",
	},
	{
		id: 10,
		title: "CI/CD Pipeline Mastery",
		description:
			"Build automated deployment pipelines with Jenkins, GitLab CI, and GitHub Actions.",
		instructor: {
			name: "Anna Johnson",
			image: "/professional-woman-instructor.jpg",
		},
		thumbnail: "/cloud-computing-architecture.png",
		rating: 4.6,
		reviews: 4560,
		students: "8,920",
		duration: "30 hours",
		price: { current: 2699, original: 8499 },
		level: "Advanced",
		gradient: "from-pink-500 to-rose-500",
		category: "DevOps",
	},
	{
		id: 11,
		title: "Ethical Hacking & Penetration Testing",
		description:
			"Learn cybersecurity fundamentals and ethical hacking techniques.",
		instructor: {
			name: "Kevin White",
			image: "/professional-instructor.png",
		},
		thumbnail: "/ai-machine-learning-course.jpg",
		rating: 4.8,
		reviews: 9340,
		students: "19,670",
		duration: "48 hours",
		price: { current: 3799, original: 12999 },
		level: "Intermediate",
		gradient: "from-red-500 to-pink-500",
		category: "Cyber Security",
	},
	{
		id: 12,
		title: "Network Security Fundamentals",
		description:
			"Understand network protocols, firewalls, and security best practices.",
		instructor: {
			name: "Sophie Davis",
			image: "/professional-woman-instructor.jpg",
		},
		thumbnail: "/ai-machine-learning-course.jpg",
		rating: 4.7,
		reviews: 7120,
		students: "15,430",
		duration: "35 hours",
		price: { current: 2999, original: 9499 },
		level: "Beginner",
		gradient: "from-gray-600 to-gray-800",
		category: "Cyber Security",
	},
]

export function FeaturedCoursesSection() {
	const [activeCategory, setActiveCategory] = useState("All")
	const carouselRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const { isLoggedIn, showAuthModal } = useAuth()

	const handleEnrollClick = () => {
		if (isLoggedIn) {
			router.push('/dashboard')
		} else {
			showAuthModal('signup')
		}
	}

	// Filter courses based on active category
	const filteredCourses = activeCategory === "All" 
		? courses 
		: courses.filter(course => course.category === activeCategory)

	// Categories with course counts
	const categories = [
		{ name: "All", count: courses.length },
		{ name: "Artificial Intelligence", count: courses.filter(c => c.category === "Artificial Intelligence").length },
		{ name: "Web Development", count: courses.filter(c => c.category === "Web Development").length },
		{ name: "Cloud Computing", count: courses.filter(c => c.category === "Cloud Computing").length },
		{ name: "Data Science", count: courses.filter(c => c.category === "Data Science").length },
		{ name: "DevOps", count: courses.filter(c => c.category === "DevOps").length },
		{ name: "Cyber Security", count: courses.filter(c => c.category === "Cyber Security").length },
	]

	return (
		<section id="courses" className="pt-10 pb-8 bg-gradient-to-br from-slate-50 to-blue-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10">
					<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
						<span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Trending Courses</span>
					</h2>
					<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
						Join thousands of learners in our most popular courses designed by industry experts
					</p>
					<div className="flex flex-wrap justify-center gap-2 mt-4">
						{categories.map((category) => (
							<button
								key={category.name}
								onClick={() => setActiveCategory(category.name)}
								className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 shadow border border-blue-100 hover:scale-105 ${
									category.name === activeCategory
										? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-300/30"
										: "bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
								}`}
							>
								<span className="relative z-10">
									{category.name}
									<span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
										category.name === activeCategory
											? "bg-white/20 text-white"
											: "bg-blue-100 text-blue-600"
									}`}>
										{category.count}
									</span>
								</span>
								{category.name === activeCategory && (
									<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-lg opacity-30 -z-10"></div>
								)}
							</button>
						))}
					</div>
				</div>

				<div className="relative flex justify-center">
					<div
						ref={carouselRef}
						className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
						style={{ WebkitOverflowScrolling: 'touch', maxWidth: '1040px', margin: '0 auto', alignItems: 'stretch' }}
					>
						{filteredCourses.map((course, idx) => (
							<Card
								key={course.id + '-' + idx}
								className="min-w-[340px] max-w-[340px] group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white rounded-3xl flex flex-col justify-between"
								style={{ flex: '0 0 340px', height: '500px', background: '#f8fafc', boxShadow: '8px 8px 24px #e3e6ee, -8px -8px 24px #ffffff' }}
							>
								{/* Banner with image and gradient overlay */}
								<div className="relative h-48 w-full rounded-t-3xl overflow-hidden flex items-end justify-start">
									<img
										src={course.thumbnail}
										alt={course.title}
										className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105 group-hover:scale-110 transition-transform duration-300"
									/>
									<div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-80 z-10`} />
									<div className="relative z-20 flex flex-col p-4 w-full">
										<div className="flex items-center justify-between mb-2">
											<Badge className="bg-white/30 text-white border-0 backdrop-blur-sm font-semibold tracking-wide px-3 py-1 text-xs shadow">
												{course.level}
											</Badge>
											<div className="bg-white/30 backdrop-blur-sm rounded-full p-2 shadow">
												<BookOpen className="h-5 w-5 text-white" />
											</div>
										</div>
										<h3 className="text-lg font-bold leading-tight line-clamp-2 drop-shadow-lg text-white">
											{course.title}
										</h3>
									</div>
								</div>
								<CardContent className="flex flex-col justify-between flex-1 p-6">
									<div className="space-y-2">
										<div className="flex items-center gap-1 mb-1">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											))}
											<span className="text-sm font-medium text-gray-900 ml-1">{course.rating}</span>
											<span className="text-sm text-gray-500">({course.reviews.toLocaleString()})</span>
										</div>
										<div className="flex items-center gap-4 text-sm text-gray-600">
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4" />
												<span>{course.students}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												<span>{course.duration}</span>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between mt-5">
										<div className="flex items-center gap-2">
											<span className="text-2xl font-bold text-gray-900">₹{course.price.current.toLocaleString()}</span>
											<span className="text-lg text-gray-500 line-through">
												₹{course.price.original.toLocaleString()}
											</span>
										</div>
										<div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
											{Math.round((1 - course.price.current / course.price.original) * 100)}% OFF
										</div>
									</div>
									<Button 
										onClick={handleEnrollClick}
										className="w-full shadow-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-2 mt-5 rounded-xl"
									>
										Enroll Now
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<div className="text-center mt-8">
					<Button
						size="lg"
						variant="outline"
						className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent font-semibold rounded-xl"
					>
						Browse All Courses
					</Button>
					<p className="text-sm text-gray-600 mt-2">Explore our wide range of courses</p>
				</div>
			</div>
		</section>
	)
}
