"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Certiswift</h2>
          <p className="text-muted-foreground">Preparing your learning experience...</p>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  )
}
