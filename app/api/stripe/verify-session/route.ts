import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { getStripe, isStripeConfigured } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Stripe is not configured' },
        { status: 503 }
      )
    }

    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing session_id' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    await connectDB()

    const orderId = session.metadata?.orderId
    let order = null

    if (orderId) {
      if (session.payment_status === 'paid') {
        order = await Order.findByIdAndUpdate(
          orderId,
          {
            paymentStatus: 'completed',
            orderStatus: 'confirmed',
            stripeSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id,
          },
          { new: true }
        )
      } else {
        order = await Order.findById(orderId)
      }
    }

    return NextResponse.json({
      success: true,
      paymentStatus: session.payment_status,
      order,
    })
  } catch (error) {
    console.error('Stripe verify session error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify session',
      },
      { status: 500 }
    )
  }
}
