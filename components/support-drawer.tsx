"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Bug, HelpCircle, Mail, Send } from "lucide-react"
import { toast } from "sonner"

export default function SupportDrawer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")

  // Spam detection keywords
  const spamKeywords = [
    'free money', 'get rich quick', 'make money fast', 'work from home',
    'click here', 'limited time', 'act now', 'urgent', 'congratulations',
    'winner', 'prize', 'lottery', 'viagra', 'casino', 'gambling',
    'bitcoin', 'crypto investment', 'guaranteed income', 'easy money',
    'nigerian prince', 'inheritance', 'million dollars', 'bank transfer',
    'verify account', 'suspended account', 'update payment', 'refund',
    'sex', 'adult', 'dating', 'singles', 'meet women', 'hot girls'
  ]

  // Detect spam content
  const isSpamContent = (text: string) => {
    const lowerText = text.toLowerCase()
    const spamScore = spamKeywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length
    
    // Check for suspicious patterns
    const hasExcessiveCaps = (text.match(/[A-Z]/g) || []).length > text.length * 0.3
    const hasExcessivePunctuation = (text.match(/[!?]{2,}/g) || []).length > 0
    const hasRepeatedChars = /(.)\1{3,}/.test(text)
    const hasUrls = /https?:\/\//.test(text) || /www\./.test(text)
    
    return spamScore > 0 || hasExcessiveCaps || hasExcessivePunctuation || hasRepeatedChars || hasUrls
  }

  // Email verification function - checks if domain has MX records
  const verifyEmailDomain = async (email: string) => {
    try {
      const domain = email.split('@')[1]
      if (!domain) return false

      // Use a public DNS API to check MX records
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`)
      const data = await response.json()
      
      return data.Status === 0 && data.Answer && data.Answer.length > 0
    } catch {
      // If DNS check fails, allow common domains
      const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']
      const domain = email.split('@')[1]?.toLowerCase()
      return commonDomains.includes(domain)
    }
  }

  // Email validation function
  const validateEmail = async (email: string) => {
    if (!email) {
      setEmailError("")
      return false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format")
      return false
    }

    // Check for suspicious email patterns
    const suspiciousPatterns = [
      /\d{6,}@/, // Too many consecutive numbers
      /^[a-z]{1,2}@/, // Too short username
      /^\d+@/, // Only numbers in username
      /@\d+\w+\./ // Numbers in domain
    ]
    
    if (suspiciousPatterns.some(pattern => pattern.test(email))) {
      setEmailError("Email address appears suspicious")
      return false
    }

    const validDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
      'protonmail.com', 'aol.com', 'mail.com', 'zoho.com', 'live.com',
      'msn.com', 'yandex.com', 'rediffmail.com', 'fastmail.com'
    ]
    
    const emailDomain = email.split('@')[1]?.toLowerCase()
    
    // For common domains, just check the list
    if (validDomains.includes(emailDomain)) {
      setEmailError("")
      return true
    }
    
    // For other domains, verify they exist
    const domainExists = await verifyEmailDomain(email)
    if (!domainExists) {
      setEmailError("Email domain does not exist or cannot receive emails")
      return false
    }

    setEmailError("")
    return true
  }

  // Simple base64 encryption for webhook URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.type || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields")
      return
    }

    // Validate name (at least 2 characters, no numbers)
    if (formData.name.trim().length < 2) {
      toast.error("Please enter a valid name (at least 2 characters)")
      return
    }

    if (/\d/.test(formData.name)) {
      toast.error("Name should not contain numbers")
      return
    }

    // Strict email validation with domain verification
    const emailValid = await validateEmail(formData.email)
    if (!emailValid) {
      return // Error message already set by validateEmail
    }

    // Validate subject (minimum length)
    if (formData.subject.trim().length < 5) {
      toast.error("Please provide a more descriptive subject (at least 5 characters)")
      return
    }

    // Validate message (minimum length)
    if (formData.message.trim().length < 10) {
      toast.error("Please provide more details in your message (at least 10 characters)")
      return
    }

    // Spam detection
    const isSpam = isSpamContent(formData.subject + " " + formData.message + " " + formData.name)
    const spamPrefix = isSpam ? "(SPAM) " : ""

    // Rate limiting check (simple client-side)
    const lastSubmission = localStorage.getItem('lastSupportSubmission')
    const now = Date.now()
    if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 minute
      toast.error("Please wait at least 1 minute between support requests")
      return
    }

    setIsSubmitting(true)

    try {
      const webhookPayload = {
        embeds: [
          {
            title: `${spamPrefix}🎓 Certiswift Support: ${formData.type}`,
            color: isSpam ? 0xff0000 : 0xea580c, // Red for spam, orange for normal
            fields: [
              {
                name: "📝 Subject",
                value: formData.subject,
                inline: false
              },
              {
                name: "👤 Name",
                value: formData.name,
                inline: true
              },
              {
                name: "📧 Email",
                value: formData.email,
                inline: true
              },
              {
                name: "🔍 Type",
                value: formData.type,
                inline: true
              },
              {
                name: "💬 Message",
                value: formData.message,
                inline: false
              },
              ...(isSpam ? [{
                name: "⚠️ Spam Detection",
                value: "This message was flagged as potential spam",
                inline: false
              }] : [])
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: `Certiswift Support System ${isSpam ? '| SPAM DETECTED' : ''}`
            }
          }
        ]
      }

      const webhookUrl = "https://discord.com/api/webhooks/1423353971166154835/t-CdRrKCi_qJLBdQmLCnNvaEUbB9_25hSYSnA-mOr_aGF0IuHWsdmkSGwQZnuPn8-83d"

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      })

      if (response.ok) {
        // Store timestamp for rate limiting
        localStorage.setItem('lastSupportSubmission', now.toString())
        
        toast.success("Support request sent successfully! We'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          type: "",
          subject: "",
          message: ""
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast.error("Failed to send support request. Please try again.")
      console.error("Error sending support request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Support
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Contact Support
            </DrawerTitle>
            <DrawerDescription>
              Found a bug or have a question? We&apos;re here to help! Fill out the form below and we&apos;ll get back to you as soon as possible.
              <br />
              <span className="text-primary font-medium">Email: help@certiswift.in</span> | 
              <span className="text-primary font-medium"> Discord: </span>
              <a href="https://discord.gg/hqgarZu9XK" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Join our community
              </a>
            </DrawerDescription>
          </DrawerHeader>
          
          <form onSubmit={handleSubmit} className="p-4 pb-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name *
                </label>
                <Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                  required
                  minLength={2}
                  pattern="[A-Za-z\s]+"
                  title="Name should contain only letters and spaces"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={async (e) => {
                    const email = e.target.value
                    setFormData({ ...formData, email })
                    if (email && email.includes('@')) {
                      await validateEmail(email)
                    }
                  }}
                  className={`bg-background ${emailError ? 'border-red-500' : ''}`}
                  required
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Type *
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bug Report">
                      <div className="flex items-center gap-2">
                        <Bug className="w-4 h-4 text-red-500" />
                        Bug Report
                      </div>
                    </SelectItem>
                    <SelectItem value="Feature Request">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-500" />
                        Feature Request
                      </div>
                    </SelectItem>
                    <SelectItem value="General Question">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        General Question
                      </div>
                    </SelectItem>
                    <SelectItem value="Course Issue">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Course Issue
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subject *
                </label>
                <Input
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background"
                  required
                  minLength={5}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Message *
              </label>
              <Textarea
                placeholder="Please provide detailed information about your issue or question..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-background"
                required
                minLength={10}
                maxLength={1000}
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your message will be sent directly to our support team. We typically respond within 24 hours.
              </p>
            </div>
          </form>

          <DrawerFooter>
            <Button 
              type="submit" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Support Request
                </>
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
