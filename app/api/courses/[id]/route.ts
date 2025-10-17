import { NextRequest, NextResponse } from 'next/server'
import { getCourses, updateCourse, deleteCourse } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courses = await getCourses()
    const course = courses.find(c => c.id === parseInt(params.id))
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }
    
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseData = await request.json()
    const courseId = parseInt(params.id)
    
    const success = await updateCourse(courseId, courseData)
    
    if (success) {
      return NextResponse.json({ message: 'Course updated successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    const success = await deleteCourse(courseId)
    
    if (success) {
      return NextResponse.json({ message: 'Course deleted successfully' }, { status: 204 })
    } else {
      return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
