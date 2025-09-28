/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint during builds for better code quality
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking during builds
  },
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
    unoptimized: true, // Keep this for Vercel compatibility
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'], // Externalize mongoose for better performance
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
}

export default nextConfig
