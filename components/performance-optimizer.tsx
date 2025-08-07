"use client"

import { useEffect, useRef, useState } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export function PerformanceOptimizer({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px' 
}: PerformanceOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  useEffect(() => {
    if (isVisible) {
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div ref={ref} className="performance-optimizer">
      {isVisible && isLoaded ? (
        <div className="animate-fade-in-up">
          {children}
        </div>
      ) : (
        <div className="image-loading h-80 w-full rounded-lg"></div>
      )}
    </div>
  )
}

interface ImageOptimizerProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ImageOptimizer({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false
}: ImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 image-loading ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}

interface VideoOptimizerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function VideoOptimizer({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true
}: VideoOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => setIsLoaded(true)
      video.addEventListener('canplay', handleCanPlay)
      
      return () => video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`absolute inset-0 image-loading ${className}`} />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
      />
    </div>
  )
}

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
}

export function LazyComponent({ 
  children, 
  fallback = <div className="image-loading h-32 w-full rounded-lg" />,
  threshold = 0.1 
}: LazyComponentProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref}>
      {shouldRender ? children : fallback}
    </div>
  )
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcp = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }))
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lcp = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, lcp: lcp.startTime }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fid = entries[entries.length - 1] as PerformanceEventTiming
        setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }))
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any
          if (!layoutShift.hadRecentInput) {
            cls += layoutShift.value
          }
        }
        setMetrics(prev => ({ ...prev, cls }))
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return metrics
}

// Preload hook for critical resources
export function usePreload(resources: string[]) {
  useEffect(() => {
    resources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = resource.endsWith('.css') ? 'style' : 
                resource.endsWith('.js') ? 'script' : 'image'
      document.head.appendChild(link)
    })
  }, [resources])
}

// Debounce hook for performance
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook for performance
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<number>(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
} 