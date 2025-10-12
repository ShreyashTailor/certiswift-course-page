"use client"

import { useState, useEffect } from "react"
import LearningDashboard from "@/components/learning-dashboard"

export default function DashboardPage() {
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Get user ID from localStorage
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserId(savedUserName)
    }
  }, [])

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mb-4">
            Please start tracking progress on any course to see your learning dashboard.
          </p>
          <a href="/courses" className="text-primary hover:underline">
            Browse Courses →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LearningDashboard userId={userId} />
    </div>
  )
}
