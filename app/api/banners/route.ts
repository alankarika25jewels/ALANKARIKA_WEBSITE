import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Banner from '@/lib/models/Banner'
import { uploadToCloudinary, deleteFromCloudinary, getCloudinaryFolder } from '@/lib/cloudinary'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const isAdmin = request.headers.get('x-dashboard-admin') === 'true'
    const query = isAdmin ? {} : { isActive: true }
    const banners = await Banner.find(query).sort({ order: 1, createdAt: 1 }).lean()
    const data = banners
      .filter((b) => b.image?.url)
      .map((b) => ({
        ...b,
        _id: String(b._id),
      }))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Banners GET error:', error)
    return NextResponse.json({ success: false, data: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = request.headers.get('x-dashboard-admin') === 'true'
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const title = (formData.get('title') as string) || ''
    const link = (formData.get('link') as string) || ''
    const order = parseInt((formData.get('order') as string) || '0', 10)

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ success: false, error: 'Banner image is required' }, { status: 400 })
    }

    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const folder = getCloudinaryFolder('banners')
    const uploaded = await uploadToCloudinary(buffer, folder, 'image', 'banner')

    const banner = await Banner.create({
      image: uploaded,
      title,
      link,
      order,
      isActive: true,
    })

    return NextResponse.json({ success: true, data: banner }, { status: 201 })
  } catch (error) {
    console.error('Banners POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to upload banner' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = request.headers.get('x-dashboard-admin') === 'true'
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const { banners } = body as { banners: Array<{ _id: string; order: number; isActive?: boolean }> }

    if (!Array.isArray(banners)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    await Promise.all(
      banners.map((b) =>
        Banner.findByIdAndUpdate(b._id, { order: b.order, isActive: b.isActive ?? true })
      )
    )

    const updated = await Banner.find().sort({ order: 1 }).lean()
    const data = updated
      .filter((b) => b.image?.url)
      .map((b) => ({
        ...b,
        _id: String(b._id),
      }))
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Banners PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to reorder banners' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = request.headers.get('x-dashboard-admin') === 'true'
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = new URL(request.url).searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Banner id required' }, { status: 400 })
    }

    await connectDB()
    const banner = await Banner.findById(id)
    if (!banner) {
      return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 })
    }

    if (banner.image?.publicId) {
      await deleteFromCloudinary(banner.image.publicId, 'image')
    }
    await Banner.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: 'Banner deleted' })
  } catch (error) {
    console.error('Banners DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete banner' }, { status: 500 })
  }
}
