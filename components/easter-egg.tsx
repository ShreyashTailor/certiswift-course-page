"use client"

import { useState, useEffect } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { GraduationCap, Star, Heart, Zap } from "lucide-react"

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false)

  // Listen for a special key combination (Ctrl + Shift + C)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Secret Easter Egg!
            </DrawerTitle>
            <DrawerDescription>
              You found the hidden feature! 🎉
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <Heart className="h-6 w-6 text-red-500" />
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Congratulations! You discovered the secret Certiswift Easter egg.
                </p>
                <p className="text-xs text-muted-foreground">
                  Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + Shift + C</kbd> to open this again!
                </p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
