import { useState, useEffect } from 'react'

export interface Product {
  _id: string
  name: string
  description: string
  keyFeatures: string[]
  price: number
  originalPrice?: number
  offerPercentage?: number
  isOnSale: boolean
  sizeConstraints?: string
  quantity: number
  category: string
  images: Array<{ url: string; publicId: string }>
  videos: Array<{ url: string; publicId: string }>
  rating: number
  reviews: number
  isNew: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  name: string
  description: string
  keyFeatures: string[]
  price: number
  originalPrice?: number
  sizeConstraints?: string
  quantity: number
  category: string
  images: File[]
  videos: File[]
}

export interface UpdateProductData extends Partial<CreateProductData> {
  imagesToDelete?: string[]
  videosToDelete?: string[]
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
      } else {
        setError(data.error || 'Failed to fetch products')
      }
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new product
  const createProduct = async (productData: CreateProductData): Promise<Product | null> => {
    try {
      setLoading(true)
      setError(null)
      
      const formData = new FormData()
      
      // Add text fields
      formData.append('name', productData.name)
      formData.append('description', productData.description)
      formData.append('keyFeatures', productData.keyFeatures.join(','))
      formData.append('price', productData.price.toString())
      if (productData.originalPrice) {
        formData.append('originalPrice', productData.originalPrice.toString())
      }
      if (productData.sizeConstraints) {
        formData.append('sizeConstraints', productData.sizeConstraints)
      }
      formData.append('quantity', productData.quantity.toString())
      formData.append('category', productData.category)
      
      // Add image files
      productData.images.forEach((image, index) => {
        formData.append('images', image)
      })
      
      // Add video files
      productData.videos.forEach((video, index) => {
        formData.append('videos', video)
      })
      
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        const newProduct = data.data
        setProducts(prev => [newProduct, ...prev])
        return newProduct
      } else {
        setError(data.error || 'Failed to create product')
        return null
      }
    } catch (err) {
      setError('Failed to create product')
      console.error('Error creating product:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update product
  const updateProduct = async (id: string, productData: UpdateProductData): Promise<Product | null> => {
    try {
      setLoading(true)
      setError(null)
      
      const formData = new FormData()
      
      // Add text fields
      if (productData.name) formData.append('name', productData.name)
      if (productData.description) formData.append('description', productData.description)
      if (productData.keyFeatures) formData.append('keyFeatures', productData.keyFeatures.join(','))
      if (productData.price) formData.append('price', productData.price.toString())
      if (productData.originalPrice) formData.append('originalPrice', productData.originalPrice.toString())
      if (productData.sizeConstraints) formData.append('sizeConstraints', productData.sizeConstraints)
      if (productData.quantity) formData.append('quantity', productData.quantity.toString())
      if (productData.category) formData.append('category', productData.category)
      
      // Add new image files
      if (productData.images) {
        productData.images.forEach((image) => {
          formData.append('newImages', image)
        })
      }
      
      // Add new video files
      if (productData.videos) {
        productData.videos.forEach((video) => {
          formData.append('newVideos', video)
        })
      }
      
      // Add deletion lists
      if (productData.imagesToDelete) {
        formData.append('imagesToDelete', JSON.stringify(productData.imagesToDelete))
      }
      if (productData.videosToDelete) {
        formData.append('videosToDelete', JSON.stringify(productData.videosToDelete))
      }
      
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        const updatedProduct = data.data
        setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p))
        return updatedProduct
      } else {
        setError(data.error || 'Failed to update product')
        return null
      }
    } catch (err) {
      setError('Failed to update product')
      console.error('Error updating product:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Delete product
  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setProducts(prev => prev.filter(p => p._id !== id))
        return true
      } else {
        setError(data.error || 'Failed to delete product')
        return false
      }
    } catch (err) {
      setError('Failed to delete product')
      console.error('Error deleting product:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Get single product
  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()
      
      if (data.success) {
        return data.data
      } else {
        setError(data.error || 'Failed to fetch product')
        return null
      }
    } catch (err) {
      setError('Failed to fetch product')
      console.error('Error fetching product:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
  }
}

