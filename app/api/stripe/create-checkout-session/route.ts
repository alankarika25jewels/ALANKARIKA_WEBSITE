import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { getAppUrl, getStripe, isStripeConfigured } from '@/lib/stripe'

export async function GET() {
  return NextResponse.json({
    configured: isStripeConfigured(),
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Stripe is not configured yet. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to continue.',
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing orderId' },
        { status: 400 }
      )
    }

    await connectDB()
    const order = await Order.findById(orderId)

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.paymentStatus === 'completed') {
      return NextResponse.json(
        { success: false, error: 'Order is already paid' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const appUrl = getAppUrl()

    const lineItems = order.items.map((item: {
      name: string
      price: number
      quantity: number
      image?: string
    }) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: item.image ? [item.image.startsWith('http') ? item.image : `${appUrl}${item.image}`] : undefined,
        },
        // Stripe expects amounts in the smallest currency unit (paise for INR)
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Add tax as a separate line item when present
    if (order.tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'GST / Tax (18%)',
            images: undefined,
          },
          unit_amount: Math.round(order.tax * 100),
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: order.customerDetails.email,
      line_items: lineItems,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${order.orderNumber}`,
      cancel_url: `${appUrl}/checkout?canceled=1&orderId=${order._id}`,
      metadata: {
        orderId: String(order._id),
        orderNumber: order.orderNumber,
      },
      shipping_address_collection: undefined,
      phone_number_collection: {
        enabled: true,
      },
    })

    order.stripeSessionId = session.id
    order.paymentMethod = 'stripe'
    order.paymentStatus = 'pending'
    await order.save()

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Stripe checkout session error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create Stripe session',
      },
      { status: 500 }
    )
  }
}
