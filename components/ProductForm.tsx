"use client"

import { useState, useRef } from 'react'
import { X, Plus, Upload, Trash2, Image as ImageIcon, Video } from 'lucide-react'
import { CreateProductData, UpdateProductData, Product } from '@/hooks/useProducts'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateProductData | UpdateProductData) => Promise<void>
  product?: Product | null
  mode: 'create' | 'edit'
}

export default function ProductForm({ isOpen, onClose, onSubmit, product, mode }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: String(product?.name || ''),
    description: String(product?.description || ''),
    keyFeatures: product?.keyFeatures || [''],
    price: String(product?.price || ''),
    originalPrice: String(product?.originalPrice || ''),
    sizeConstraints: String(product?.sizeConstraints || ''),
    quantity: String(product?.quantity || ''),
    category: String(product?.category || 'Rings')
  })

  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState(product?.images || [])
  const [existingVideos, setExistingVideos] = useState(product?.videos || [])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [videosToDelete, setVideosToDelete] = useState<string[]>([])

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Anklets']

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleKeyFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.keyFeatures]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, keyFeatures: newFeatures }))
  }

  const addKeyFeature = () => {
    setFormData(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }))
  }

  const removeKeyFeature = (index: number) => {
    if (formData.keyFeatures.length > 1) {
      const newFeatures = formData.keyFeatures.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, keyFeatures: newFeatures }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setImages(prev => [...prev, ...files])
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setVideos(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (publicId: string) => {
    setImagesToDelete(prev => [...prev, publicId])
    setExistingImages(prev => prev.filter(img => img.publicId !== publicId))
  }

  const removeExistingVideo = (publicId: string) => {
    setVideosToDelete(prev => [...prev, publicId])
    setExistingVideos(prev => prev.filter(vid => vid.publicId !== publicId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate key features - ensure at least one non-empty feature
    const validKeyFeatures = formData.keyFeatures.filter(f => f.trim()).length
    if (validKeyFeatures === 0) {
      alert('Please add at least one key feature for the product.')
      return
    }

    if (mode === 'create') {
      const createData: CreateProductData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        keyFeatures: formData.keyFeatures.filter(f => f.trim()),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        sizeConstraints: formData.sizeConstraints.trim() || undefined,
        quantity: parseInt(formData.quantity),
        category: formData.category,
        images,
        videos
      }
      await onSubmit(createData)
    } else {
      const updateData: UpdateProductData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        keyFeatures: formData.keyFeatures.filter(f => f.trim()),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        sizeConstraints: formData.sizeConstraints.trim() || undefined,
        quantity: parseInt(formData.quantity),
        category: formData.category,
        images: images.length > 0 ? images : undefined,
        videos: videos.length > 0 ? videos : undefined,
        imagesToDelete: imagesToDelete.length > 0 ? imagesToDelete : undefined,
        videosToDelete: videosToDelete.length > 0 ? videosToDelete : undefined
      }
      await onSubmit(updateData)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      keyFeatures: [''],
      price: '',
      originalPrice: '',
      sizeConstraints: '',
      quantity: '',
      category: 'Rings'
    })
    setImages([])
    setVideos([])
    setExistingImages([])
    setExistingVideos([])
    setImagesToDelete([])
    setVideosToDelete([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Add New Product' : 'Edit Product'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Key Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Features *
            </label>
            <div className="space-y-2">
              {formData.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Key feature ${index + 1}`}
                    required
                  />
                  {formData.keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyFeature(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyFeature}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Key Feature</span>
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Available *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          {/* Size Constraints */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size Constraints
            </label>
            <input
              type="text"
              value={formData.sizeConstraints}
              onChange={(e) => handleInputChange('sizeConstraints', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Available in sizes 6-12, Adjustable"
            />
          </div>

          {/* Media Uploads */}
          <div className="space-y-6">
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(image.publicId)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex flex-col items-center space-y-2 text-gray-600 hover:text-gray-800"
                >
                  <Upload className="w-8 h-8" />
                  <span>Click to upload images</span>
                  <span className="text-sm">JPG, PNG, WebP up to 10MB each</span>
                </button>
              </div>

              {/* Selected Images Preview */}
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Selected Images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Videos
              </label>
              
              {/* Existing Videos */}
              {existingVideos.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Existing Videos:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingVideos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video
                          src={video.url}
                          className="w-full h-24 object-cover rounded-lg"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingVideo(video.publicId)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Videos */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={videoInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="flex flex-col items-center space-y-2 text-gray-600 hover:text-gray-800"
                >
                  <Video className="w-8 h-8" />
                  <span>Click to upload videos</span>
                  <span className="text-sm">MP4, MOV, AVI up to 100MB each</span>
                </button>
              </div>

              {/* Selected Videos Preview */}
              {videos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Selected Videos:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video
                          src={URL.createObjectURL(video)}
                          className="w-full h-24 object-cover rounded-lg"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => {
                resetForm()
                onClose()
              }}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {mode === 'create' ? 'Create Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
