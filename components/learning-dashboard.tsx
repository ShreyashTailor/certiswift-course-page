"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  BookOpen, 
  TrendingUp,
  Award,
  Heart,
  Play
} from "lucide-react"
import { Course, CourseProgress, Achievement, getUserProgress, getUserAchievements, getUserFavorites, getCourses } from "@/lib/supabase"

interface DashboardProps {
  userId: string
}

export default function LearningDashboard({ userId }: DashboardProps) {
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const loadDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const [progressData, achievementsData, favoritesData, coursesData] = await Promise.all([
        getUserProgress(userId),
        getUserAchievements(userId),
        getUserFavorites(userId),
        getCourses()
      ])

      setProgress(progressData)
      setAchievements(achievementsData)
      setFavorites(favoritesData)
      setCourses(coursesData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const completedCourses = progress.filter(p => p.completed).length
  const inProgressCourses = progress.filter(p => !p.completed && p.progress_percentage > 0).length
  const totalProgress = progress.length > 0 
    ? Math.round(progress.reduce((sum, p) => sum + p.progress_percentage, 0) / progress.length)
    : 0

  const getCourseById = (id: number) => courses.find(c => c.id === id)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your learning dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Your Learning Journey
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your progress, celebrate achievements, and continue growing your skills
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">Great progress! 🎉</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 to-primary" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{inProgressCourses}</div>
            <p className="text-xs text-muted-foreground">Keep going! 💪</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 to-blue-500" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Badges earned! ⭐</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/20 to-yellow-500" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{favorites.length}</div>
            <p className="text-xs text-muted-foreground">Saved courses ❤️</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 to-red-500" />
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Overall Learning Progress
          </CardTitle>
          <CardDescription>Your average completion across all courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Progress</span>
            <span className="text-sm font-bold text-primary">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            You&apos;re doing amazing! Keep up the great work on your learning journey.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-500" />
              Current Progress
            </CardTitle>
            <CardDescription>Courses you&apos;re actively working on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No courses started yet</p>
                <p className="text-sm text-muted-foreground">Start your first course to see progress here!</p>
              </div>
            ) : (
              progress.slice(0, 5).map((item) => {
                const course = getCourseById(item.course_id)
                if (!course) return null

                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.provider}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <Trophy className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                        <span className="text-xs font-medium">{item.progress_percentage}%</span>
                      </div>
                    </div>
                    <Progress value={item.progress_percentage} className="h-2" />
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Badges and milestones you&apos;ve earned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No achievements yet</p>
                <p className="text-sm text-muted-foreground">Complete courses to earn your first badge!</p>
              </div>
            ) : (
              achievements.slice(0, 5).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.badge_name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.earned_at ? new Date(achievement.earned_at).toLocaleDateString() : ''}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Favorite Courses */}
      {favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Your Favorite Courses
            </CardTitle>
            <CardDescription>Courses you&apos;ve bookmarked for later</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.slice(0, 6).map((courseId) => {
                const course = getCourseById(courseId)
                if (!course) return null

                return (
                  <div key={courseId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={course.type === 'FREE' ? 'secondary' : 'default'} className="text-xs">
                        {course.type}
                      </Badge>
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{course.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{course.provider}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
