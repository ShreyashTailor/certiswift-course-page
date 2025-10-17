import { NextRequest, NextResponse } from 'next/server'
import { getCourseRatings, addCourseRating } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    const ratings = await getCourseRatings(courseId)
    return NextResponse.json(ratings)
  } catch (error) {
    console.error('Error fetching course ratings:', error)
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    const { userName, rating, review } = await request.json()
    
    if (!userName || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating data' }, { status: 400 })
    }
    
    const success = await addCourseRating(courseId, userName, rating, review)
    
    if (success) {
      return NextResponse.json({ message: 'Rating added successfully' }, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Failed to add rating' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error adding course rating:', error)
    return NextResponse.json({ error: 'Failed to add rating' }, { status: 500 })
  }
}
