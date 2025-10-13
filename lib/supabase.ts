import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Add validation
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test connection function
export const testConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...')
    console.log('📍 URL:', supabaseUrl)
    console.log('🔑 Key (first 20 chars):', supabaseKey.substring(0, 20) + '...')
    
    const { data, error, status, statusText } = await supabase
      .from('courses')
      .select('count', { count: 'exact', head: true })
    
    console.log('📊 Response status:', status)
    console.log('📊 Response statusText:', statusText)
    
    if (error) {
      console.error('❌ Connection test failed:', error)
      console.error('🔴 Error code:', error.code)
      console.error('🔴 Error message:', error.message)
      console.error('🔴 Error details:', error.details)
      console.error('🔴 Error hint:', error.hint)
      return false
    }
    console.log('✅ Database connection successful, courses count:', data)
    return true
  } catch (error) {
    console.error('💥 Connection test error:', error)
    return false
  }
}

// Database types
export interface Course {
  id?: number
  title: string
  description: string
  provider: string
  instructor?: string
  price?: number
  type: 'FREE' | 'PAID'
  image_url?: string
  course_url?: string
  created_at?: string
  rating?: number
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  duration?: string
  category?: string
  subcategory?: string
  platform?: string
  skill_level?: string
  price_range?: string
  custom_amount?: string
}

export interface Admin {
  id?: number
  email: string
  password: string
  created_at?: string
}

export interface CourseProgress {
  id?: number
  user_id: string
  course_id: number
  progress_percentage: number
  completed: boolean
  last_accessed?: string
  created_at?: string
}

export interface CourseRating {
  id?: number
  course_id: number
  user_name: string
  rating: number
  review?: string
  created_at?: string
}

export interface UserFavorite {
  id?: number
  user_id: string
  course_id: number
  created_at?: string
}

export interface Achievement {
  id?: number
  user_id: string
  badge_type: string
  badge_name: string
  description: string
  earned_at?: string
}

// Admin functions
export const authenticateAdmin = async (email: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error) {
      console.error('Auth error:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Authentication failed:', error)
    return false
  }
}

export const createAdmin = async (email: string, password: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('admins')
      .insert([{ email, password }])

    if (error) {
      console.error('Create admin error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to create admin:', error)
    return false
  }
}

// Course functions
export const getCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get courses error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to get courses:', error)
    return []
  }
}

export const addCourse = async (course: Omit<Course, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    console.log('🚀 Adding course:', course)
    console.log('📍 Supabase URL:', supabaseUrl)
    console.log('🔑 Using API key:', supabaseKey ? 'Present ✅' : 'Missing ❌')
    
    const { data, error, status, statusText } = await supabase
      .from('courses')
      .insert([course])
      .select() // Return the inserted data

    console.log('📊 Insert response status:', status)
    console.log('📊 Insert response statusText:', statusText)

    if (error) {
      console.error('❌ Add course error:', error)
      console.error('🔴 Error code:', error.code)
      console.error('🔴 Error message:', error.message)
      console.error('🔴 Error details:', error.details)
      console.error('🔴 Error hint:', error.hint)
      
      // Additional debugging
      if (error.code === 'PGRST116') {
        console.error('🚨 Table not found! Check if courses table exists')
      }
      if (error.code === '42501') {
        console.error('🚨 Permission denied! Check RLS policies')
      }
      
      return false
    }

    console.log('✅ Course added successfully:', data)
    return true
  } catch (error) {
    console.error('💥 Failed to add course (catch block):', error)
    return false
  }
}

export const updateCourse = async (id: number, course: Omit<Course, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    console.log('🔄 Updating course:', id, course)
    
    const { data, error, status, statusText } = await supabase
      .from('courses')
      .update(course)
      .eq('id', id)
      .select()

    console.log('📊 Update response status:', status)
    console.log('📊 Update response statusText:', statusText)

    if (error) {
      console.error('❌ Update course error:', error)
      console.error('🔴 Error code:', error.code)
      console.error('🔴 Error message:', error.message)
      console.error('🔴 Error details:', error.details)
      console.error('🔴 Error hint:', error.hint)
      return false
    }

    console.log('✅ Course updated successfully:', data)
    return true
  } catch (error) {
    console.error('💥 Failed to update course (catch block):', error)
    return false
  }
}

export const deleteCourse = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete course error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to delete course:', error)
    return false
  }
}

// 🎯 NEW FEATURES START HERE

// Course Progress Functions
export const updateCourseProgress = async (userId: string, courseId: number, progressPercentage: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('course_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        progress_percentage: progressPercentage,
        completed: progressPercentage >= 100,
        last_accessed: new Date().toISOString()
      })

    if (error) {
      console.error('Update progress error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to update progress:', error)
    return false
  }
}

export const getUserProgress = async (userId: string): Promise<CourseProgress[]> => {
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.error('Get progress error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to get progress:', error)
    return []
  }
}

// Course Rating Functions
export const addCourseRating = async (courseId: number, userName: string, rating: number, review?: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('course_ratings')
      .insert({
        course_id: courseId,
        user_name: userName,
        rating,
        review
      })

    if (error) {
      console.error('Add rating error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to add rating:', error)
    return false
  }
}

export const getCourseRatings = async (courseId: number): Promise<CourseRating[]> => {
  try {
    const { data, error } = await supabase
      .from('course_ratings')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get ratings error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to get ratings:', error)
    return []
  }
}

// Favorites Functions
export const toggleFavorite = async (userId: string, courseId: number): Promise<boolean> => {
  try {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId)

      if (error) {
        console.error('Remove favorite error:', error)
        return false
      }
    } else {
      // Add favorite
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: userId, course_id: courseId })

      if (error) {
        console.error('Add favorite error:', error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
    return false
  }
}

export const getUserFavorites = async (userId: string): Promise<number[]> => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('course_id')
      .eq('user_id', userId)

    if (error) {
      console.error('Get favorites error:', error)
      return []
    }

    return data?.map(item => item.course_id) || []
  } catch (error) {
    console.error('Failed to get favorites:', error)
    return []
  }
}

// Achievement Functions
export const awardAchievement = async (userId: string, badgeType: string, badgeName: string, description: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        badge_type: badgeType,
        badge_name: badgeName,
        description
      })

    if (error) {
      console.error('Award achievement error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to award achievement:', error)
    return false
  }
}

export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })

    if (error) {
      console.error('Get achievements error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to get achievements:', error)
    return []
  }
}
