"use client"

import { Suspense } from "react"
import CheckoutSuccessContent from "./success-content"

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  )
}
