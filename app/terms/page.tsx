"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BookOpen } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24 bg-[#8B7355]" />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-4 border-b pb-4">Terms &amp; Conditions</h1>
        <p className="text-gray-500 mb-12">Effective Date: January 20, 2025 · Last updated: August 1, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-2xl font-semibold m-0">Agreement to Terms</h2>
            </div>
            <p>
              By accessing or purchasing from Alankarika, you agree to these Terms &amp; Conditions. If you do not agree,
              please do not use our website or place an order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility</h2>
            <p>
              You must be at least 18 years of age, or shopping under the supervision of a parent or legal guardian, to
              place an order on Alankarika.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products &amp; Pricing</h2>
            <p>
              We aim for accurate product descriptions, images, and prices. Prices are listed in Indian Rupees (INR)
              unless stated otherwise and may include applicable taxes as shown at checkout. We reserve the right to
              correct errors and cancel orders placed at an incorrect price.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Orders &amp; Acceptance</h2>
            <p>
              An order confirmation email does not guarantee acceptance. Alankarika may accept, decline, or cancel an
              order due to stock availability, suspected fraud, pricing errors, or other valid reasons. If payment was
              collected for a canceled order, a refund will be issued to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payments</h2>
            <p>
              We accept online card payments via Stripe, and other methods shown at checkout (such as UPI or Cash on
              Delivery where available). You agree to provide accurate billing and shipping information. Unauthorized
              chargebacks or fraudulent activity may result in account restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping, Returns &amp; Refunds</h2>
            <p>
              Delivery timelines and shipping rules are described in our{' '}
              <Link href="/shipping-policy" className="text-[#8B7355] underline">Shipping Policy</Link>.
              Returns and refunds follow our{' '}
              <Link href="/return-policy" className="text-[#8B7355] underline">Refund &amp; Return Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p>
              All content on this website—including logos, product images, text, and designs—belongs to Alankarika or
              its licensors and may not be copied or used without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Alankarika is not liable for indirect, incidental, or consequential
              damages arising from use of the website or products, except where liability cannot be excluded under
              Indian consumer protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the
              courts in Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p>
              Questions about these terms: <strong>alankarikajewels1225@gmail.com</strong> · <strong>+91 9076055755</strong>
              <br />
              Shop No 45 KE Zozwala Complex, Mohammed Ali chowk station road, Kalyan West 421301.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
