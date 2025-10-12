"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Search, Settings, Plus } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import AdminSection from "@/components/admin-section"
import { getCourses, Course } from "@/lib/supabase"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "FREE" | "PAID">("all")
  const [showAdmin, setShowAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Load courses from database on component mount
  useEffect(() => {
    loadCoursesFromDatabase()
  }, [])

  const loadCoursesFromDatabase = async () => {
    // Simulate loading with progress
    const loadingTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(loadingTimer)
          return 90
        }
        return prev + 30
      })
    }, 200)

    try {
      const dbCourses = await getCourses()
      setCourses(dbCourses)
      setFilteredCourses(dbCourses)
      setLoadingProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    } catch (error) {
      console.error("Failed to load courses:", error)
      toast.error("Failed to load courses from database")
      setLoadingProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    } finally {
      clearInterval(loadingTimer)
    }
  }

  // Filter courses based on search term and type
  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(course => course.type === typeFilter)
    }

    setFilteredCourses(filtered)
  }, [courses, searchTerm, typeFilter])

  const handleCoursesUpdate = (updatedCourses: Course[]) => {
    setCourses(updatedCourses)
    // Refresh from database instead of localStorage
    loadCoursesFromDatabase()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Loading Courses</h1>
            <p className="text-muted-foreground text-lg">
              Fetching the latest courses from our database...
            </p>
          </div>
          
          <div className="space-y-4">
            <Progress value={loadingProgress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-muted-foreground">
              {loadingProgress}% complete
            </p>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Available Courses
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover and learn from our curated collection of courses from top companies and institutions.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses, companies, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={(value: "all" | "FREE" | "PAID") => setTypeFilter(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="FREE">Free Only</SelectItem>
            <SelectItem value="PAID">Paid Only</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={() => setShowAdmin(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCourses.length} of {courses.length} courses
          {searchTerm && ` for "${searchTerm}"`}
          {typeFilter !== "all" && ` · ${typeFilter} courses only`}
        </p>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground">
              {searchTerm || typeFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "No courses are available yet. Contact admin to add some courses!"}
            </p>
            {(!searchTerm && typeFilter === "all") && (
              <Button 
                onClick={() => setShowAdmin(true)}
                className="mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Course
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl cursor-pointer">
                {/* Course Image */}
                {course.image_url && (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium ${
                      course.type === "FREE" 
                        ? "bg-green-100/90 text-green-800" 
                        : "bg-primary/90 text-primary-foreground"
                    }`}>
                      {course.type}
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors truncate">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {course.provider}
                    </CardDescription>
                  </div>
                  {!course.image_url && (
                    <Badge 
                      variant={course.type === "FREE" ? "secondary" : "default"}
                      className={`ml-2 flex-shrink-0 ${
                        course.type === "FREE" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {course.type}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                  asChild
                >
                  <a 
                    href={course.course_url || `#course-${course.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2"
                  >
                    <span>Start Learning</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Admin Section */}
      <AdminSection 
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        courses={courses}
        onCoursesUpdate={handleCoursesUpdate}
      />
    </div>
  )
}
