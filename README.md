# Alankarika - Premium Jewelry Website

A high-performance, modern jewelry e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Performance Optimizations

This website has been optimized for fast loading and excellent user experience:

### Key Performance Features

- **Lazy Loading**: Components and images load only when needed
- **Image Optimization**: WebP/AVIF formats with blur placeholders
- **Code Splitting**: Dynamic imports for better bundle size
- **Memoization**: Prevents unnecessary re-renders
- **Intersection Observer**: Efficient scroll-based loading
- **Performance Monitoring**: Real-time metrics tracking
- **SEO Optimized**: Meta tags, sitemap, and structured data

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Performance**: Custom optimization components
- **SEO**: Next.js built-in optimizations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aitik-official/Alankarika.git
   cd Alankarika
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Performance & Analysis
```bash
npm run analyze      # Analyze bundle size
npm run type-check   # TypeScript type checking
npm run performance-check  # Run Lighthouse audit
```

### Production
```bash
npm run build:prod   # Production build
npm run start:prod   # Production server
npm run optimize-images  # Generate sitemap
```

## 🎯 Performance Optimizations

### 1. Image Optimization
- Automatic WebP/AVIF conversion
- Lazy loading with blur placeholders
- Responsive image sizes
- Optimized loading strategies

### 2. Code Splitting
- Dynamic imports for components
- Route-based code splitting
- Bundle analysis tools

### 3. Caching Strategy
- Static generation where possible
- Incremental Static Regeneration
- Browser caching headers

### 4. Performance Monitoring
```bash
# Run performance audit
npm run performance-check

# Analyze bundle
npm run analyze
```

## 📊 Performance Monitoring

The website includes comprehensive performance monitoring:

### Real-time Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Performance Reports
Reports are generated in the `performance-reports/` directory with detailed analysis.

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme changes
- Update `app/globals.css` for custom styles
- Use CSS variables for consistent theming

### Components
- All components are in the `components/` directory
- Performance optimizers in `components/performance-optimizer.tsx`
- UI components in `components/ui/`

### Data
- Product data is in the main page component
- Images use optimized URLs with auto-format
- Categories and sections are easily configurable

## 🔧 Configuration

### Next.js Config
```javascript
// next.config.mjs
{
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    // ... more optimizations
  }
}
```

### Tailwind Config
```javascript
// tailwind.config.ts
{
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  }
}
```

## 📈 SEO & Performance

### SEO Features
- Meta tags optimization
- Open Graph tags
- Twitter Cards
- Structured data
- Sitemap generation
- Robots.txt

### Performance Features
- Image optimization
- Font optimization
- Code splitting
- Lazy loading
- Caching strategies
- Bundle optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Fast mobile performance

## 🔍 Performance Tips

### For Developers
1. Use the performance optimizer components
2. Implement lazy loading for heavy components
3. Optimize images before uploading
4. Monitor bundle size regularly
5. Use the performance monitoring tools

### For Content Managers
1. Optimize images (WebP format recommended)
2. Keep product descriptions concise
3. Use descriptive alt text for images
4. Regular performance audits

## 🐛 Troubleshooting

### Common Issues
1. **Slow loading**: Check image sizes and formats
2. **Build errors**: Ensure all dependencies are installed
3. **Performance issues**: Run performance audit
4. **TypeScript errors**: Run type checking

### Performance Issues
```bash
# Check bundle size
npm run analyze

# Run performance audit
npm run performance-check

# Check for type errors
npm run type-check
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test performance impact
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the performance reports
- Review the documentation

---

**Built with ❤️ for fast, beautiful jewelry websites** 