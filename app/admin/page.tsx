"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  EyeOff, 
  Upload, 
  X,
  Settings,
  Database,
  LogOut,
  ArrowLeft,
  UserPlus
} from "lucide-react"
import { toast } from "sonner"
import { authenticateAdmin, createAdmin, addCourse, deleteCourse, Course, testConnection, updateCourse, getCourses } from "@/lib/supabase"
import Link from "next/link"

export default function AdminPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // New admin form state
  const [newAdminData, setNewAdminData] = useState({
    email: "",
    password: ""
  })

  // Course form state
  const [formData, setFormData] = useState({
    title: "",
    type: "FREE" as "FREE" | "PAID",
    provider: "",
    description: "",
    course_url: "",
    category: "",
    subcategory: "",
    platform: "",
    skill_level: "",
    price_range: "",
    custom_amount: ""
  })

  // Course categorization options
  const categories = {
    domain: [
      { value: "web-dev", label: "Web & App Development", subcategories: ["Front-End", "Back-End", "Full-Stack", "Mobile", "JavaScript"] },
      { value: "data-ai", label: "Data & AI", subcategories: ["Data Science", "Data Analytics", "Machine Learning", "Deep Learning", "Power BI"] },
      { value: "cybersecurity", label: "Cybersecurity & IT", subcategories: ["Ethical Hacking", "Network Security", "SOC Analyst", "Information Security"] },
      { value: "design", label: "Design & Creative", subcategories: ["UI/UX Design", "Graphic Design", "Product Design", "Figma", "Adobe XD"] },
      { value: "cloud-devops", label: "Cloud & DevOps", subcategories: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "CI/CD"] },
      { value: "programming", label: "Programming & Software", subcategories: ["Python", "Java", "C/C++", "PHP", "SQL", "JavaScript"] },
      { value: "business", label: "Business & Management", subcategories: ["Project Management", "Digital Marketing", "Entrepreneurship", "Agile", "Finance"] },
      { value: "emerging-tech", label: "Emerging Tech", subcategories: ["Blockchain", "Web3", "AR/VR", "IoT", "Robotics"] },
      { value: "career", label: "Career & Soft Skills", subcategories: ["Communication", "Leadership", "Resume Building", "Interview Skills"] }
    ],
    platforms: [
      "Coursera", "Udemy", "Forage", "IBM SkillsBuild", "AWS Training", "Google Career Certs",
      "Class Central", "Alison", "Microsoft Learn", "Simplilearn", "FutureLearn", "Cisco",
      "edX", "SoloLearn", "Cognitive Class"
    ],
    skillLevels: ["Beginner", "Intermediate", "Advanced", "Expert"],
    priceRanges: ["Free", "Budget (₹500-2500)", "Premium (₹2500-10000)", "Enterprise (₹10000+)", "Custom Amount"]
  }

  // Initialize form data when editing
  const initializeFormData = (course?: Course) => {
    if (course) {
      setFormData({
        title: course.title,
        type: course.type,
        provider: course.provider,
        description: course.description,
        course_url: course.course_url || "",
        category: course.category || "",
        subcategory: course.subcategory || "",
        platform: course.platform || "",
        skill_level: course.skill_level || "",
        price_range: course.price_range || ""
      })
      setImagePreview(course.image_url || "")
    } else {
      setFormData({
        title: "",
        type: "FREE",
        provider: "",
        description: "",
        course_url: "",
        category: "",
        subcategory: "",
        platform: "",
        skill_level: "",
        price_range: "",
        custom_amount: ""
      })
      setImagePreview("")
    }
    setUploadedImage(null)
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    initializeFormData(course)
    setShowAddForm(true)
  }

  const handleCancelEdit = () => {
    setEditingCourse(null)
    setShowAddForm(false)
    initializeFormData()
  }

  // Load courses on component mount since user is already authenticated
  useEffect(() => {
    loadCourses()
  }, [])

  const handleCreateAdmin = async () => {
    if (!newAdminData.email || !newAdminData.password) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const success = await createAdmin(newAdminData.email, newAdminData.password)
      if (success) {
        toast.success("Admin account created successfully!")
        setNewAdminData({ email: "", password: "" })
        setShowCreateAdmin(false)
      } else {
        toast.error("Failed to create admin account")
      }
    } catch (error) {
      toast.error("Failed to create admin account")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadCourses = async () => {
    try {
      const dbCourses = await getCourses()
      setCourses(dbCourses)
    } catch (error) {
      console.error("Failed to load courses:", error)
      toast.error("Failed to load courses")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB")
        return
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file")
        return
      }

      setUploadedImage(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setImagePreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadImageToStorage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        } else {
          reject(new Error('Failed to read file'))
        }
      }
      reader.onerror = () => {
        reject(new Error('Error reading file'))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleAddCourse = async () => {
    if (!formData.title || !formData.provider || !formData.description || !formData.course_url) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      let imageUrl = imagePreview
      
      if (uploadedImage) {
        imageUrl = await uploadImageToStorage(uploadedImage)
      }

      // Handle custom amount
      let finalPriceRange = formData.price_range
      if (formData.price_range === "Custom Amount" && formData.custom_amount) {
        finalPriceRange = `₹${formData.custom_amount}`
      }

      const courseData = {
        ...formData,
        price_range: finalPriceRange,
        image_url: imageUrl
      }
      
      let success = false
      if (editingCourse && editingCourse.id) {
        success = await updateCourse(editingCourse.id, courseData)
        if (success) {
          toast.success("Course updated successfully!")
        }
      } else {
        success = await addCourse(courseData)
        if (success) {
          toast.success("Course added successfully!")
        }
      }

      if (success) {
        await loadCourses()
        initializeFormData()
        setShowAddForm(false)
        setEditingCourse(null)
      }
    } catch (error) {
      console.error('Handle course operation error:', error)
      toast.error("Failed to save course")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (id: number) => {
    setLoading(true)
    try {
      const success = await deleteCourse(id)
      if (success) {
        await loadCourses()
        setDeleteId(null)
        toast.success("Course deleted successfully!")
      } else {
        toast.error("Failed to delete course")
      }
    } catch (error) {
      toast.error("Failed to delete course")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getSelectedSubcategories = () => {
    const selectedCategory = categories.domain.find(cat => cat.value === formData.category)
    return selectedCategory?.subcategories || []
  }

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-sm flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Certiswift Admin</h1>
                <p className="text-sm text-muted-foreground">Course Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                size="sm"
                className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                Add Admin
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  setLoading(true)
                  const isConnected = await testConnection()
                  if (isConnected) {
                    toast.success("Database connection successful!")
                  } else {
                    toast.error("Database connection failed! Check console for details.")
                  }
                  setLoading(false)
                }}
                disabled={loading}
                size="sm"
                className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
              >
                <Database className="w-4 h-4 mr-2" />
                Test DB
              </Button>
              <Button variant="outline" onClick={handleLogout} size="sm" className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Add Admin Section */}
        {showCreateAdmin && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Admin Account
              </CardTitle>
              <CardDescription>Add a new administrator to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="New Admin Email"
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                />
                <Input
                  type="password"
                  placeholder="New Admin Password"
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateAdmin} disabled={loading} className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg">
                  {loading ? "Creating..." : "Create Admin"}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateAdmin(false)} className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course Management */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Course Management</h2>
              <p className="text-muted-foreground">Manage all courses in your platform</p>
            </div>
            <Button 
              onClick={() => {
                if (editingCourse) {
                  handleCancelEdit()
                } else {
                  setShowAddForm(!showAddForm)
                }
              }}
              className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              {editingCourse ? "Cancel Edit" : "Add Course"}
            </Button>
          </div>

          {/* Add/Edit Course Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
                <CardDescription>
                  {editingCourse ? "Update the course details below" : "Fill in the course details below"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Title *</label>
                    <Input
                      placeholder="e.g., Advanced React Patterns"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Author/Provider *</label>
                    <Input
                      placeholder="e.g., Meta, Google, Microsoft"
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type *</label>
                    <Select value={formData.type} onValueChange={(value: "FREE" | "PAID") => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FREE">Free</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value, subcategory: ""})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.domain.map((category) => (
                          <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subcategory</label>
                    <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {getSelectedSubcategories().map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skill Level</label>
                    <Select value={formData.skill_level} onValueChange={(value) => setFormData({...formData, skill_level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.skillLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <Select value={formData.price_range} onValueChange={(value) => setFormData({...formData, price_range: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.priceRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Custom Amount Input - Show only when "Custom Amount" is selected */}
                {formData.price_range === "Custom Amount" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount in rupees"
                      value={formData.custom_amount}
                      onChange={(e) => setFormData({...formData, custom_amount: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description *</label>
                  <Textarea
                    placeholder="Describe what students will learn..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Course URL *</label>
                  <Input
                    type="url"
                    placeholder="https://example.com/course"
                    value={formData.course_url}
                    onChange={(e) => setFormData({...formData, course_url: e.target.value})}
                    autoComplete="off"
                    spellCheck="false"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Required: Direct link to the actual course</p>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course Image</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
                      >
                        <Upload className="w-4 h-4" />
                        {imagePreview ? "Change Image" : "Upload Image"}
                      </Button>
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={removeImage}
                          className="flex items-center gap-2 text-red-600 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Course preview"
                          className="w-full max-w-sm h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Optional: Upload a course thumbnail image (max 5MB, JPG/PNG/GIF)
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleAddCourse} disabled={loading} className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg">
                    {loading 
                      ? (editingCourse ? "Updating..." : "Adding...") 
                      : (editingCourse ? "Update Course" : "Add Course")
                    }
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Course List ({courses.length})</CardTitle>
              <CardDescription>Manage your existing courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No courses available. Add your first course above!</p>
                  </div>
                ) : (
                  courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg truncate">{course.title}</h3>
                              <Badge variant={course.type === "FREE" ? "secondary" : "default"}>
                                {course.type}
                              </Badge>
                              {course.platform && (
                                <Badge variant="outline">{course.platform}</Badge>
                              )}
                            </div>
                            <p className="text-primary font-medium mb-1">{course.provider}</p>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {course.category && <span>Category: {course.category}</span>}
                              {course.subcategory && <span>Subcategory: {course.subcategory}</span>}
                              {course.skill_level && <span>Level: {course.skill_level}</span>}
                              {course.price_range && <span>Price: {course.price_range}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(course)}
                              disabled={loading}
                              className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {course.course_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
                              >
                                <a href={course.course_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => course.id && setDeleteId(course.id)}
                              disabled={loading}
                              className="hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-md"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:scale-105 active:scale-95 transition-all duration-200">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteCourse(deleteId)}
              className="bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-lg"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
