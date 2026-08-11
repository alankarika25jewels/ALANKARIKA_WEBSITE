import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { getRazorpay, isRazorpayConfigured } from '@/lib/razorpay'

export async function GET() {
  return NextResponse.json({
    configured: isRazorpayConfigured(),
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const {
      amount,
      currency = 'INR',
      receipt,
      orderId,
    } = body

    const amountInPaise = Math.round(Number(amount))

    if (!amountInPaise || Number.isNaN(amountInPaise)) {
      return NextResponse.json(
        { success: false, error: 'Amount is required' },
        { status: 400 }
      )
    }

    if (amountInPaise < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum amount is 100 paise (₹1)' },
        { status: 400 }
      )
    }

    const razorpay = getRazorpay()

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: orderId ? { orderId: String(orderId) } : undefined,
    })

    if (orderId) {
      await connectDB()
      await Order.findByIdAndUpdate(orderId, {
        razorpayOrderId: razorpayOrder.id,
        paymentMethod: 'razorpay',
        paymentStatus: 'pending',
      })
    }

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error: unknown) {
    console.error('Razorpay create-order error:', error)

    const statusCode =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      Number((error as { statusCode?: number }).statusCode) === 401
        ? 401
        : 500

    const message =
      error instanceof Error ? error.message : 'Failed to create Razorpay order'

    return NextResponse.json(
      { success: false, error: message },
      { status: statusCode }
    )
  }
}
