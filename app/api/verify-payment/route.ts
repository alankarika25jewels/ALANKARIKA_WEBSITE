import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { isRazorpayConfigured, verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Razorpay is not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature',
        },
        { status: 400 }
      )
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    await connectDB()

    let order = null
    if (orderId) {
      order = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'completed',
          orderStatus: 'confirmed',
          paymentMethod: 'razorpay',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true }
      )
    } else {
      order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: 'completed',
          orderStatus: 'confirmed',
          paymentMethod: 'razorpay',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order,
    })
  } catch (error) {
    console.error('Razorpay verify-payment error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      },
      { status: 500 }
    )
  }
}
