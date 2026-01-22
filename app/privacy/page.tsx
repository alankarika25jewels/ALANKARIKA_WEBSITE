"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Shield, BookOpen, UserCheck, Lock } from "lucide-react"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="h-24 bg-[#8B7355]"></div>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-light text-gray-900 mb-4 border-b pb-4 italic">Privacy Policy & Terms of Service</h1>
                <p className="text-gray-500 mb-12">Effective Date: January 20, 2024</p>

                <div className="prose prose-brown max-w-none text-gray-700 space-y-8">
                    <section>
                        <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
                            <BookOpen className="w-6 h-6" />
                            <h2 className="text-2xl font-semibold m-0">Terms of Service</h2>
                        </div>
                        <p>
                            By accessing and using the Alankarika platform, you agree to comply with and be bound by the following terms and conditions. Our services are designed to provide you with a premium jewelry shopping experience, and these rules ensure a fair and secure environment for all users.
                        </p>
                        <div className="space-y-4 mt-6">
                            <div className="border-l-4 border-[#D4AF37] pl-4">
                                <h3 className="font-bold">User Eligibility</h3>
                                <p className="text-sm">You must be at least 18 years of age or accessing the site under the supervision of a parent or guardian to make purchases on Alankarika.</p>
                            </div>
                            <div className="border-l-4 border-[#D4AF37] pl-4">
                                <h3 className="font-bold">Product Pricing & Accuracy</h3>
                                <p className="text-sm">While we strive for 100% accuracy, errors in pricing or product descriptions may occur. Alankarika reserves the right to cancel orders placed for products listed at an incorrect price.</p>
                            </div>
                            <div className="border-l-4 border-[#D4AF37] pl-4">
                                <h3 className="font-bold">Order Acceptance</h3>
                                <p className="text-sm">Your receipt of an order confirmation does not signify our acceptance of your order. We reserve the right at any time after receipt of your order to accept or decline your order for any reason.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
                            <Lock className="w-6 h-6" />
                            <h2 className="text-2xl font-semibold m-0">Privacy Policy</h2>
                        </div>
                        <p>
                            Your privacy is of paramount importance to us. This section explains how we collect, use, and protect your personal information when you visit or shop at Alankarika.
                        </p>
                        <ul className="list-disc pl-5 space-y-3 mt-4">
                            <li><strong>Information Collection:</strong> We collect personal details such as your name, contact information, and shipping address primarily to process your orders and provide customer support.</li>
                            <li><strong>Secure Transactions:</strong> All financial transactions are processed through encrypted, secure payment gateways. We do not store your credit card or sensitive financial information on our servers.</li>
                            <li><strong>Marketing Communications:</strong> With your consent, we may send you updates about new collections or special offers. You can opt-out of these communications at any time.</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic to improve our services.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
                            <UserCheck className="w-6 h-6" />
                            <h2 className="text-2xl font-semibold m-0">Governing Law</h2>
                        </div>
                        <p className="text-sm">
                            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts in Maharashtra, India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacting Us</h2>
                        <p>
                            If you have any questions regarding these Terms or our Privacy practices, please contact our Compliance Officer at:
                            <br />
                            <strong>Email:</strong> privacy@alankarika.com
                            <br />
                            <strong>Address:</strong> Shop No 45 KE Zozwala Complex, Mohammed Ali chowk station road kalyan west 421301
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
