"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { RotateCcw, Clock, ShieldCheck, HelpCircle } from "lucide-react"

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="h-24 bg-[#8B7355]"></div>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-light text-gray-900 mb-8 border-b pb-4 italic">Refund &amp; Return Policy</h1>

                <div className="prose prose-brown max-w-none text-gray-700 space-y-8">
                    <section>
                        <div className="flex items-center space-x-3 mb-4 text-[#8B7355]">
                            <RotateCcw className="w-6 h-6" />
                            <h2 className="text-2xl font-semibold m-0">Our Commitment</h2>
                        </div>
                        <p>
                            At Alankarika, we take immense pride in the craftsmanship and quality of our jewelry. We want you to be completely satisfied with your purchase. If for any reason you are not happy with your selection, we offer a <strong>7-day hassle-free return policy</strong> from the date of delivery.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-bold mb-3 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-[#8B7355]" />
                                Return Window
                            </h3>
                            <p className="text-sm">Items must be returned within 7 days of the delivery date. Returns initiated after this period will unfortunately not be accepted.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-bold mb-3 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2 text-[#8B7355]" />
                                Item Condition
                            </h3>
                            <p className="text-sm">The item must be in its original, unworn condition, with all tags attached and in its original Alankarika packaging with the invoice.</p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Initiate a Return</h2>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li>Contact our customer support team at <strong>alankarikajewels1225@gmail.com</strong> or call us at <strong>+91 9076055755</strong> within 48 hours of receiving the product.</li>
                            <li>Provide your order number and the reason for return. Our team will guide you through the process.</li>
                            <li>Ensure the item is securely packed in its original packaging to prevent damage during transit.</li>
                            <li>Our logistics partner will schedule a pick-up from your registered address within 2-3 business days.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Process</h2>
                        <p>
                            Once we receive your returned item and it passes our quality check, your refund will be processed.
                            Refunds are typically credited back to the original payment method within 7-10 business days.
                            For Cash on Delivery (COD) orders, we will request your bank details to process a direct transfer.
                        </p>
                    </section>

                    <section className="bg-[#F5EEDC] p-8 rounded-2xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-2 text-[#8B7355]" />
                            Non-Returnable Items
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Customized or personalized jewelry pieces.</li>
                            <li>Items showing signs of wear, damage, or alteration.</li>
                            <li>Promotional or "Final Sale" items as marked at the time of purchase.</li>
                        </ul>
                    </section>

                    <section>
                        <p className="text-sm text-gray-500 italic">
                            Note: Alankarika reserves the right to refuse a return if the item does not meet the above requirements. We appreciate your understanding in helping us maintain the highest standards of quality and hygiene for all our customers.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
