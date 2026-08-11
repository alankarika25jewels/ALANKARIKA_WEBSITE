"use client"

import { useCart, CartItem } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, User, Lock, Mail, Gift } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOrders, CreateOrderData } from "@/hooks/useOrders"
import { toast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PhoneInput from "@/components/phone-input"
import { clearBuyNowItem, computeShippingFee, loadBuyNowItem } from "@/lib/buy-now"
import type { StoreSettings } from "@/lib/store-settings"
import { DEFAULT_SETTINGS } from "@/lib/store-settings"

/** Reliably load Razorpay checkout.js (handles already-injected script tags). */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }

    if (typeof window.Razorpay === 'function') {
      resolve(true)
      return
    }

    const SRC = 'https://checkout.razorpay.com/v1/checkout.js'
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`)

    const waitForRazorpay = (attemptsLeft: number) => {
      if (typeof window.Razorpay === 'function') {
        resolve(true)
        return
      }
      if (attemptsLeft <= 0) {
        resolve(false)
        return
      }
      setTimeout(() => waitForRazorpay(attemptsLeft - 1), 100)
    }

    if (existing) {
      waitForRazorpay(50)
      return
    }

    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.onload = () => waitForRazorpay(20)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const { user, isAuthenticated, requireAuth, refreshUser } = useAuth()
  const { createOrder } = useOrders()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isBuyNow = searchParams.get('mode') === 'buynow'
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null)
  const [buyNowReady, setBuyNowReady] = useState(!isBuyNow)
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const openingRazorpay = useRef(false)
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS)
  const [isGift, setIsGift] = useState(false)
  const [giftMessage, setGiftMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'razorpay'
  })

  // Authentication modal (fallback if not logged in)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [authLoading, setAuthLoading] = useState(false)
  const [stripeReady, setStripeReady] = useState(false)
  const [razorpayReady, setRazorpayReady] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      setShowAuthModal(false)
      setFormData(prev => ({
        ...prev,
        firstName: user?.firstName || prev.firstName,
        lastName: user?.lastName || prev.lastName,
        email: user?.email || prev.email,
        phone: user?.phone || prev.phone,
      }))
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setSettings(data.data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem('cartGift')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setIsGift(Boolean(parsed.isGift))
        setGiftMessage(parsed.giftMessage || '')
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('cartGift', JSON.stringify({ isGift, giftMessage }))
  }, [isGift, giftMessage])

  // Buy Now: load only that item (do not merge into cart)
  useEffect(() => {
    if (!isBuyNow) {
      setBuyNowReady(true)
      return
    }
    const item = loadBuyNowItem()
    if (!item) {
      toast({
        title: "No product selected",
        description: "Please choose a product again.",
        variant: "destructive",
      })
      router.push('/products')
      return
    }
    setBuyNowItem(item)
    setBuyNowReady(true)
  }, [isBuyNow, router])

  // Preload Razorpay script + check keys (localhost is fine — no live domain needed)
  useEffect(() => {
    fetch('/api/stripe/create-checkout-session')
      .then((res) => res.json())
      .then((data) => setStripeReady(Boolean(data.configured)))
      .catch(() => setStripeReady(false))

    fetch('/api/create-order')
      .then((res) => res.json())
      .then((data) => setRazorpayReady(Boolean(data.configured)))
      .catch(() => setRazorpayReady(false))

    loadRazorpayScript()
  }, [])

  useEffect(() => {
    if (searchParams.get('canceled') === '1') {
      toast({
        title: "Payment Canceled",
        description: "Your Stripe checkout was canceled. You can try again when ready.",
        variant: "destructive",
      })
    }
  }, [searchParams])

  const checkoutItems = useMemo(() => {
    if (isBuyNow && buyNowItem) return [buyNowItem]
    return state.items
  }, [isBuyNow, buyNowItem, state.items])

  const subtotal = useMemo(
    () => checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [checkoutItems]
  )
  const itemCount = useMemo(
    () => checkoutItems.reduce((sum, item) => sum + item.quantity, 0),
    [checkoutItems]
  )
  const shipping = useMemo(
    () => computeShippingFee(subtotal, settings.shippingFee, settings.freeShippingThreshold),
    [subtotal, settings.shippingFee, settings.freeShippingThreshold]
  )
  const giftFee = isGift && settings.giftEnabled ? settings.giftFee : 0
  const tax = subtotal * (settings.taxRate || 0.18)
  const total = subtotal + shipping + giftFee + tax

  const openRazorpayCheckout = async (order: { _id: string; orderNumber: string; total: number }) => {
    if (openingRazorpay.current) return false
    openingRazorpay.current = true

    try {
      const scriptOk = await loadRazorpayScript()
      if (!scriptOk || typeof window.Razorpay !== 'function') {
        toast({
          title: "Payment Unavailable",
          description: "Could not load Razorpay. Disable ad-block for localhost, then refresh.",
          variant: "destructive",
        })
        return false
      }

      const payableTotal = Number(order.total)
      const amountInPaise = Math.round(payableTotal * 100)

      if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
        toast({
          title: "Invalid Amount",
          description: `Cannot charge ₹${payableTotal}. Minimum is ₹1.`,
          variant: "destructive",
        })
        return false
      }

      // Create Razorpay order first, then open popup immediately
      const createRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: String(order.orderNumber || `rcpt_${Date.now()}`).slice(0, 40),
          orderId: order._id,
        }),
      })
      const createData = await createRes.json()

      if (!createRes.ok || !createData.order_id || !createData.key) {
        toast({
          title: "Payment Setup Failed",
          description: createData.error || "Could not create Razorpay order. Restart npm run dev.",
          variant: "destructive",
        })
        setRazorpayReady(false)
        return false
      }

      setRazorpayReady(true)

      return await new Promise<boolean>((resolve) => {
        let settled = false
        const finish = (value: boolean) => {
          if (settled) return
          settled = true
          resolve(value)
        }

        const options = {
          key: createData.key as string,
          amount: Number(createData.amount),
          currency: (createData.currency as string) || 'INR',
          name: 'The Alankarika Jewels',
          description: `Order #${order.orderNumber}`,
          image: '/logo/alankarika-newlogo.jpeg',
          order_id: createData.order_id as string,
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            contact: formData.phone.replace(/\s+/g, ''),
          },
          notes: {
            orderId: String(order._id),
            orderNumber: String(order.orderNumber),
          },
          theme: { color: '#8B7355' },
          handler: async (response: {
            razorpay_payment_id: string
            razorpay_order_id: string
            razorpay_signature: string
          }) => {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...response,
                  orderId: order._id,
                }),
              })
              const verifyData = await verifyRes.json()

              if (!verifyRes.ok || !verifyData.success) {
                toast({
                  title: "Payment Verification Failed",
                  description: verifyData.error || "Payment could not be verified.",
                  variant: "destructive",
                })
                finish(false)
                return
              }

              toast({
                title: "Payment Successful!",
                description: `Order #${order.orderNumber} has been paid.`,
              })
              if (isBuyNow) {
                clearBuyNowItem()
              } else {
                clearCart()
              }
              sessionStorage.removeItem('cartGift')
              finish(true)
              router.push(`/checkout/success?order=${order.orderNumber}`)
            } catch (error) {
              console.error('Verify payment error:', error)
              toast({
                title: "Verification Error",
                description: "Payment may have succeeded but verification failed. Contact support.",
                variant: "destructive",
              })
              finish(false)
            }
          },
          modal: {
            ondismiss: () => {
              toast({
                title: "Payment Cancelled",
                description: "You closed the Razorpay window. Order stays pending until you pay.",
                variant: "destructive",
              })
              finish(false)
            },
          },
        }

        try {
          const rzp = new window.Razorpay(options)
          rzp.on('payment.failed', (response) => {
            toast({
              title: "Payment Failed",
              description: response.error?.description || response.error?.reason || "Payment failed. Try again.",
              variant: "destructive",
            })
            finish(false)
          })
          // Must call open() to show the card/UPI popup
          rzp.open()
        } catch (error) {
          console.error('Razorpay open error:', error)
          toast({
            title: "Could Not Open Payment",
            description: error instanceof Error ? error.message : "Failed to open Razorpay popup.",
            variant: "destructive",
          })
          finish(false)
        }
      })
    } catch (error) {
      console.error('openRazorpayCheckout error:', error)
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Something went wrong starting payment.",
        variant: "destructive",
      })
      return false
    } finally {
      openingRazorpay.current = false
    }
  }

  // Handle empty cart redirect (skip for Buy Now)
  useEffect(() => {
    if (!buyNowReady) return
    if (isBuyNow) return
    if (state.items.length === 0) {
      router.push('/cart')
    }
  }, [state.items.length, router, isBuyNow, buyNowReady])

  // Authentication functions
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(authData),
      })

      const data = await response.json()

      if (response.ok) {
        await refreshUser()
        setShowAuthModal(false)
        setFormData(prev => ({
          ...prev,
          firstName: data.data.firstName || '',
          lastName: data.data.lastName || '',
          email: data.data.email || ''
        }))
        toast({
          title: isLogin ? "Login Successful" : "Registration Successful",
          description: isLogin ? "Welcome back!" : "Account created successfully!",
        })
      } else {
        toast({
          title: "Authentication Failed",
          description: data.error || data.message || "Please try again",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleAuthInputChange = (field: string, value: string) => {
    setAuthData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Show loading state while checking cart / buy now
  if (!buyNowReady || (!isBuyNow && state.items.length === 0) || (isBuyNow && !buyNowItem)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
          <p className="text-gray-600">{isBuyNow ? 'Preparing checkout…' : 'Redirecting to cart…'}</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      // Validate current step before proceeding
      if (currentStep === 1) {
        const step1Fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
        const missingFields = step1Fields.filter(field => !formData[field as keyof typeof formData])

        if (missingFields.length > 0) {
          toast({
            title: "Missing Information",
            description: `Please fill in: ${missingFields.join(', ')}`,
            variant: "destructive",
          })
          return
        }
      }

      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    if (isProcessing) return
    setIsProcessing(true)

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    try {
      const selectedMethod =
        formData.paymentMethod === 'card' || formData.paymentMethod === 'upi'
          ? 'razorpay'
          : formData.paymentMethod

      const orderTotal = total

      const orderData: CreateOrderData = {
        userId: user?._id,
        customerDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        items: checkoutItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        subtotal,
        shipping,
        giftFee,
        isGift: isGift && settings.giftEnabled,
        giftMessage: isGift ? giftMessage : '',
        tax,
        total: orderTotal,
        paymentMethod: selectedMethod as 'card' | 'upi' | 'cod' | 'stripe' | 'razorpay'
      }

      const order = await createOrder(orderData)
      const orderId = order._id || (order as { id?: string }).id

      if (!orderId) {
        throw new Error('Order was created but no order id was returned')
      }

      const finishLocalCart = () => {
        if (isBuyNow) {
          clearBuyNowItem()
        } else {
          clearCart()
        }
        sessionStorage.removeItem('cartGift')
      }

      // Razorpay — popup must open; success page ONLY after real payment
      if (selectedMethod === 'razorpay') {
        const paid = await openRazorpayCheckout({
          _id: String(orderId),
          orderNumber: order.orderNumber,
          total: Number(order.total) || orderTotal,
        })

        // Stay on checkout unless payment succeeded (handler redirects)
        if (!paid) return
        return
      }

      if (selectedMethod === 'stripe') {
        if (!stripeReady) {
          toast({
            title: "Stripe Not Configured",
            description: "Add Stripe keys in .env.local first.",
            variant: "destructive",
          })
          return
        }

        const stripeRes = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order._id }),
        })
        const stripeData = await stripeRes.json()

        if (!stripeRes.ok || !stripeData.url) {
          toast({
            title: "Payment Setup Failed",
            description: stripeData.error || "Could not start Stripe checkout.",
            variant: "destructive",
          })
          return
        }

        finishLocalCart()
        window.location.href = stripeData.url
        return
      }

      if (selectedMethod === 'cod') {
        toast({
          title: "Order Placed Successfully!",
          description: `Order #${order.orderNumber} created (Cash on Delivery).`,
        })
        finishLocalCart()
        router.push(`/checkout/success?order=${order.orderNumber}`)
        return
      }

      toast({
        title: "Select a Payment Method",
        description: "Please choose Razorpay or Cash on Delivery.",
        variant: "destructive",
      })
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Error Placing Order",
        description: error instanceof Error ? error.message : "There was an error placing your order.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handlePlaceOrder()
  }

  // Show authentication modal if not authenticated
  if (showAuthModal && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Top spacing to prevent navbar overlap */}
        <div className="h-20"></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-[#8B7355] rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Sign In to Continue' : 'Create Account'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {isLogin
                    ? 'Please sign in to proceed with your order'
                    : 'Create an account to complete your purchase'
                  }
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={authData.firstName}
                          onChange={(e) => handleAuthInputChange('firstName', e.target.value)}
                          required={!isLogin}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={authData.lastName}
                          onChange={(e) => handleAuthInputChange('lastName', e.target.value)}
                          required={!isLogin}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="auth-phone">Mobile Number</Label>
                      <div className="mt-1">
                        <PhoneInput
                          id="auth-phone"
                          value={authData.phone}
                          onChange={(full) => handleAuthInputChange('phone', full)}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authData.email}
                    onChange={(e) => handleAuthInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authData.password}
                    onChange={(e) => handleAuthInputChange('password', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={authData.confirmPassword}
                      onChange={(e) => handleAuthInputChange('confirmPassword', e.target.value)}
                      required={!isLogin}
                      className="mt-1"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#8B7355] hover:bg-[#D4AF37] text-white"
                  disabled={authLoading}
                >
                  {authLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#8B7355] hover:text-[#D4AF37] text-sm font-medium"
                >
                  {isLogin
                    ? "Don't have an account? Create one"
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-[#8B7355] hover:text-[#6F5B43] mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-4xl font-light text-gray-900">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center max-w-lg mx-auto">
              {[
                { n: 1, label: 'Shipping' },
                { n: 2, label: 'Payment' },
                { n: 3, label: 'Review' },
              ].map((step, idx, arr) => (
                <div key={step.n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center min-w-[72px]">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors ${
                        currentStep > step.n
                          ? 'bg-[#8B7355] border-[#8B7355] text-white'
                          : currentStep === step.n
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-white shadow-md'
                            : 'bg-[#F5EEDC] border-[#C4A484]/50 text-[#8B7355]'
                      }`}
                    >
                      {currentStep > step.n ? <CheckCircle className="w-5 h-5" /> : step.n}
                    </div>
                    <span
                      className={`mt-2 text-xs sm:text-sm ${
                        currentStep >= step.n ? 'text-[#8B7355] font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 mb-6 rounded-full ${
                        currentStep > step.n ? 'bg-[#8B7355]' : 'bg-[#E8DFD0]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <PhoneInput
                          id="phone"
                          value={formData.phone}
                          onChange={(full) => handleInputChange('phone', full)}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="Maharashtra"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="400001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="flex h-10 w-full rounded-md border border-[#E8DFD0] bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#C4A484] focus:ring-offset-2"
                          required
                        >
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="border border-[#E8DFD0] rounded-lg p-4 bg-[#FDFBF7]">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            id="razorpay"
                            name="paymentMethod"
                            value="razorpay"
                            checked={formData.paymentMethod === 'razorpay' || formData.paymentMethod === 'card'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="accent-[#8B7355]"
                          />
                          <Label htmlFor="razorpay" className="flex items-center space-x-2 cursor-pointer">
                            <CreditCard className="w-5 h-5 text-[#8B7355]" />
                            <span>Pay Online with Razorpay (Card / UPI / Wallet)</span>
                          </Label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 ml-7">
                          Secure payment via Razorpay. You can pay with card, UPI, or wallet when you place the order.
                        </p>
                      </div>

                      {stripeReady && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id="stripe"
                              name="paymentMethod"
                              value="stripe"
                              checked={formData.paymentMethod === 'stripe'}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="accent-[#8B7355]"
                            />
                            <Label htmlFor="stripe" className="flex items-center space-x-2 cursor-pointer">
                              <CreditCard className="w-5 h-5" />
                              <span>Pay with Stripe</span>
                            </Label>
                          </div>
                        </div>
                      )}

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="accent-[#8B7355]"
                          />
                          <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      By placing an order you agree to our{' '}
                      <Link href="/terms" className="underline text-[#8B7355]">Terms & Conditions</Link>,{' '}
                      <Link href="/privacy" className="underline text-[#8B7355]">Privacy Policy</Link>, and{' '}
                      <Link href="/return-policy" className="underline text-[#8B7355]">Refund Policy</Link>.
                    </p>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Review</h2>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                        <p className="text-gray-600">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                        <p className="text-gray-600 capitalize">{formData.paymentMethod}</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                        <div className="space-y-2">
                          {checkoutItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {settings.giftEnabled && (
                        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="checkout-gift"
                              checked={isGift}
                              onCheckedChange={(checked) => setIsGift(checked === true)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label htmlFor="checkout-gift" className="flex items-center gap-2 font-medium cursor-pointer">
                                <Gift className="w-4 h-4 text-[#8B7355]" />
                                Send as Gift
                                {settings.giftFee > 0 && (
                                  <span className="text-sm font-normal text-gray-500">(+₹{settings.giftFee.toFixed(2)})</span>
                                )}
                              </Label>
                              {isGift && (
                                <Textarea
                                  className="mt-3"
                                  placeholder="Write a gift message..."
                                  value={giftMessage}
                                  onChange={(e) => setGiftMessage(e.target.value)}
                                  maxLength={500}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={handlePrevStep}>
                      Previous
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button onClick={handleNextStep} className="ml-auto bg-[#8B7355] hover:bg-[#6F5B43] text-white">
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="ml-auto bg-[#8B7355] hover:bg-[#6F5B43] text-white"
                    >
                      {isProcessing ? 'Opening Razorpay…' : 'Place Order & Pay'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {isBuyNow && (
                    <p className="text-xs text-[#8B7355] bg-[#F5EEDC] rounded-md px-3 py-2">
                      Buy Now — checking out this item only (cart unchanged)
                    </p>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {isGift && settings.giftEnabled && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gift wrapping</span>
                      <span className="font-medium">₹{giftFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax ({Math.round((settings.taxRate || 0.18) * 100)}%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="select-none">
                      {shipping === 0 ? 'Free standard shipping' : `Shipping ₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-[#8B7355]" />
                    <span className="select-none">Secure payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="select-none">30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
