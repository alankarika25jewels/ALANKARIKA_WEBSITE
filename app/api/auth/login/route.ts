import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb-native'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Find user by email
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Create response with user data (without password)
    const userData = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt
    }

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: userData,
        token
      },
      { status: 200 }
    )

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
