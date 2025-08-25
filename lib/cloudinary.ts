import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export const uploadToCloudinary = async (file: Buffer, folder: string, resourceType: 'image' | 'video' = 'image') => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `alankarika/${folder}`,
          resource_type: resourceType,
          allowed_formats: resourceType === 'image' 
            ? ['jpg', 'jpeg', 'png', 'webp'] 
            : ['mp4', 'mov', 'avi', 'mkv'],
          transformation: resourceType === 'image' ? [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )

      uploadStream.end(file)
    })

    return {
      url: (result as any).secure_url,
      publicId: (result as any).public_id
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload file to Cloudinary')
  }
}

export const deleteFromCloudinary = async (publicId: string, resourceType: 'image' | 'video' = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete file from Cloudinary')
  }
}

// Helper function to get organized folder structure
export const getCloudinaryFolder = (type: 'products' | 'banners' | 'thumbnails' | 'categories', category?: string) => {
  if (type === 'categories' && category) {
    return `alankarika/categories/${category.toLowerCase()}`
  }
  return `alankarika/${type}`
}
