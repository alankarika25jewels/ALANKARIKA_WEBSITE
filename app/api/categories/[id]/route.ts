import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/lib/models/Category'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await params
        const body = await request.json()
        const category = await Category.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        })
        if (!category) {
            return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: category })
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'Category name already exists' }, { status: 400 })
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await params
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
        }
        return NextResponse.json({ success: true, message: 'Category deleted' })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
