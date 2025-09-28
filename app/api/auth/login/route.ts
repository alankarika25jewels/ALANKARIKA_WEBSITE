import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called')
    const { email, password } = await request.json()
    console.log('Login attempt for:', email)

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Simple hardcoded admin check for testing
    if (email === 'admin@alankarika.com' && password === 'admin123') {
      console.log('Login successful for:', email)
      
      const userData = {
        _id: 'admin123',
        email: 'admin@alankarika.com',
        firstName: 'Admin',
        lastName: 'User',
        fullName: 'Admin User',
        phone: '',
        role: 'admin',
        address: {},
        preferences: {},
        createdAt: new Date().toISOString()
      }

      return NextResponse.json(
        { 
          success: true,
          message: 'Login successful',
          data: userData
        },
        { status: 200 }
      )
    }

    console.log('Invalid credentials for:', email)
    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
