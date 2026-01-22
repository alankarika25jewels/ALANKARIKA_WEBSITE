import { useState, useEffect } from 'react'

export interface Category {
    _id: string
    name: string
    subCategories: string[]
}

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/categories')
            const data = await response.json()
            if (data.success) {
                setCategories(data.data)
            } else {
                setError(data.error)
            }
        } catch (err) {
            setError('Failed to fetch categories')
        } finally {
            setLoading(false)
        }
    }

    const createCategory = async (name: string, subCategories: string[]) => {
        try {
            setLoading(true)
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subCategories })
            })
            const data = await response.json()
            if (data.success) {
                setCategories(prev => [...prev, data.data])
                return data.data
            } else {
                throw new Error(data.error)
            }
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updateCategory = async (id: string, name: string, subCategories: string[]) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subCategories })
            })
            const data = await response.json()
            if (data.success) {
                setCategories(prev => prev.map(c => c._id === id ? data.data : c))
                return data.data
            } else {
                throw new Error(data.error)
            }
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            if (data.success) {
                setCategories(prev => prev.filter(c => c._id !== id))
                return true
            } else {
                throw new Error(data.error)
            }
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}
