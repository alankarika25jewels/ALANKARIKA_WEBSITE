import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Settings from '@/lib/models/Settings'
import { getAuthFromRequest } from '@/lib/auth'
import { DEFAULT_SETTINGS } from '@/lib/store-settings'

async function getOrCreateSettings() {
  let doc = await Settings.findOne({ key: 'store' })
  if (!doc) {
    doc = await Settings.create({ key: 'store', ...DEFAULT_SETTINGS })
  }
  return doc
}

export async function GET() {
  try {
    await connectDB()
    const doc = await getOrCreateSettings()
    return NextResponse.json({
      success: true,
      data: {
        shippingFee: doc.shippingFee ?? 0,
        freeShippingThreshold: doc.freeShippingThreshold ?? 0,
        giftEnabled: doc.giftEnabled !== false,
        giftFee: doc.giftFee ?? 0,
        taxRate: doc.taxRate ?? 0.18,
      },
    })
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load settings', data: DEFAULT_SETTINGS },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = getAuthFromRequest(request)
    const isDashboard = request.headers.get('x-dashboard-admin') === 'true'
    if (!auth && !isDashboard) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    const update = {
      shippingFee: Math.max(0, Number(body.shippingFee) || 0),
      freeShippingThreshold: Math.max(0, Number(body.freeShippingThreshold) || 0),
      giftEnabled: body.giftEnabled !== false,
      giftFee: Math.max(0, Number(body.giftFee) || 0),
      taxRate: Math.min(1, Math.max(0, Number(body.taxRate) || 0.18)),
    }

    const doc = await Settings.findOneAndUpdate(
      { key: 'store' },
      { $set: update },
      { upsert: true, new: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Settings saved',
      data: {
        shippingFee: doc.shippingFee,
        freeShippingThreshold: doc.freeShippingThreshold,
        giftEnabled: doc.giftEnabled,
        giftFee: doc.giftFee,
        taxRate: doc.taxRate,
      },
    })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 })
  }
}
