import Razorpay from 'razorpay'
import crypto from 'crypto'

export function isRazorpayConfigured(): boolean {
  return Boolean(
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET &&
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  )
}

export function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials are not configured')
  }

  return new Razorpay({
    key_id,
    key_secret,
  })
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) return false

  const body = `${orderId}|${paymentId}`
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex')

  return expected === signature
}
