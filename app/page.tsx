"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { BookOpen, GraduationCap, Users, Award, Terminal, CheckCircle, Instagram, Linkedin, MessageSquare, Github, Heart } from "lucide-react"

export default function Home() {
  // Team members data
  const teamMembers = [
    {
      name: "Vansh",
      role: "Founder",
      image: "https://i.ibb.co/ccC8vdMV/Whats-App-Image-2025-10-12-at-19-08-34-06546f42.jpg?scale-down-to=512&width=7219&height=7306",
      description: "Visionary leader driving Certiswift&apos;s mission to make quality education accessible to everyone worldwide."
    },
    {
      name: "Shreyash", 
      role: "Co-Founder",
      image: "https://framerusercontent.com/images/wtymwv9VcjASbqN9CnXUgEEXH4.png?scale-down-to=512&width=4620&height=4676",
      description: "Strategic innovator focused on building partnerships and expanding our reach in the education technology space."
    },
    {
      name: "Garv(Shubham)",
      role: "CEO", 
      image: "https://i.ibb.co/20tPBVjF/Whats-App-Image-2025-10-12-at-18-53-24-7dfea4ab.jpg?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
      description: "Experienced executive leading operational excellence and driving sustainable growth for the platform."
    },
    {
      name: "Preet",
      role: "CTO",
      image: "https://framerusercontent.com/images/ON0ffLneptoE6O2se9Hyx59qTJg.png?scale-down-to=512&width=4620&height=4676", 
      description: "Technology architect building scalable solutions and ensuring the best learning experience for our users."
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-32 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-primary/4 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              {/* Animated Certiswift Text */}
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 relative">
                  <span className="inline-block">
                    <span className="relative inline-block animate-bounce">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse">
                        C
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-100">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-100">
                        e
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-200">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-200">
                        r
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-300">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-300">
                        t
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-400">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-400">
                        i
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-500">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-500">
                        s
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-600">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-600">
                        w
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-700">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-700">
                        i
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-800">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-800">
                        f
                      </span>
                    </span>
                    <span className="relative inline-block animate-bounce delay-1000">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse delay-1000">
                        t
                      </span>
                    </span>
                  </span>
                  
                  {/* Glowing effect */}
                  <div className="absolute inset-0 text-6xl md:text-8xl font-bold tracking-tighter opacity-20 blur-sm text-primary animate-pulse">
                    Certiswift
                  </div>
                </h1>
                
                {/* Subtitle animation */}
                <div className="relative overflow-hidden">
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 animate-fade-in-up">
                    The Foundation for your
                    <br />
                    <span className="text-primary animate-fade-in-up delay-500">Learning System</span>
                  </h2>
                </div>
              </div>
              
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl animate-fade-in-up delay-1000">
                A set of beautifully designed courses that you can customize, extend,
                and build on. Start here then make it your own. Open Source. Open Code.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center animate-fade-in-up delay-1500">
              <Button asChild size="lg" className="h-11 px-8 relative group overflow-hidden hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg">
                <Link href="/courses">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-8 relative group hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md">
                <span className="relative z-10">View Courses</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
            {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate minds behind Certiswift, dedicated to revolutionizing online learning
            </p>
          </div>
          
          <div className="relative">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="w-80 sm:w-72"
                  >
                    <div className="bg-card rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary/10">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to gradient background if image fails
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.parentElement!.style.background = 'linear-gradient(45deg, #f97316, #ea580c)'
                              e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-xl">${member.name.charAt(0)}</div>`
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                          {member.role}
                        </span>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16 mb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-sm flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-foreground">Certiswift</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6">
              <Link 
                href="https://www.instagram.com/heaven.tech_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Instagram</span>
              </Link>
              
              <span className="text-muted-foreground/50">|</span>
              
              <Link 
                href="https://www.linkedin.com/company/heaven-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LinkedIn</span>
              </Link>
              
              <span className="text-muted-foreground/50">|</span>
              
              <Link 
                href="https://discord.gg/hqgarZu9XK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Discord</span>
              </Link>
              
              <span className="text-muted-foreground/50">|</span>
              
              <Link 
                href="https://github.com/xHeavenTech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Github</span>
              </Link>
            </div>

            {/* Horizontal Separator */}
            <div className="max-w-md mx-auto h-px bg-border"></div>

            {/* Footer Message */}
            <div className="space-y-2">
              <p className="text-foreground flex items-center justify-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for students and job seekers</span>
              </p>
              <p className="text-muted-foreground">
                Open source • Free forever • Built for learning
              </p>
            </div>

            {/* Copyright */}
            <div className="pt-4">
              <p className="text-muted-foreground/70">
                © {new Date().getFullYear()} Certiswift. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
