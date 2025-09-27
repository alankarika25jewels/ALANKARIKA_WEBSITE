import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb-native'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const userId = decoded.userId

    // Get userId from query params (for admin purposes)
    const url = new URL(request.url)
    const queryUserId = url.searchParams.get('userId')

    // Use query userId if provided and user is admin, otherwise use token userId
    const targetUserId = queryUserId || userId

    // Connect to database
    const { db } = await connectToDatabase()

    // Fetch orders for the user
    const orders = await db.collection('orders')
      .find({ userId: targetUserId })
      .sort({ createdAt: -1 })
      .toArray()

    // Format orders for response
    const formattedOrders = orders.map(order => ({
      _id: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }))

    return NextResponse.json({
      success: true,
      orders: formattedOrders
    }, { status: 200 })

  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}