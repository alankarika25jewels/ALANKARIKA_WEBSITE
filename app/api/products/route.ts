import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import { uploadToCloudinary, getCloudinaryFolder } from '@/lib/cloudinary'

export async function GET() {
  try {
    await connectDB()
    
    const products = await Product.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const formData = await request.formData()
    
    // Extract text fields
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const keyFeaturesRaw = formData.get('keyFeatures') as string
    const keyFeatures = keyFeaturesRaw ? keyFeaturesRaw.split(',').map(f => f.trim()).filter(f => f) : []
    const price = parseFloat(formData.get('price') as string)
    const originalPrice = formData.get('originalPrice') ? parseFloat(formData.get('originalPrice') as string) : undefined
    const sizeConstraints = formData.get('sizeConstraints') as string
    const quantity = parseInt(formData.get('quantity') as string)
    const category = formData.get('category') as string
    
    // Debug logging
    console.log('Received form data:', {
      name,
      description,
      keyFeaturesRaw,
      keyFeatures,
      price,
      originalPrice,
      sizeConstraints,
      quantity,
      category
    })
    
    // Validate required fields
    if (!name || !description || !keyFeatures.length || !price || !quantity || !category) {
      const missingFields = []
      if (!name) missingFields.push('name')
      if (!description) missingFields.push('description')
      if (!keyFeatures.length) missingFields.push('keyFeatures')
      if (!price) missingFields.push('price')
      if (!quantity) missingFields.push('quantity')
      if (!category) missingFields.push('category')
      
      console.log('Validation failed - missing fields:', missingFields)
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          details: {
            name: !!name,
            description: !!description,
            keyFeatures: keyFeatures.length,
            price: !!price,
            quantity: !!quantity,
            category: !!category
          }
        },
        { status: 400 }
      )
    }
    
    // Handle image uploads with organized folder structure
    const imageFiles = formData.getAll('images') as File[]
    const uploadedImages = []
    
    for (const imageFile of imageFiles) {
      if (imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Use organized folder structure
        const folder = getCloudinaryFolder('products')
        const result = await uploadToCloudinary(buffer, folder, 'image')
        uploadedImages.push(result)
      }
    }
    
    // Handle video uploads with organized folder structure
    const videoFiles = formData.getAll('videos') as File[]
    const uploadedVideos = []
    
    for (const videoFile of videoFiles) {
      if (videoFile.size > 0) {
        const bytes = await videoFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Use organized folder structure
        const folder = getCloudinaryFolder('products')
        const result = await uploadToCloudinary(buffer, folder, 'video')
        uploadedVideos.push(result)
      }
    }
    
    // Create product
    const product = new Product({
      name,
      description,
      keyFeatures,
      price,
      originalPrice,
      sizeConstraints: sizeConstraints || undefined,
      quantity,
      category,
      images: uploadedImages,
      videos: uploadedVideos
    })
    
    await product.save()
    
    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
