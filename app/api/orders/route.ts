import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'

export async function POST(request: NextRequest) {
  try {
    console.log('Connecting to database...')
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
    await connectDB()
    console.log('Database connected successfully')
    
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
    const {
      customerDetails,
      items,
      subtotal,
      tax,
      total,
      paymentMethod
    } = body

    // Validate required fields
    if (!customerDetails || !items || !subtotal || !tax || !total || !paymentMethod) {
      console.log('Missing required fields:', { customerDetails: !!customerDetails, items: !!items, subtotal: !!subtotal, tax: !!tax, total: !!total, paymentMethod: !!paymentMethod })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Creating new order...')
    // Create new order
    const order = new Order({
      customerDetails,
      items,
      subtotal,
      tax,
      total,
      paymentMethod
    })

    console.log('Order object created:', JSON.stringify(order, null, 2))
    console.log('Saving order to database...')
    
    await order.save()
    console.log('Order saved successfully:', order.orderNumber)

    return NextResponse.json(
      { 
        success: true, 
        order: order,
        message: 'Order placed successfully' 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: `Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Build query
    let query: any = {}
    
    if (status && status !== 'all') {
      query.orderStatus = status
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customerDetails.firstName': { $regex: search, $options: 'i' } },
        { 'customerDetails.lastName': { $regex: search, $options: 'i' } },
        { 'customerDetails.email': { $regex: search, $options: 'i' } }
      ]
    }

    // Get orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('items.productId', 'name images')

    // Get total count for pagination
    const total = await Order.countDocuments(query)

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
