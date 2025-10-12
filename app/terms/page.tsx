import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, FileText, AlertTriangle, Scale, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Rules and guidelines for using Certiswift</p>
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
              By accessing and using Certiswift, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Acceptance of Terms
            </CardTitle>
            <CardDescription>
              Agreement to these terms and conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement. Additionally, when using this website's particular 
              services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p className="text-foreground/90">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        {/* Use License */}
        <Card>
          <CardHeader>
            <CardTitle>Use License</CardTitle>
            <CardDescription>
              Permitted uses of our platform and content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              Permission is granted to temporarily access and use Certiswift for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Ban className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-sm">Modify or copy the materials</p>
              </div>
              <div className="flex items-start gap-3">
                <Ban className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-sm">Use the materials for any commercial purpose or for any public display</p>
              </div>
              <div className="flex items-start gap-3">
                <Ban className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-sm">Attempt to reverse engineer any software contained on the website</p>
              </div>
              <div className="flex items-start gap-3">
                <Ban className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-sm">Remove any copyright or other proprietary notations from the materials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Conduct */}
        <Card>
          <CardHeader>
            <CardTitle>User Conduct</CardTitle>
            <CardDescription>
              Expected behavior when using our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              You agree to use Certiswift in a manner consistent with all applicable laws and regulations. 
              You agree not to:
            </p>
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm">Upload, post, or transmit any content that is harmful, offensive, or inappropriate</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm">Interfere with or disrupt the service or servers or networks connected to the service</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm">Attempt to gain unauthorized access to any portion of the website or any other systems</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm">Use the service to transmit spam, chain letters, or other unsolicited communications</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm">Impersonate any person or entity or misrepresent your affiliation with any person or entity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
            <CardDescription>
              Rights and ownership of content and materials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              The content on Certiswift, including but not limited to text, graphics, images, logos, 
              and software, is the property of Certiswift or its content suppliers and is protected 
              by copyright and other intellectual property laws.
            </p>
            <p className="text-foreground/90">
              Course content linked through our platform remains the property of their respective 
              creators and providers. We serve as an aggregator and directory, not as the original 
              content creator.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Disclaimer
            </CardTitle>
            <CardDescription>
              Limitations of liability and warranties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              The materials on Certiswift are provided on an 'as is' basis. Certiswift makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including without 
              limitation, implied warranties or conditions of merchantability, fitness for a particular 
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-foreground/90">
              Further, Certiswift does not warrant or make any representations concerning the accuracy, 
              likely results, or reliability of the use of the materials on its website or otherwise 
              relating to such materials or on any sites linked to this site.
            </p>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
            <CardDescription>
              Limits on our liability and responsibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              In no event shall Certiswift or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on Certiswift, even if Certiswift 
              or a Certiswift authorized representative has been notified orally or in writing of the 
              possibility of such damage.
            </p>
            <p className="text-foreground/90">
              Because some jurisdictions do not allow limitations on implied warranties, or limitations 
              of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle>Modifications</CardTitle>
            <CardDescription>
              Changes to terms and service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">
              Certiswift may revise these terms of service at any time without notice. By using this 
              website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
            <p className="text-foreground/90">
              We reserve the right to modify or discontinue the service (or any part or content thereof) 
              without notice at any time.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Questions about these terms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 mb-4">
              If you have any questions about these Terms of Service, please contact us through our 
              support channels or join our Discord community.
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
              These terms and conditions are effective as of October 2, 2025.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
