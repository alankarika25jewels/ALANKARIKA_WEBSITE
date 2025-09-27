import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import { 
  Clock, 
  Users, 
  Award, 
  Heart,
  Star,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="About Us Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
                 <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center text-white">
             <h1 className="text-6xl lg:text-7xl font-light mb-6">About Alankarika</h1>
             <p className="text-2xl lg:text-3xl max-w-3xl mx-auto">
               Crafting timeless elegance since 1998
             </p>
           </div>
         </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                A Legacy of Craftsmanship
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 1998, Alankarika began as a small family workshop with a simple mission: 
                to create jewelry that tells stories. What started with a single artisan crafting pieces 
                by hand has grown into a beloved brand, but our commitment to quality and personal touch 
                remains unchanged.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every piece in our collection is designed with love and crafted with precision. 
                We believe that jewelry should be more than beautiful—it should be meaningful, 
                connecting generations and celebrating life's most precious moments.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-600">25+ Years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-600">10K+ Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-600">500+ Designs</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Jewelry Workshop"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every piece we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Crafted with Love</h3>
                <p className="text-gray-600">
                  Every piece is created with passion and attention to detail, ensuring that each item 
                  carries the warmth of human touch and care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Premium Quality</h3>
                <p className="text-gray-600">
                  We use only the finest materials and work with skilled artisans to create jewelry 
                  that stands the test of time and beauty.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Timeless Design</h3>
                <p className="text-gray-600">
                  Our designs blend classic elegance with contemporary style, creating pieces that 
                  remain beautiful and relevant for generations to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate artisans and designers behind every piece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Sarah Johnson"
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-rose-600 mb-3">Lead Designer</p>
                <p className="text-gray-600 text-sm">
                  With 15 years of experience, Sarah brings creativity and innovation to every design.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Michael Chen"
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                <p className="text-rose-600 mb-3">Master Craftsman</p>
                <p className="text-gray-600 text-sm">
                  Michael's skilled hands bring our designs to life with precision and artistry.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Emma Rodriguez"
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
                <p className="text-rose-600 mb-3">Quality Specialist</p>
                <p className="text-gray-600 text-sm">
                  Emma ensures every piece meets our exacting standards before reaching our customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear from you. Whether you have a question about our jewelry, 
                want to discuss a custom piece, or just want to say hello, we're here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Our Studio</h3>
                    <p className="text-gray-600">123 Jewelry Lane, Design District<br />New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-gray-600">hello@alankarika.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Our Studio"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4 lg:px-8">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Explore our collection and discover jewelry that speaks to your soul
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 