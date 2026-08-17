import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    title: { type: String, trim: true, default: '' },
    link: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema)
