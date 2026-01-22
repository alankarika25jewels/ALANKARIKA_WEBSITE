import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/lib/models/Category'

export async function GET() {
    try {
        await connectDB()
        const categories = await Category.find({}).sort({ name: 1 })
        return NextResponse.json({ success: true, data: categories })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const category = await Category.create(body)
        return NextResponse.json({ success: true, data: category }, { status: 201 })
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'Category already exists' }, { status: 400 })
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
