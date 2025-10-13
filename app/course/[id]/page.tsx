"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft,
  ExternalLink,
  BookOpen,
  User,
  Tag,
  Award
} from "lucide-react"
import Link from "next/link"
import { Course, getCourses } from "@/lib/supabase"

export default function SimpleCourseDetailPage() {
  const params = useParams()
  const courseId = parseInt(params.id as string)
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCourseFromDatabase()
  }, [courseId])

  const loadCourseFromDatabase = async () => {
    try {
      const courses = await getCourses()
      const foundCourse = courses.find(c => c.id === courseId)
      setCourse(foundCourse || null)
    } catch (error) {
      console.error("Failed to load course:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Loading Course</h1>
            <p className="text-muted-foreground text-lg">
              Fetching course details...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">Course Not Found</h2>
              <p className="text-muted-foreground mb-4">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
              <Button asChild className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md">
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
        <Button variant="ghost" asChild className="mb-4 hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-muted/50">
          <Link href="/courses">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Course Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge 
                    variant={course.type === "FREE" ? "secondary" : "default"}
                    className={`${
                      course.type === "FREE" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {course.type}
                  </Badge>
                  {course.platform && (
                    <Badge variant="outline">{course.platform}</Badge>
                  )}
                  {course.skill_level && (
                    <Badge variant="outline">{course.skill_level}</Badge>
                  )}
                </div>
                <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-lg mb-4">
                  {course.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Course Image */}
              {course.image_url && (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden rounded-lg">
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              {/* Course Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Author</p>
                      <p className="font-medium">{course.provider}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{course.type} Course</p>
                    </div>
                  </div>
                  
                  {course.category && (
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{course.category}</p>
                      </div>
                    </div>
                  )}
                  
                  {course.subcategory && (
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Subcategory</p>
                        <p className="font-medium">{course.subcategory}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Start Learning Button */}
                <div className="pt-4">
                  {course.course_url ? (
                    <Button asChild size="lg" className="w-full hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg">
                      <a 
                        href={course.course_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Start Learning Now
                      </a>
                    </Button>
                  ) : (
                    <Button disabled size="lg" className="w-full">
                      Course URL Not Available
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        {(course.platform || course.skill_level || course.price_range) && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {course.platform && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Platform</p>
                    <p className="font-medium">{course.platform}</p>
                  </div>
                )}
                {course.skill_level && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Skill Level</p>
                    <p className="font-medium">{course.skill_level}</p>
                  </div>
                )}
                {course.price_range && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      {course.type === "FREE" ? "Price" : "Price Range"}
                    </p>
                    <p className="font-medium">
                      {course.type === "FREE" ? "Free" : course.price_range}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
