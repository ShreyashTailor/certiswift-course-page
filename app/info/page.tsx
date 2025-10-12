import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Info, Shield, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Information</h1>
            <p className="text-muted-foreground">Learn more about Certiswift</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              About Certiswift
            </CardTitle>
            <CardDescription>
              Your gateway to professional development and skill enhancement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              Certiswift is a comprehensive learning platform designed to accelerate your professional growth. 
              We curate high-quality courses from industry leaders including Meta, Google, Microsoft, and more.
            </p>
            <p className="text-foreground/90">
              Our mission is to make learning accessible, engaging, and effective for students and job seekers 
              worldwide. Whether you&apos;re looking to start your career or advance in your current role, 
              Certiswift provides the resources you need to succeed.
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What makes Certiswift special</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🎓 Curated Content</h4>
                <p className="text-sm text-muted-foreground">
                  Hand-picked courses from industry leaders and top institutions
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">💰 Free & Premium</h4>
                <p className="text-sm text-muted-foreground">
                  Access to both free courses and premium content for advanced learning
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🔍 Smart Search</h4>
                <p className="text-sm text-muted-foreground">
                  Find courses by title, provider, or category with advanced filtering
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">📱 Responsive Design</h4>
                <p className="text-sm text-muted-foreground">
                  Learn anywhere, anytime with our mobile-friendly platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Connect with us on social media</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Follow Us</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📸</span>
                    <Link href="https://www.instagram.com/heaven.tech_/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <Link href="https://www.linkedin.com/company/heaven-tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <Link href="https://discord.gg/hqgarZu9XK" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Discord</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🐙</span>
                    <Link href="https://github.com/xHeavenTech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <Link href="mailto:help@certiswift.in" className="text-primary hover:underline">help@certiswift.in</Link>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Have questions or need help? Reach out to us through our support channels 
                  or join our Discord community for real-time assistance.
                </p>
                <p className="text-sm text-primary font-medium">
                  Email: <Link href="mailto:help@certiswift.in" className="hover:underline">help@certiswift.in</Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Source Section */}
        <Card>
          <CardHeader>
            <CardTitle>Open Source</CardTitle>
            <CardDescription>Built with ❤️ for the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              Certiswift is an open-source project, built with modern technologies including:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Supabase"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-foreground/90">
              We believe in the power of open source to drive innovation and make learning accessible to everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
