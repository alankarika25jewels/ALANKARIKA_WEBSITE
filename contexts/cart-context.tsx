"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  category: string
  brand: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + (action.payload.price * action.payload.quantity),
          itemCount: state.itemCount + action.payload.quantity
        }
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + (action.payload.price * action.payload.quantity),
          itemCount: state.itemCount + action.payload.quantity
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload)
      if (!itemToRemove) return state
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id)
      if (!item) return state
      
      const quantityDiff = action.payload.quantity - item.quantity
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff
      }
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      }
    
    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        items: action.payload,
        total,
        itemCount
      }
    }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  })

  // Load cart from localStorage on mount (only on client-side)
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return
    
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes (only on client-side)
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return
    
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
