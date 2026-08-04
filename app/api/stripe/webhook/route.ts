import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { getStripe, isStripeConfigured } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  const stripe = getStripe()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { success: false, error: 'Missing Stripe webhook signature or secret' },
      { status: 400 }
    )
  }

  const body = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid webhook signature' },
      { status: 400 }
    )
  }

  try {
    await connectDB()

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'completed',
          orderStatus: 'confirmed',
          stripeSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id,
        })
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.orderId

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'failed',
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook handler error:', error)
    return NextResponse.json(
      { success: false, error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
