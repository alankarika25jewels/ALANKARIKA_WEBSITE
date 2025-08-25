import { useState, useEffect } from 'react'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export interface CustomerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  _id: string
  orderNumber: string
  customerDetails: CustomerDetails
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: 'card' | 'upi' | 'cod'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingStatus: 'pending' | 'shipped' | 'delivered'
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderData {
  customerDetails: CustomerDetails
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: 'card' | 'upi' | 'cod'
}

export interface UpdateOrderData {
  orderStatus?: Order['orderStatus']
  paymentStatus?: Order['paymentStatus']
  shippingStatus?: Order['shippingStatus']
  trackingNumber?: string
  notes?: string
}

export interface OrdersResponse {
  orders: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('useOrders: Creating order with data:', JSON.stringify(orderData, null, 2))
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      console.log('useOrders: API response status:', response.status)
      console.log('useOrders: API response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorData = await response.json()
        console.error('useOrders: API error response:', errorData)
        throw new Error(errorData.error || 'Failed to create order')
      }

      const data = await response.json()
      console.log('useOrders: API success response:', data)
      return data.order
    } catch (err) {
      console.error('useOrders: Error in createOrder:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      
      const searchParams = new URLSearchParams()
      if (params?.page) searchParams.append('page', params.page.toString())
      if (params?.limit) searchParams.append('limit', params.limit.toString())
      if (params?.status) searchParams.append('status', params.status)
      if (params?.search) searchParams.append('search', params.search)

      const response = await fetch(`/api/orders?${searchParams.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch orders')
      }

      const data: OrdersResponse = await response.json()
      setOrders(data.orders)
      setPagination(data.pagination)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateOrder = async (orderId: string, updateData: UpdateOrderData): Promise<Order> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update order')
      }

      const data = await response.json()
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? data.order : order
        )
      )
      
      return data.order
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update order'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchOrder = async (orderId: string): Promise<Order> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/orders/${orderId}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch order')
      }

      const order = await response.json()
      return order
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders()
  }, [])

  return {
    orders,
    loading,
    error,
    pagination,
    createOrder,
    fetchOrders,
    updateOrder,
    fetchOrder,
  }
}
