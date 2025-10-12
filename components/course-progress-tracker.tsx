"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PlayCircle, CheckCircle, Clock, Trophy, User, Calendar, TrendingUp } from "lucide-react"
import { CourseProgress, updateCourseProgress, getUserProgress } from "@/lib/supabase"
import { toast } from "sonner"

interface CourseProgressTrackerProps {
  courseId: number
  courseName: string
  totalModules?: number
}

export default function CourseProgressTracker({ courseId, courseName, totalModules = 10 }: CourseProgressTrackerProps) {
  const [progress, setProgress] = useState<CourseProgress | null>(null)
  const [userName, setUserName] = useState("")
  const [showTracker, setShowTracker] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Try to load existing progress
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserName(savedUserName)
      loadProgress(savedUserName)
    }
  }, [courseId])

  const loadProgress = async (user: string) => {
    try {
      const data = await getUserProgress(user)
      const courseProgress = data.find(p => p.course_id === courseId)
      setProgress(courseProgress || null)
      setShowTracker(true)
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }

  const handleStartTracking = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your name to start tracking")
      return
    }

    localStorage.setItem('userName', userName.trim())
    await loadProgress(userName.trim())
  }

  const updateProgress = async (progressPercentage: number) => {
    if (!userName.trim()) return

    setLoading(true)
    try {
      const success = await updateCourseProgress(
        userName.trim(),
        courseId,
        progressPercentage
      )

      if (success) {
        toast.success("Progress updated! 🎯")
        loadProgress(userName.trim())
      } else {
        toast.error("Failed to update progress")
      }
    } catch (error) {
      toast.error("Failed to update progress")
    } finally {
      setLoading(false)
    }
  }

  const handleModuleComplete = () => {
    if (!progress) return
    const currentPercentage = progress.progress_percentage || 0
    const moduleIncrement = 100 / totalModules
    const newPercentage = Math.min(currentPercentage + moduleIncrement, 100)
    updateProgress(newPercentage)
  }

  const handleAddProgress = (increment: number) => {
    if (!progress) return
    const currentPercentage = progress.progress_percentage || 0
    const newPercentage = Math.min(currentPercentage + increment, 100)
    updateProgress(newPercentage)
  }

  const progressPercentage = progress?.progress_percentage || 0
  const isCompleted = progress?.completed || false
  const completedModules = Math.floor((progressPercentage / 100) * totalModules)

  const getProgressStatus = () => {
    if (!progress) return "Not Started"
    if (isCompleted) return "Completed"
    if (progressPercentage > 0) return "In Progress"
    return "Started"
  }

  const getProgressColor = () => {
    if (isCompleted) return "text-green-600"
    if (progress && progressPercentage > 0) return "text-blue-600"
    return "text-gray-600"
  }

  const getEstimatedTimeRemaining = () => {
    if (!progress || isCompleted) return null
    const remainingPercentage = 100 - progressPercentage
    // Estimate based on average learning pace
    return Math.ceil((remainingPercentage / 100) * 10) // Assume 10 hours total course time
  }

  if (!showTracker) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Track Your Progress
          </CardTitle>
          <CardDescription>
            Start tracking your learning journey for {courseName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              placeholder="Enter your name to start tracking"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartTracking()}
            />
          </div>
          <Button onClick={handleStartTracking} className="w-full">
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Learning Journey
          </Button>
          <div className="text-xs text-muted-foreground text-center">
            Your progress will be saved locally and in our database
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Learning Progress
              {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
            </CardTitle>
            <CardDescription>
              Tracking progress for {userName} • {courseName}
            </CardDescription>
          </div>
          <Badge 
            variant={isCompleted ? "default" : "secondary"}
            className={getProgressColor()}
          >
            {getProgressStatus()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Course Completion</span>
            <span className={`font-bold ${getProgressColor()}`}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{completedModules} of {totalModules} modules</span>
            <span>{progress?.last_accessed ? 'Last accessed: ' + new Date(progress.last_accessed).toLocaleDateString() : 'Not started'}</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-600">
              {completedModules}
            </div>
            <div className="text-xs text-blue-600">Completed</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-600">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-orange-600">Complete</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-600">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-green-600">Progress</div>
          </div>

          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-600">
              {getEstimatedTimeRemaining() || 0}h
            </div>
            <div className="text-xs text-purple-600">Remaining</div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isCompleted && (
          <div className="flex gap-2">
            <Button 
              onClick={handleModuleComplete} 
              disabled={loading}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Module
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAddProgress(10)}
              disabled={loading}
            >
              <Clock className="w-4 h-4 mr-2" />
              +10%
            </Button>
          </div>
        )}

        {isCompleted && (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-bold text-green-700 mb-1">Congratulations! 🎉</h3>
            <p className="text-sm text-green-600">
              You've completed {courseName}! 
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Completed on {progress?.last_accessed ? new Date(progress.last_accessed).toLocaleDateString() : 'Unknown date'}
            </p>
          </div>
        )}

        {/* Progress Timeline */}
        {progress && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Learning Timeline
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Started</span>
                <span>{progress.created_at ? new Date(progress.created_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Accessed</span>
                <span>{progress.last_accessed ? new Date(progress.last_accessed).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Progress</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
