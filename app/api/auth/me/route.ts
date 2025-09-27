import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb-native'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'No authentication token' },
        { status: 401 }
      )
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Find user
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) })
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data (without password)
    const userData = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt
    }

    return NextResponse.json(userData, { status: 200 })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
