"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, User, MessageSquare, Calendar } from "lucide-react"
import { CourseRating, addCourseRating, getCourseRatings } from "@/lib/supabase"
import { toast } from "sonner"

interface CourseRatingComponentProps {
  courseId: number
  courseName: string
}

export default function CourseRatingComponent({ courseId, courseName }: CourseRatingComponentProps) {
  const [ratings, setRatings] = useState<CourseRating[]>([])
  const [showAddReview, setShowAddReview] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [newReview, setNewReview] = useState("")
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)

  const loadRatings = useCallback(async () => {
    try {
      const data = await getCourseRatings(courseId)
      setRatings(data)
    } catch (error) {
      console.error('Failed to load ratings:', error)
    }
  }, [courseId])

  useEffect(() => {
    loadRatings()
  }, [courseId, loadRatings])

  const handleSubmitRating = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your name")
      return
    }
    if (newRating === 0) {
      toast.error("Please select a rating")
      return
    }

    setLoading(true)
    try {
      const success = await addCourseRating(courseId, userName.trim(), newRating, newReview.trim() || undefined)
      if (success) {
        toast.success("Thank you for your review! 🌟")
        setNewRating(0)
        setNewReview("")
        setUserName("")
        setShowAddReview(false)
        loadRatings()
      } else {
        toast.error("Failed to submit review. Please try again.")
      }
    } catch {
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const averageRating = ratings.length > 0 
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : "0.0"

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4", 
      lg: "w-5 h-5"
    }
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const renderInteractiveStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={() => setNewRating(star)}
          >
            <Star
              className={`w-6 h-6 ${
                star <= newRating 
                  ? "text-yellow-400 fill-current" 
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </Button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {newRating > 0 ? `${newRating} star${newRating > 1 ? 's' : ''}` : 'Click to rate'}
        </span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Course Reviews
            </CardTitle>
            <CardDescription>
              What students are saying about {courseName}
            </CardDescription>
          </div>
          {!showAddReview && (
            <Button onClick={() => setShowAddReview(true)} size="sm">
              Write Review
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average Rating */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{averageRating}</div>
            <div className="text-sm text-muted-foreground">out of 5</div>
          </div>
          <div className="flex-1">
            {renderStars(Math.round(parseFloat(averageRating)), "lg")}
            <p className="text-sm text-muted-foreground mt-1">
              Based on {ratings.length} review{ratings.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Add Review Form */}
        {showAddReview && (
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Share Your Experience</CardTitle>
              <CardDescription>Help other students by sharing your thoughts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  {renderInteractiveStars()}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Review (Optional)</label>
                <Textarea
                  placeholder="Share your thoughts about this course..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmitRating} 
                  disabled={loading || newRating === 0 || !userName.trim()}
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddReview(false)
                    setNewRating(0)
                    setNewReview("")
                    setUserName("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {ratings.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No reviews yet</h3>
              <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
            </div>
          ) : (
            ratings.map((rating) => (
              <Card key={rating.id} className="border-l-4 border-l-primary/20">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{rating.user_name}</p>
                        <div className="flex items-center gap-2">
                          {renderStars(rating.rating, "sm")}
                          <Badge variant="secondary" className="text-xs">
                            {rating.rating} star{rating.rating > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {rating.created_at ? new Date(rating.created_at).toLocaleDateString() : ''}
                    </div>
                  </div>
                  {rating.review && (
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {rating.review}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
