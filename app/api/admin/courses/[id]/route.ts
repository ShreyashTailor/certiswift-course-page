import { NextRequest, NextResponse } from 'next/server'
import { updateCourse, deleteCourse } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // destructure id here
  try {
    const courseData = await request.json()
    const courseId = parseInt(id) // use `id` instead of `params.id`

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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // destructure id here
  try {
    const courseId = parseInt(id) // use `id` instead of `params.id`
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
