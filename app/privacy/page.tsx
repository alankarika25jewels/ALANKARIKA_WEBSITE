"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Lock } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24 bg-[#8B7355]" />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-4 border-b pb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Effective Date: January 20, 2025 · Last updated: August 1, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
              <Lock className="w-6 h-6" />
              <h2 className="text-2xl font-semibold m-0">Overview</h2>
            </div>
            <p>
              Alankarika (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website and online store for jewelry products.
              This Privacy Policy explains how we collect, use, store, and protect your personal information when you
              browse or shop with us. By using our website, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account &amp; contact details:</strong> name, email address, phone number, and shipping address.</li>
              <li><strong>Order information:</strong> products purchased, amounts paid, and delivery preferences.</li>
              <li><strong>Payment data:</strong> payments are processed by Stripe. We do not store full card numbers on our servers.</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies for site performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and fulfill orders, including payment confirmation and shipping.</li>
              <li>To provide customer support and respond to inquiries.</li>
              <li>To send order updates and, with your consent, promotional offers.</li>
              <li>To prevent fraud, enforce our terms, and comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Processing</h2>
            <p>
              Online card payments are handled securely by Stripe. Stripe may collect payment details necessary to
              complete the transaction under their own privacy policy. Alankarika does not store your credit or debit
              card numbers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
            <p>
              We share personal data only with trusted service providers needed to run our business (payment processors,
              logistics partners, and hosting providers), or when required by law. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data by contacting us. You may also opt
              out of marketing emails at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p>
              For privacy questions, contact us at <strong>alankarikajewels1225@gmail.com</strong> or
              call <strong>+91 9076055755</strong>.
              <br />
              Address: Shop No 45 KE Zozwala Complex, Mohammed Ali chowk station road, Kalyan West 421301.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Related policies:{' '}
              <Link href="/terms" className="text-[#8B7355] underline">Terms &amp; Conditions</Link>
              {' · '}
              <Link href="/return-policy" className="text-[#8B7355] underline">Refund Policy</Link>
              {' · '}
              <Link href="/shipping-policy" className="text-[#8B7355] underline">Shipping Policy</Link>
              {' · '}
              <Link href="/cookies" className="text-[#8B7355] underline">Cookie Policy</Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
