"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Truck } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24 bg-[#8B7355]" />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-4 border-b pb-4">Shipping Policy</h1>
        <p className="text-gray-500 mb-12">Effective Date: January 20, 2025 · Last updated: August 1, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
              <Truck className="w-6 h-6" />
              <h2 className="text-2xl font-semibold m-0">Delivery Overview</h2>
            </div>
            <p>
              Alankarika ships jewelry orders across India. Shipping timelines begin after order confirmation and
              successful payment (for prepaid orders).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Time</h2>
            <p>
              Orders are typically processed within 24–48 hours on business days (Monday–Saturday). Orders placed on
              Sundays or public holidays are processed on the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery Time</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Metro cities:</strong> usually 3–5 business days after dispatch.</li>
              <li><strong>Other locations:</strong> usually 5–7 business days after dispatch.</li>
              <li>Remote areas may take longer depending on courier coverage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Charges</h2>
            <p>
              Standard shipping within India is currently free on eligible orders unless otherwise stated at checkout.
              Any special shipping fees will be shown before you confirm payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
            <p>
              Once your order ships, we share tracking details by email/SMS where available. You can also contact
              support with your order number for status updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Failed Delivery &amp; Address Issues</h2>
            <p>
              Please ensure your shipping address and phone number are accurate. Failed deliveries due to incorrect
              address, unreachable contact, or refusal of parcel may incur re-shipping charges or delay refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Damaged or Missing Packages</h2>
            <p>
              If your package arrives damaged or items are missing, contact us within 48 hours of delivery at{' '}
              <strong>alankarikajewels1225@gmail.com</strong> or <strong>+91 9076055755</strong> with photos and your
              order number. See also our{' '}
              <Link href="/return-policy" className="text-[#8B7355] underline">Refund &amp; Return Policy</Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
