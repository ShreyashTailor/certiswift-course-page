"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Award, 
  ChevronLeft,
  Play,
  Heart,
  HeartHandshake
} from "lucide-react"
import Link from "next/link"
import { Course, toggleFavorite, getUserFavorites } from "@/lib/supabase"
import CourseRatingComponent from "@/components/course-rating"
import CourseProgressTracker from "@/components/course-progress-tracker"
import { toast } from "sonner"

// Sample course data - in a real app, this would come from your database
const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Advanced React Development",
    description: "Master React with hooks, context, and advanced patterns. Build scalable applications with modern React features.",
    provider: "Tech Academy",
    instructor: "Sarah Johnson",
    price: 99.99,
    type: 'PAID',
    rating: 4.8,
    difficulty: "Advanced",
    duration: "12 hours",
    category: "Frontend Development",
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: 2,
    title: "Node.js & Express Masterclass",
    description: "Complete backend development course covering Node.js, Express, databases, and RESTful APIs.",
    provider: "Dev Institute",
    instructor: "Mike Chen",
    price: 89.99,
    type: 'PAID',
    rating: 4.7,
    difficulty: "Intermediate",
    duration: "15 hours",
    category: "Backend Development",
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis, visualization, and machine learning basics.",
    provider: "Data Science Hub",
    instructor: "Dr. Emily Rodriguez",
    price: 79.99,
    type: 'PAID',
    rating: 4.9,
    difficulty: "Beginner",
    duration: "20 hours",
    category: "Data Science",
    created_at: "2024-01-05T00:00:00Z"
  }
]

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = parseInt(params.id as string)
  const [course, setCourse] = useState<Course | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Find the course by ID
    const foundCourse = sampleCourses.find(c => c.id === courseId)
    setCourse(foundCourse || null)
    
    // Get saved user name and check favorites
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserName(savedUserName)
      checkFavoriteStatus(savedUserName)
    }
  }, [courseId])

  const checkFavoriteStatus = async (user: string) => {
    try {
      const favorites = await getUserFavorites(user)
      setIsFavorite(favorites.includes(courseId))
    } catch (error) {
      console.error('Failed to check favorite status:', error)
    }
  }

  const handleToggleFavorite = async () => {
    if (!userName) {
      toast.error("Please start tracking progress first to add favorites")
      return
    }

    try {
      const success = await toggleFavorite(userName, courseId)
      if (success) {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites! ❤️")
      } else {
        toast.error("Failed to update favorites")
      }
    } catch (error) {
      toast.error("Failed to update favorites")
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'frontend development': return 'bg-blue-100 text-blue-800'
      case 'backend development': return 'bg-purple-100 text-purple-800'
      case 'data science': return 'bg-orange-100 text-orange-800'
      case 'mobile development': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">Course Not Found</h2>
              <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist.</p>
              <Button asChild>
                <Link href="/courses">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/courses">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Course Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getDifficultyColor(course.difficulty || '')}>
                      {course.difficulty}
                    </Badge>
                    <Badge className={getCategoryColor(course.category || '')}>
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {course.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={isFavorite ? "text-red-500 border-red-200" : ""}
                >
                  {isFavorite ? <HeartHandshake className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>Certificate</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  ${course.price?.toFixed(2)}
                </div>
                <div className="space-x-2">
                  <Button>
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Content/Curriculum */}
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                What you'll learn in this comprehensive course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Module 1: Introduction & Setup</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Get started with the fundamentals and set up your development environment
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>• 5 lessons</span>
                    <span>• 45 minutes</span>
                    <span>• Beginner level</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Module 2: Core Concepts</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Dive deep into the core concepts and best practices
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>• 8 lessons</span>
                    <span>• 2 hours</span>
                    <span>• Intermediate level</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Module 3: Advanced Techniques</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Master advanced techniques and real-world applications
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>• 12 lessons</span>
                    <span>• 3.5 hours</span>
                    <span>• Advanced level</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Reviews */}
          <CourseRatingComponent courseId={course.id!} courseName={course.title} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Tracker */}
          <CourseProgressTracker 
            courseId={course.id!} 
            courseName={course.title}
            totalModules={25}
          />

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Skill Level</span>
                <span className="font-medium">{course.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Certificate</span>
                <span className="font-medium">Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lifetime Access</span>
                <span className="font-medium">Yes</span>
              </div>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{course.instructor}</h4>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Experienced instructor with 10+ years in the industry. 
                Passionate about teaching and helping students succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
