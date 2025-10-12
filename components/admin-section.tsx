"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Plus, Trash2, Eye, EyeOff, UserPlus, Edit } from "lucide-react"
import { toast } from "sonner"
import { authenticateAdmin, createAdmin, addCourse, deleteCourse, Course, testConnection, updateCourse } from "@/lib/supabase"

interface AdminSectionProps {
  isOpen: boolean
  onClose: () => void
  courses: Course[]
  onCoursesUpdate: (courses: Course[]) => void
}

export default function AdminSection({ isOpen, onClose, courses, onCoursesUpdate }: AdminSectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(false)
  
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
    image_url: "",
    course_url: ""
  })

  // Initialize form data when editing
  const initializeFormData = (course?: Course) => {
    if (course) {
      setFormData({
        title: course.title,
        type: course.type,
        provider: course.provider,
        description: course.description,
        image_url: course.image_url || "",
        course_url: course.course_url || ""
      })
    } else {
      setFormData({
        title: "",
        type: "FREE",
        provider: "",
        description: "",
        image_url: "",
        course_url: ""
      })
    }
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

  const handleAuth = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const isValid = await authenticateAdmin(email, password)
      if (isValid) {
        setIsAuthenticated(true)
        setPassword("")
        toast.success("Welcome to admin panel!")
      } else {
        toast.error("Invalid credentials! Please check your email and password.")
        setPassword("")
      }
    } catch (error) {
      toast.error("Authentication failed! Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleClose = () => {
    setIsAuthenticated(false)
    setEmail("") // Explicitly clear email
    setPassword("")
    setShowAddForm(false)
    setShowCreateAdmin(false)
    setEditingCourse(null)
    setNewAdminData({ email: "", password: "" })
    initializeFormData()
    onClose()
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  const handleAddCourse = async () => {
    if (!formData.title || !formData.provider || !formData.description || !formData.course_url) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      console.log('Form data being sent:', formData) // Debug log
      
      let success = false
      if (editingCourse && editingCourse.id) {
        // Update existing course
        success = await updateCourse(editingCourse.id, formData)
        if (success) {
          toast.success("Course updated successfully!")
        } else {
          toast.error("Failed to update course. Please check the console for details.")
        }
      } else {
        // Add new course
        success = await addCourse(formData)
        if (success) {
          toast.success("Course added successfully!")
        } else {
          toast.error("Failed to add course. Please check the console for details.")
        }
      }

      if (success) {
        // Refresh courses list by calling parent component
        window.location.reload() // Simple refresh for now
        initializeFormData()
        setShowAddForm(false)
        setEditingCourse(null)
      }
    } catch (error) {
      console.error('Handle course operation error:', error)
      toast.error("Failed to add course. Please check the console for details.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (id: number) => {
    setLoading(true)
    try {
      const success = await deleteCourse(id)
      if (success) {
        // Refresh courses list
        window.location.reload() // Simple refresh for now
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

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
          <DialogDescription>
            Manage courses for Certiswift
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
              <div className="max-w-sm mx-auto space-y-4">
                <div className="space-y-2">
                  <Input
                    key="admin-email-input"
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <div className="relative">
                    <Input
                      key="admin-password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAuth()}
                      className="bg-background"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button onClick={handleAuth} className="w-full" disabled={loading}>
                  {loading ? "Authenticating..." : "Login"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Admin Dashboard Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold">Admin Dashboard</h3>
                <p className="text-sm text-muted-foreground">Manage courses and administrators</p>
              </div>
              <div className="flex gap-2">
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
                >
                  Test DB
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Admin
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Logout
                </Button>
              </div>
            </div>

            {/* Create Admin Section */}
            {showCreateAdmin && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Create New Admin Account</CardTitle>
                  <CardDescription>Add a new administrator to the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="New Admin Email"
                      value={newAdminData.email}
                      onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                      className="bg-background"
                    />
                    <Input
                      type="password"
                      placeholder="New Admin Password"
                      value={newAdminData.password}
                      onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                      className="bg-background"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateAdmin} disabled={loading}>
                      {loading ? "Creating..." : "Create Admin"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateAdmin(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Management Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-semibold">Course Management</h4>
                <Button 
                  onClick={() => {
                    if (editingCourse) {
                      handleCancelEdit()
                    } else {
                      setShowAddForm(!showAddForm)
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {editingCourse ? "Cancel Edit" : "Add Course"}
                </Button>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">{courses.length}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Courses</p>
                        <p className="text-xs text-muted-foreground">All courses in database</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-semibold">
                          {courses.filter(c => c.type === "FREE").length}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Free Courses</p>
                        <p className="text-xs text-muted-foreground">Available for everyone</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {courses.filter(c => c.type === "PAID").length}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Paid Courses</p>
                        <p className="text-xs text-muted-foreground">Premium content</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {showAddForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
                    <CardDescription>
                      {editingCourse ? "Update the course details below" : "Fill in the course details below"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Course Title *</label>
                        <Input
                          placeholder="e.g., Advanced React Patterns"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Provider *</label>
                        <Input
                          placeholder="e.g., Meta, Google, Microsoft"
                          value={formData.provider}
                          onChange={(e) => setFormData({...formData, provider: e.target.value})}
                          className="bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Type *</label>
                      <Select value={formData.type} onValueChange={(value: "FREE" | "PAID") => setFormData({...formData, type: value})}>
                        <SelectTrigger className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FREE">Free</SelectItem>
                          <SelectItem value="PAID">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description *</label>
                      <Textarea
                        placeholder="Describe what students will learn..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Course Image URL</label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={formData.image_url}
                          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                          className="bg-background"
                          autoComplete="off"
                          spellCheck="false"
                        />
                        <p className="text-xs text-muted-foreground">Optional: Direct link to course thumbnail image</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Course URL *</label>
                        <Input
                          type="url"
                          placeholder="https://example.com/course"
                          value={formData.course_url}
                          onChange={(e) => setFormData({...formData, course_url: e.target.value})}
                          className="bg-background"
                          autoComplete="off"
                          spellCheck="false"
                          required
                        />
                        <p className="text-xs text-muted-foreground">Required: Direct link to the actual course</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button onClick={handleAddCourse} disabled={loading}>
                        {loading 
                          ? (editingCourse ? "Updating..." : "Adding...") 
                          : (editingCourse ? "Update Course" : "Add Course")
                        }
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Existing Courses */}
            <div>
              <h4 className="text-md font-semibold mb-4">Course List ({courses.length})</h4>
              {courses.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No courses available. Add your first course above!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {courses.map((course) => (
                    <Card key={course.id} className="bg-card">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold truncate">{course.title}</h4>
                              <div className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                course.type === "FREE" 
                                  ? "bg-green-50 text-green-700 ring-green-600/20" 
                                  : "bg-primary/10 text-primary ring-primary/20"
                              }`}>
                                {course.type}
                              </div>
                            </div>
                            <p className="text-sm text-primary font-medium mb-1">{course.provider}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(course)}
                              disabled={loading}
                              className="bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 text-blue-400"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => course.id && setDeleteId(course.id)}
                              disabled={loading}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>

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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteCourse(deleteId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
