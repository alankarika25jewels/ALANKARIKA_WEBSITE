import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/User'
import { getAuthFromCookies } from '@/lib/auth'

export async function GET() {
  try {
    const auth = await getAuthFromCookies()
    if (!auth?.userId) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    await connectDB()
    const user = await User.findById(auth.userId).select('-password')
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phone: user.phone || '',
      role: user.role,
      address: user.address || {},
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email.split('@')[0],
    })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
