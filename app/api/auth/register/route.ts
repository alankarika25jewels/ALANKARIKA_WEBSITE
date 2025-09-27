import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb-native'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const userData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'customer'
    }

    const result = await db.collection('users').insertOne(userData)

    if (!result.insertedId) {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Return user data (without password)
    const newUser = {
      _id: result.insertedId.toString(),
      email,
      firstName,
      lastName,
      role: 'customer',
      createdAt: userData.createdAt
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: newUser
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
