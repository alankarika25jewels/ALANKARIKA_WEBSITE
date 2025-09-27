"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, User, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOrders, CreateOrderData } from "@/hooks/useOrders"
import { toast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const { state, clearCart, addItem, updateQuantity } = useCart()
  const { createOrder } = useOrders()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
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
    paymentMethod: 'card'
  })

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [authLoading, setAuthLoading] = useState(false)

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        })
        if (response.ok) {
          const userData = await response.json()
          setIsAuthenticated(true)
          setFormData(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || ''
          }))
        } else {
          setShowAuthModal(true)
        }
      } catch (error) {
        // User is not authenticated, show auth modal
        setShowAuthModal(true)
      }
    }

    checkAuth()
  }, [])

  // Handle direct product purchase from Buy Now button
  useEffect(() => {
    const productId = searchParams.get('product')
    const quantity = parseInt(searchParams.get('quantity') || '1')
    
    if (productId && state.items.length === 0) {
      // Fetch product details and add to cart
      const fetchAndAddProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`)
          const data = await response.json()
          
          if (data.success && data.data) {
            const product = data.data
            addItem({
              id: product._id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
              category: product.category,
              brand: "JEWELS BY LAHARI"
            })
            
            // Set the quantity if it's not 1
            if (quantity > 1) {
              setTimeout(() => {
                updateQuantity(product._id, quantity)
              }, 100)
            }
          }
        } catch (error) {
          console.error('Failed to fetch product:', error)
          router.push('/cart')
        }
      }
      
      fetchAndAddProduct()
    }
  }, [searchParams, state.items.length, addItem, router])

  // Handle empty cart redirect on client side
  useEffect(() => {
    if (state.items.length === 0 && !searchParams.get('product')) {
      router.push('/cart')
    }
  }, [state.items.length, router, searchParams])

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
        body: JSON.stringify(authData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setShowAuthModal(false)
        setFormData(prev => ({
          ...prev,
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || ''
        }))
        toast({
          title: isLogin ? "Login Successful" : "Registration Successful",
          description: isLogin ? "Welcome back!" : "Account created successfully!",
        })
      } else {
        toast({
          title: "Authentication Failed",
          description: data.message || "Please try again",
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

  // Debug form data changes
  useEffect(() => {
    console.log('Form data changed:', formData)
  }, [formData])

  // Show loading state while checking cart
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to cart...</p>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    console.log('Form data before submission:', formData)
    console.log('Current step:', currentStep)
    
    // Validate form data
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }
    
    try {
      // Prepare order data
      const orderData: CreateOrderData = {
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
        items: state.items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        subtotal: state.total,
        tax: state.total * 0.18,
        total: state.total + (state.total * 0.18),
        paymentMethod: formData.paymentMethod as 'card' | 'upi' | 'cod'
      }

      console.log('Submitting order data:', JSON.stringify(orderData, null, 2))
      console.log('Cart items:', state.items)
      console.log('Customer details:', orderData.customerDetails)

      // Create order in database
      const order = await createOrder(orderData)
      
      console.log('Order created successfully:', order)
      
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.orderNumber} has been created.`,
      })
      
      // Clear cart and redirect to success page
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Error Placing Order",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const total = state.total + (state.total * 0.18) // Including tax

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
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-light text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className={`text-sm ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Shipping
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Payment
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Review
            </span>
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
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-blue-600"
                        />
                        <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-5 h-5" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-blue-600"
                        />
                        <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-blue-600"
                        />
                        <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                      </div>
                    </div>
                  </div>
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
                        {state.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                  <Button onClick={handleNextStep} className="ml-auto">
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isProcessing}
                    className="ml-auto bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">₹{state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">₹{(state.total * 0.18).toFixed(2)}</span>
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
                  <span className="select-none">Free standard shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-600" />
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
