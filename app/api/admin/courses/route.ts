import { NextRequest, NextResponse } from 'next/server'
import { getCourses, addCourse } from '@/lib/supabase'

export async function GET() {
  try {
    const courses = await getCourses()
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching admin courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()
    const success = await addCourse(courseData)
    
    if (success) {
      return NextResponse.json({ message: 'Course created successfully' }, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
