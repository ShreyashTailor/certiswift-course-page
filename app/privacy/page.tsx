import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">How we protect and handle your information</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Last Updated */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Last updated:</strong> October 2, 2025
            </p>
            <p className="mt-2 text-foreground/90">
              This Privacy Policy describes how Certiswift collects, uses, and protects your information 
              when you use our service.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Information We Collect
            </CardTitle>
            <CardDescription>
              Types of information we may collect from you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-primary mb-1">Personal Information</h4>
                <p className="text-sm text-muted-foreground">
                  When you create an account or contact us, we may collect information such as 
                  your name, email address, and preferences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Usage Information</h4>
                <p className="text-sm text-muted-foreground">
                  We collect information about how you interact with our platform, including 
                  courses viewed, search queries, and time spent on the platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Technical Information</h4>
                <p className="text-sm text-muted-foreground">
                  We may collect technical information such as your IP address, browser type, 
                  device information, and operating system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              How We Use Your Information
            </CardTitle>
            <CardDescription>
              The purposes for which we process your data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Provide and Improve Services</h4>
                  <p className="text-sm text-muted-foreground">
                    To deliver course content, personalize your experience, and improve our platform
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Communication</h4>
                  <p className="text-sm text-muted-foreground">
                    To send you updates, notifications, and respond to your inquiries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Analytics and Research</h4>
                  <p className="text-sm text-muted-foreground">
                    To understand usage patterns and improve our content recommendations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Security and Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    To protect our platform and users from fraud, abuse, and security threats
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Data Protection & Security
            </CardTitle>
            <CardDescription>
              How we keep your information safe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              We implement appropriate technical and organizational security measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🔐 Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  Data transmitted between your device and our servers is encrypted using industry-standard protocols
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🛡️ Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  We limit access to personal information to authorized personnel only
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🔄 Regular Audits</h4>
                <p className="text-sm text-muted-foreground">
                  We regularly review and update our security practices and procedures
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">💾 Data Minimization</h4>
                <p className="text-sm text-muted-foreground">
                  We only collect and retain data that is necessary for our services
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="w-5 h-5" />
              Your Rights
            </CardTitle>
            <CardDescription>
              Control over your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              You have certain rights regarding your personal information:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Request a copy of the personal information we hold about you
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Rectification</h4>
                  <p className="text-sm text-muted-foreground">
                    Request correction of any inaccurate or incomplete information
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Deletion</h4>
                  <p className="text-sm text-muted-foreground">
                    Request deletion of your personal information under certain circumstances
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Portability</h4>
                  <p className="text-sm text-muted-foreground">
                    Request transfer of your data to another service provider
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Questions about this Privacy Policy</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us through our support channels or join our Discord community.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> <Link href="mailto:help@certiswift.in" className="text-primary hover:underline">help@certiswift.in</Link>
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Discord:</strong> <Link href="https://discord.gg/hqgarZu9XK" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Join our community</Link>
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We will respond to your inquiry within a reasonable timeframe and in accordance 
              with applicable data protection laws.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
