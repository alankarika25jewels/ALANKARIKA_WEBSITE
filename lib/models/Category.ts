import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    subCategories: [{
        type: String,
        trim: true,
        maxlength: [50, 'Sub-category name cannot exceed 50 characters']
    }]
}, {
    timestamps: true
})

// Force delete old model in development to ensure schema changes are picked up
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Category
}

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)
export default Category
