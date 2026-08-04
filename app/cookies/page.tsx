"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Cookie } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24 bg-[#8B7355]" />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-4 border-b pb-4">Cookie Policy</h1>
        <p className="text-gray-500 mb-12">Effective Date: January 20, 2025 · Last updated: August 1, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-8">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
              <Cookie className="w-6 h-6" />
              <h2 className="text-2xl font-semibold m-0">What Are Cookies?</h2>
            </div>
            <p>
              Cookies are small text files stored on your device when you visit Alankarika. They help the site remember
              preferences, keep you signed in, and improve shopping experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential cookies:</strong> required for login, cart, checkout, and security.</li>
              <li><strong>Preference cookies:</strong> remember language or UI preferences.</li>
              <li><strong>Analytics cookies:</strong> help us understand how visitors use the site so we can improve it.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
            <p>
              You can control or delete cookies through your browser settings. Disabling essential cookies may prevent
              parts of the website (such as cart or checkout) from working correctly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">More Information</h2>
            <p>
              For details on how we handle personal data, read our{' '}
              <Link href="/privacy" className="text-[#8B7355] underline">Privacy Policy</Link>.
              Contact: <strong>alankarikajewels1225@gmail.com</strong> · <strong>+91 9076055755</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
