import Header from "@/components/header"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our jewelry experts. We're here to help you find the perfect piece or answer any
              questions you may have.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#C4A484] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Visit Our Store</h3>
                      <p className="text-gray-600">123 Jewelry Street</p>
                      <p className="text-gray-600">Diamond District, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#C4A484] rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Toll-free: 1-800-SHOFY-NY</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#C4A484] rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">info@shofy.com</p>
                      <p className="text-gray-600">support@shofy.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#C4A484] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Store Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
